import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(145deg, #f04e4a, #ffffff);
  padding: 1rem;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const Logo = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 1.5rem;
`;

export const LoginFormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const Input = styled.input`
  width: 90%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #f04e4a;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: #47465f;
  color: #ffffff;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f04e4a;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #47465f;
  border-radius: 8px;
  z-index: 1;
`;

export const ErrorMessage = styled.p`
  color: #f04e4a;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;
