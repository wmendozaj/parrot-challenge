import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getMyStores, getAllProducts, updateProductAvailability } from '../services/menuService';
import { menuExtraReducers } from './menuReducers';
import labels from 'utils/labels';

export interface CategoryDetails {
  uuid: string;
  name: string;
}

export interface Product {
  uuid: string;
  name: string;
  price: string;
  availability: 'AVAILABLE' | 'UNAVAILABLE';
  imageUrl?: string;
  category: CategoryDetails;
}

export interface Category {
  uuid: string;
  name: string;
  products: Product[];
}

export interface MenuState {
  stores: { uuid: string; name: string }[];
  selectedStore: string | null;
  categories: Category[];
  loading: boolean;
}

const initialState: MenuState = {
  stores: [],
  selectedStore: null,
  categories: [],
  loading: false,
};

/**
 * Fetches all stores associated with the current user.
 * @returns A list of stores.
 * @throws Will throw an error if fetching stores fails.
 */
export const fetchMyStores = createAsyncThunk('menu/fetchMyStores', async () => {
  const response = await getMyStores();
  return response.result.stores;
});

/**
 * Fetches all products for a specific store.
 * @param storeUuid - The UUID of the store.
 * @returns A list of products grouped by categories.
 * @throws Will throw an error if fetching products fails.
 */
export const fetchAllProducts = createAsyncThunk(
  'menu/fetchAllProducts',
  async (storeUuid: string) => {
    const products = await getAllProducts(storeUuid);
    return products;
  }
);

/**
 * Updates the availability status of a specific product.
 * @param productId - The UUID of the product.
 * @param availability - The new availability status.
 * @returns The updated product details.
 * @throws Will throw an error if updating the product fails.
 */
export const updateProductThunk = createAsyncThunk(
  'menu/updateProduct',
  async ({ productId, availability }: { productId: string; availability: 'AVAILABLE' | 'UNAVAILABLE' }) => {
    const updatedProduct = await updateProductAvailability(productId, availability);
    return updatedProduct;
  }
);

/**
 * Menu slice to manage the state of stores, categories, and products.
 */
const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedStore(state, action) {
      state.selectedStore = action.payload;
    },
    updateProduct(state, action) {
      const updatedProduct: Product = action.payload;

      if (!updatedProduct.uuid || !updatedProduct.category) {
        console.error(labels.productItem.errors.invalidResponse, updatedProduct);
        return;
      }
      
      const category = state.categories.find((cat) => cat.uuid === updatedProduct.category.uuid);

      if (category) {
        const productIndex = category.products.findIndex((prod) => prod.uuid === updatedProduct.uuid);
        if (productIndex !== -1) {
          category.products[productIndex] = updatedProduct;
        } else {
          console.error(labels.productItem.errors.productNotFound, updatedProduct);
        }
      } else {
        console.error(labels.productItem.errors.categoryNotFound, updatedProduct);
      }
    },
  },
  extraReducers: (builder) => menuExtraReducers(builder),
});

export const { setSelectedStore, updateProduct } = menuSlice.actions;
export default menuSlice.reducer;
