import React from 'react';

import { AvailabilityButtonWrapper } from '../styles/ProductStyles';
import labels from '../utils/labels';

interface AvailabilityButtonProps {
  isActive: boolean;
  onToggle: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

/**
 * AvailabilityButton Component
 * Renders a button to toggle between active and inactive states, 
 * with visual feedback for loading and disabled states.
 */
const AvailabilityButton: React.FC<AvailabilityButtonProps> = ({
  isActive,
  onToggle,
  disabled = false,
  isLoading = false,
}) => {
  const handleClick = () => {
    if (!disabled && !isLoading) onToggle();
  };

  return (
    <AvailabilityButtonWrapper
      $isAvailable={isActive}
      onClick={handleClick}
      disabled={disabled || isLoading}
      aria-label={isActive ? labels.availabilityButton.active : labels.availabilityButton.inactive}
    >
      {isLoading ? (
        <span>{labels.availabilityButton.loading}</span>
      ) : (
        <>
          <span>
            {isActive ? labels.availabilityButton.active : labels.availabilityButton.inactive}
          </span>
          {isActive ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="28px"
              height="28px"
              aria-hidden="true"
            >
              <path d="M10 15l-3-3 1.41-1.42L10 12.17l5.59-5.59L17 8l-7 7z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="20px"
              height="28px"
              aria-hidden="true"
            >
              <path d="M19 13H5v-2h14v2z" />
            </svg>
          )}
        </>
      )}
    </AvailabilityButtonWrapper>
  );
};

export default AvailabilityButton;
