import React from 'react';

import labels from '../utils/labels';
import {
  StoreSelectorWrapper,
  Label, Select
} from '../styles/StoreSelectorStyles';

interface StoreSelectorProps {
  stores: Array<{ uuid: string; name: string }>;
  onSelectStore: (storeId: string) => void;
}

/**
 * StoreSelector Component
 * Provides a dropdown for selecting a store from a list.
 *
 * @param {Array<{ uuid: string; name: string }>} stores - List of stores to display.
 * @param {(storeId: string) => void} onSelectStore - Callback when a store is selected.
 * @returns JSX.Element
 */
const StoreSelector: React.FC<StoreSelectorProps> = ({ stores, onSelectStore }) => {
  return (
    <StoreSelectorWrapper>
      <Label htmlFor="store-selector">{labels.storeSelector.selectStore}</Label>
      <Select
        id="store-selector"
        onChange={(e) => onSelectStore(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          {labels.storeSelector.placeholder}
        </option>
        {stores.map((store) => (
          <option key={store.uuid} value={store.uuid}>
            {store.name}
          </option>
        ))}
      </Select>
    </StoreSelectorWrapper>
  );
};

export default StoreSelector;
