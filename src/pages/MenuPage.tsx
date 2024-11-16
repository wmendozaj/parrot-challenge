import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState, AppDispatch } from '../redux/store';
import {
  fetchMyStores,
  fetchAllProducts,
  setSelectedStore,
  updateProduct,
  Product,
} from '../redux/menuSlice';

import Header from '../components/Header';
import CategoryWrapper from '../components/CategoryWrapper';
import LoadingOverlay from '../components/LoadingOverlay';

import labels from '../utils/labels';
import parrotLogo from '../assets/parrot-logo.webp';

import { MenuWrapper } from '../styles/MenuStyles';
import { Footer, PoweredByText, ParrotLogoFooter } from '../styles/FooterStyles';

const POLLING_INTERVAL = 15000; // 15 seconds

/**
 * MenuPage Component
 * Displays the menu page with store selection, category display, and polling updates.
 */
const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { stores, selectedStore, categories, loading } = useSelector((state: RootState) => state.menu);

  const [loadingProducts, setLoadingProducts] = useState(false);

  /**
   * Initialize the page by fetching stores and products.
   * Redirects to login if token is invalid or expired.
   */
  useEffect(() => {
    const initializePage = async () => {
      try {
        const storesData = await dispatch(fetchMyStores()).unwrap();
        if (storesData.length > 0) {
          const firstStore = storesData[0];
          dispatch(setSelectedStore(firstStore.uuid));
          await dispatch(fetchAllProducts(firstStore.uuid)).unwrap();
        }
      } catch (error) {
        console.error(labels.menu.errors.fetchStores, error);
        navigate('/login');
      }
    };

    initializePage();
  }, [dispatch, navigate]);

  /**
   * Handle store selection and fetch products for the selected store.
   */
  const handleStoreChange = async (storeUuid: string) => {
    setLoadingProducts(true);
    try {
      dispatch(setSelectedStore(storeUuid));
      await dispatch(fetchAllProducts(storeUuid)).unwrap();
    } catch (error) {
      console.error(labels.menu.errors.fetchProducts, error);
      alert(labels.menu.errors.fetchProductsAlert);
    } finally {
      setLoadingProducts(false);
    }
  };

  /**
   * Update product status in the Redux store.
   */
  const handleProductStatusChange = (updatedProduct: Product) => {
    dispatch(updateProduct(updatedProduct));
  };

  /**
   * Poll for product updates at regular intervals.
   */
  useEffect(() => {
    const pollingInterval = setInterval(async () => {
      try {
        if (selectedStore) {
          await dispatch(fetchAllProducts(selectedStore)).unwrap();
        }
      } catch (error) {
        console.error(labels.menu.errors.pollingError, error);
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(pollingInterval);
  }, [dispatch, selectedStore]);

  return (
    <MenuWrapper>
      {(loading || loadingProducts) && <LoadingOverlay />}
      <Header stores={stores} selectedStore={selectedStore} onStoreChange={handleStoreChange} />
      <CategoryWrapper categories={categories} onProductStatusChange={handleProductStatusChange} />
      <Footer>
        <PoweredByText>{labels.menu.footer.poweredBy}</PoweredByText>
        <ParrotLogoFooter src={parrotLogo} alt={labels.menu.alt.parrotLogo} />
      </Footer>
    </MenuWrapper>
  );
};

export default MenuPage;
