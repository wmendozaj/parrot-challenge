import { getMyStores, getAllProducts, updateProductAvailability } from '../menuService';
import apiClient from '../apiClient';
import { setCookie, getCookie } from '../../utils/cookiesUtils';
import labels from '../../utils/labels';

jest.mock('../apiClient');
jest.mock('../../utils/cookiesUtils');

describe('menuService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMyStores', () => {
    it('should fetch stores and set the first store ID in cookies', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({
        data: { result: { stores: [{ uuid: 'store1' }] } },
      });

      const result = await getMyStores();

      expect(apiClient.get).toHaveBeenCalledWith('/api/v1/users/me', {
        headers: { Authorization: `Bearer ${getCookie('access_token')}` },
      });
      expect(setCookie).toHaveBeenCalledWith('store_id', 'store1', 1);
      expect(result).toEqual({ result: { stores: [{ uuid: 'store1' }] } });
    });

    it('should throw an error if fetching stores fails', async () => {
      (apiClient.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(getMyStores()).rejects.toThrow(labels.errors.fetchStores);
    });
  });

  describe('getAllProducts', () => {
    it('should fetch products for a specific store', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({
        data: { results: [{ uuid: 'product1', name: 'Product 1' }] },
      });

      const result = await getAllProducts('store1');

      expect(apiClient.get).toHaveBeenCalledWith('/api/v1/products/?store=store1', {
        headers: { Authorization: `Bearer ${getCookie('access_token')}` },
      });
      expect(result).toEqual([{ uuid: 'product1', name: 'Product 1' }]);
    });

    it('should throw an error if fetching products fails', async () => {
      (apiClient.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(getAllProducts('store1')).rejects.toThrow(labels.errors.fetchProducts);
    });
  });

  describe('updateProductAvailability', () => {
    it('should update the availability of a product', async () => {
      (apiClient.put as jest.Mock).mockResolvedValue({
        data: {
          result: {
            uuid: 'product1',
            availability: 'AVAILABLE',
            name: 'Product 1',
            price: '10.99',
            category: { uuid: 'category1', name: 'Category 1' },
          },
        },
      });
  
      const result = await updateProductAvailability('product1', 'AVAILABLE');
  
      expect(apiClient.put).toHaveBeenCalledWith(
        '/api/v1/products/product1/availability',
        { availability: 'AVAILABLE' },
        {
          headers: { Authorization: `Bearer ${getCookie('access_token')}` },
        }
      );
      expect(result).toEqual({
        uuid: 'product1',
        availability: 'AVAILABLE',
        name: 'Product 1',
        price: '10.99',
        category: { uuid: 'category1', name: 'Category 1' },
      });
    });
  
    it('should throw an error if updating product fails', async () => {
      (apiClient.put as jest.Mock).mockRejectedValue(new Error('Network error'));
  
      await expect(updateProductAvailability('product1', 'AVAILABLE')).rejects.toThrow(
        labels.errors.updateProductAvailability
      );
    });
  });  
});
