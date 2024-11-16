import React from 'react';

import LoginForm from '../components/LoginForm';
import { LoginContainer } from '../styles/LoginStyles';

const LoginPage: React.FC = () => {
  return (
    <LoginContainer>
      <LoginForm />
    </LoginContainer>
  );
};

export default LoginPage;
