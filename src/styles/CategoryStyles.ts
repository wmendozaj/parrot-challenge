import styled from 'styled-components';

export const CategoryWrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CategoryHeader = styled.div`
  padding: 16px 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);

  &:hover {
    background-color: #f9f9f9;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  svg {
    transition: transform 0.3s ease;
    font-size: 22px;
    color: #47465f;
    margin-left: 8px;
    display: inline-block;
    vertical-align: middle;
  }

  &.expanded svg {
    transform: rotate(180deg);
  }
`;

export const ProductList = styled.div`
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
