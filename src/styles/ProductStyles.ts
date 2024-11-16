import styled from 'styled-components';

export const ProductWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #ffffff;
  transition: box-shadow 0.3s ease;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const ProductInfo = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ProductName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const ProductPrice = styled.span`
  font-size: 16px;
  color: #666;
`;

export const PlaceholderImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  background: #ccc;
`;

export const AvailabilityButtonWrapper = styled.button<{ $isAvailable: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  background-color: ${(props) => (props.$isAvailable ? '#28a745' : '#d9534f')};
  border: none;
  border-radius: 6px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  transition: background-color 0.3s, box-shadow 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? undefined : props.$isAvailable ? '#218838' : '#c9302c'};
    box-shadow: ${(props) =>
      props.disabled ? undefined : '0px 4px 8px rgba(0, 0, 0, 0.1)'};
  }

  &:active {
    transform: ${(props) => (props.disabled ? undefined : 'scale(0.98)')};
  }

  svg {
    flex-shrink: 0;
  }

  span {
    margin-right: 10px;
  }
`;

export const ErrorMessage = styled.p`
  color: #d9534f;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;
