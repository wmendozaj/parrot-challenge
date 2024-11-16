import React, { useState } from 'react';

import { Category, Product } from '../redux/menuSlice';
import ProductItem from './ProductItem';

import {
  CategoryWrapper,
  CategoryHeader,
  ProductList
} from '../styles/CategoryStyles';

interface CategoryListProps {
  category: Category;
  onStatusChange: (updatedProduct: Product) => void;
}

/**
 * Component for displaying a list of products within a category.
 * Allows toggling visibility of the product list.
 */
const CategoryList: React.FC<CategoryListProps> = ({ category, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <CategoryWrapper>
      <CategoryHeader onClick={toggleExpand} className={isExpanded ? 'expanded' : ''}>
        {category.name} ({category.products.length})
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0 0 L8 8 L16 0 Z" fill="#47465f" />
        </svg>
      </CategoryHeader>
      {isExpanded && (
        <ProductList>
          {category.products.map((product) => (
            <ProductItem
              key={product.uuid}
              product={product}
              onStatusChange={onStatusChange}
            />
          ))}
        </ProductList>
      )}
    </CategoryWrapper>
  );
};

export default CategoryList;
