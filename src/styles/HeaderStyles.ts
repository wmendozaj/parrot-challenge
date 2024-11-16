import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 32px;
`;

export const BottomRow = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 32px;
  background-color: #f04e4a;
  color: #ffffff;
`;

export const LogoutIcon = styled.div`
  cursor: pointer;
  color: #47465f;
  font-size: 24px;
  display: flex;
  align-items: center;

  &:hover {
    color: #f04e4a;
  }
`;

export const LogoutText = styled.span`
  margin-right: 8px;
  color: #47465f;
  font-size: 16px;
  font-weight: bold;
`;

export const ParrotLogoHeader = styled.img`
  height: 35px;
  cursor: pointer;
  margin-left: 8px;
`;
