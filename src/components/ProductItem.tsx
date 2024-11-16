import React, { useState } from 'react';

import AvailabilityButton from './AvailabilityButton';
import { Product } from '../redux/menuSlice';
import { updateProductAvailability } from '../services/menuService';

import noImage from '../assets/no-image.png';
import labels from '../utils/labels';

import {
  ProductWrapper,
  ProductInfo,
  ProductName,
  ProductPrice,
  ErrorMessage,
} from '../styles/ProductStyles';

interface ProductItemProps {
  product: Product;
  onStatusChange: (updatedProduct: Product) => void;
}

/**
 * ProductItem Component
 * Displays product details and a toggle button to update availability.
 */
const ProductItem: React.FC<ProductItemProps> = ({ product, onStatusChange }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handles toggle availability changes and updates the product state.
   */
  const handleToggle = async () => {
    const newStatus = product.availability === 'AVAILABLE' ? 'UNAVAILABLE' : 'AVAILABLE';

    setIsUpdating(true);
    setError('');

    try {
      const updatedProduct = await updateProductAvailability(product.uuid, newStatus);
      if (!updatedProduct || !updatedProduct.uuid) {
        throw new Error(labels.productItem.errors.invalidResponse);
      }
      onStatusChange(updatedProduct);
    } catch (err) {
      console.error(labels.productItem.errors.updateAvailability, err);
      setError(labels.productItem.errors.updateAvailabilityFeedback);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <ProductWrapper>
      <img
        src={product.imageUrl || noImage}
        alt={product.name || labels.productItem.noImageAlt}
        width="50"
        height="50"
      />
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>${parseFloat(product.price).toFixed(2)}</ProductPrice>
      </ProductInfo>
      <AvailabilityButton
        isActive={product.availability === 'AVAILABLE'}
        onToggle={handleToggle}
        disabled={isUpdating}
        isLoading={isUpdating}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </ProductWrapper>
  );
};

export default ProductItem;
