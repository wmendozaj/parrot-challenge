import styled from 'styled-components';

export const StoreName = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  svg {
    margin-left: 8px;
    font-size: 20px;
    color: #ffffff;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: rotate(180deg);
  }
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 32px;
  margin-top: 8px;
  padding: 8px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  z-index: 10;

  li {
    padding: 8px 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #47465f;
    transition: background 0.3s, color 0.3s;

    &:hover {
      background: #f8f9fa;
      color: #000000;
    }

    svg {
      margin-right: 8px;
      font-size: 18px;
      color: #47465f;
    }
  }
`;
