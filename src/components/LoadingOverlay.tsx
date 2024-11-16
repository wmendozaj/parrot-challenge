import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../redux/store';
import { OverlayWrapper, Spinner } from '../styles/LoadingStyles';

// Component to display a loading overlay
const LoadingOverlay: React.FC = () => {
  const loading = useSelector((state: RootState) => state.ui.loading);

  return loading ? (
    <OverlayWrapper>
      <Spinner />
    </OverlayWrapper>
  ) : null;
};

export default LoadingOverlay;
