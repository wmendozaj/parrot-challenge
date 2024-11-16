const labels = {
  errors: {
    encryptionFailed: 'Encryption failed: SECRET_KEY is not defined.',
    decryptionFailed: 'Decryption failed: SECRET_KEY is not defined.',
    decryptionInvalid: 'Decryption failed: invalid ciphertext.',
    fetchStores: 'Error fetching store information.',
    fetchProducts: 'Error fetching products.',
    updateProductAvailability: 'Error updating product availability.',
    refreshTokenMissing: 'Refresh token is missing.',
    tokenMaxLifetimeReached: 'Maximum token lifetime has been reached.',
    tokenRefreshFailed: 'Failed to refresh the access token.',
    loginFailed: 'Login failed. Please check your username and password.',
  },
  loginForm: {
    placeholders: {
      username: 'Username',
      password: 'Password',
    },
    buttons: {
      login: 'Login',
      loggingIn: 'Logging in...',
    },
    errors: {
      requiredFields: 'Username and password are required.',
      loginFailed: 'Login failed. Please check your username and password.',
    },
    logoAltText: 'Parrot Logo',
    loading: 'Logging in...',
    aria: {
      username: 'Username',
      password: 'Password',
    },
  },
  menu: {
    alt: {
      parrotLogo: 'Parrot Logo',
    },
    placeholders: {
      selectStore: 'Select a Store',
    },
    buttons: {
      logout: 'Logout',
    },
    footer: {
      poweredBy: 'Powered by',
    },
    errors: {
      fetchStores: 'Failed to fetch stores. Please try again.',
      fetchProducts: 'Failed to fetch products. Please try again.',
      fetchProductsAlert: 'Unable to load products from the selected store. Please try again.',
      pollingError: 'Error occurred during polling.',
      invalidProduct: 'Invalid product received from API.',
    },
    header: {
      logoutAria: 'Log out of the application',
    },
  },
  productItem: {
    errors: {
      updateAvailability: 'Failed to update product availability:',
      updateAvailabilityFeedback: 'Failed to update product availability. Please try again.',
      invalidResponse: 'Invalid response received from the server.',
      productNotFound: 'Product not found for update.',
      categoryNotFound: 'Category not found for product update.',
    },
    noImageAlt: 'No Image Available',
  },
  storeSelector: {
    selectStore: 'Select Store:',
    placeholder: 'Choose a store',
  },
  availabilityButton: {
    active: 'Available',
    inactive: 'Unavailable',
    loading: 'Loading...',
  },
};

export default labels;
