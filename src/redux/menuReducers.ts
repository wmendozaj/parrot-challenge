import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import {
  MenuState, Product, Category,
  fetchAllProducts, fetchMyStores, updateProductThunk
} from './menuSlice';

/**
 * Helper function to map products to categories.
 * @param products - Array of products.
 * @returns An array of categories with their respective products.
 */
const mapProductsToCategories = (products: Product[]): Category[] => {
  const categoriesMap: Record<string, Category> = {};

  products.forEach((product) => {
    const { uuid: categoryUuid, name: categoryName } = product.category;

    if (!categoriesMap[categoryUuid]) {
      categoriesMap[categoryUuid] = {
        uuid: categoryUuid,
        name: categoryName,
        products: [],
      };
    }

    categoriesMap[categoryUuid].products.push(product);
  });

  return Object.values(categoriesMap);
};

/**
 * Extra reducers for handling asynchronous actions related to menu operations.
 * @param builder - The Redux Toolkit builder for handling actions.
 */
export const menuExtraReducers = (builder: ActionReducerMapBuilder<MenuState>): void => {
  builder
    // Fetch stores
    .addCase(fetchMyStores.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchMyStores.fulfilled, (state, action) => {
      state.stores = action.payload;
      state.loading = false;
    })
    .addCase(fetchMyStores.rejected, (state) => {
      state.loading = false;
    })

    // Fetch products
    .addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.categories = mapProductsToCategories(action.payload);
      state.loading = false;
    })
    .addCase(fetchAllProducts.rejected, (state) => {
      state.loading = false;
    })

    // Update product availability
    .addCase(updateProductThunk.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateProductThunk.fulfilled, (state, action) => {
      const updatedProduct = action.payload;

      // Locate the category and product to update
      const category = state.categories.find(
        (cat) => cat.uuid === updatedProduct.category.uuid
      );

      if (category) {
        const productIndex = category.products.findIndex(
          (prod) => prod.uuid === updatedProduct.uuid
        );

        if (productIndex !== -1) {
          category.products[productIndex] = updatedProduct;
        }
      }

      state.loading = false;
    })
    .addCase(updateProductThunk.rejected, (state) => {
      state.loading = false;
    });
};
