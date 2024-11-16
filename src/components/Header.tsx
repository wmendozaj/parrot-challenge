import React, { useState } from 'react';

import { logout } from '../services/authService';

import parrotLogo from '../assets/parrot-logo.webp';
import labels from '../utils/labels';

import {
  HeaderContainer,
  TopRow,
  BottomRow,
  ParrotLogoHeader,
  LogoutIcon,
  LogoutText,
} from '../styles/HeaderStyles';
import { Dropdown, StoreName } from '../styles/DropdownStyles';

interface HeaderProps {
  stores: Array<{ uuid: string; name: string }>;
  selectedStore: string | null;
  onStoreChange: (storeUuid: string) => void;
}

/**
 * Header Component
 * Displays the application header, including:
 * - Parrot logo
 * - Store selector dropdown
 * - Logout functionality
 */
const Header: React.FC<HeaderProps> = ({ stores, selectedStore, onStoreChange }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => logout();

  const toggleDropdown = () => setDropdownVisible((prevState) => !prevState);

  const renderDropdown = () =>
    dropdownVisible && (
      <Dropdown>
        {stores.map((store) => (
          <li key={store.uuid} onClick={() => onStoreChange(store.uuid)}>
            {store.name}
          </li>
        ))}
      </Dropdown>
    );

  return (
    <HeaderContainer>
      <TopRow>
        <ParrotLogoHeader src={parrotLogo} alt={labels.menu.alt.parrotLogo} />
        <LogoutIcon onClick={handleLogout} aria-label={labels.menu.header.logoutAria}>
          <LogoutText>{labels.menu.buttons.logout}</LogoutText>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 17l5-5-5-5" />
            <path d="M15 12H3" />
          </svg>
        </LogoutIcon>
      </TopRow>
      <BottomRow>
        <StoreName onClick={toggleDropdown}>
          {stores.find((store) => store.uuid === selectedStore)?.name ||
            labels.menu.placeholders.selectStore}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M5 8.5l5 5 5-5H5z" />
          </svg>
        </StoreName>
        {renderDropdown()}
      </BottomRow>
    </HeaderContainer>
  );
};

export default Header;
