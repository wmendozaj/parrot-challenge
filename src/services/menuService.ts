import apiClient from './apiClient';
import { Product } from 'redux/menuSlice';

import { getCookie, setCookie } from '../utils/cookiesUtils';
import labels from '../utils/labels';

/**
 * Fetch the user's store information.
 * Retrieves the list of stores associated with the current user.
 */
export const getMyStores = async () => {
  try {
    const response = await apiClient.get('/api/v1/users/me', {
      headers: { Authorization: `Bearer ${getCookie('access_token')}` },
    });

    // Set the first store ID in cookies for future usage
    const storeId = response.data.result.stores[0]?.uuid;
    if (storeId) setStoreId(storeId);

    return response.data;
  } catch (error) {
    console.error(labels.errors.fetchStores, error);
    throw new Error(labels.errors.fetchStores);
  }
};

/**
 * Fetch all products from a specific store.
 * @param storeId - The UUID of the store.
 */
export const getAllProducts = async (storeId: string) => {
  try {
    const response = await apiClient.get(`/api/v1/products/?store=${storeId}`, {
      headers: { Authorization: `Bearer ${getCookie('access_token')}` },
    });

    return response.data.results;
  } catch (error) {
    console.error(labels.errors.fetchProducts, error);
    throw new Error(labels.errors.fetchProducts);
  }
};

/**
 * Update the availability of a specific product.
 * @param productId - The UUID of the product.
 * @param availability - New availability status ('AVAILABLE' or 'UNAVAILABLE').
 */
export const updateProductAvailability = async (
  productId: string,
  availability: 'AVAILABLE' | 'UNAVAILABLE'
): Promise<Product> => {
  try {
    const response = await apiClient.put(
      `/api/v1/products/${productId}/availability`,
      { availability },
      {
        headers: { Authorization: `Bearer ${getCookie('access_token')}` },
      }
    );

    const updatedProduct = response.data?.result;

    if (!updatedProduct || !updatedProduct.uuid || !updatedProduct.category) {
      throw new Error(labels.productItem.errors.invalidResponse);
    }

    return updatedProduct;
  } catch (error) {
    console.error(labels.errors.updateProductAvailability, error);
    throw new Error(labels.errors.updateProductAvailability);
  }
};

/**
 * Store the selected store ID in cookies.
 * @param storeId - The UUID of the store.
 */
const setStoreId = (storeId: string) => {
  setCookie('store_id', storeId, 1); // Expiry set to 1 day
};
