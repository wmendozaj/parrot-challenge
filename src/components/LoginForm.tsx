import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch } from '../redux/store';
import { performLogin } from '../redux/authSlice';

import labels from '../utils/labels';
import parrotLogo from '../assets/parrot-logo.webp';
import IconArrow from './IconArrow';

import {
  LoginFormWrapper,
  Logo,
  Input,
  Button,
  ErrorMessage,
  LoadingOverlay,
} from '../styles/LoginStyles';

/**
 * LoginForm Component
 * Handles user login by dispatching authentication actions.
 */
const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  /**
   * Handle the login process.
   * Dispatches login action and navigates on success or sets error on failure.
   */
  const handleLogin = async () => {
    if (!username || !password) {
      setError(labels.loginForm.errors.requiredFields);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const resultAction = await dispatch(performLogin({ username, password }));

      if (performLogin.fulfilled.match(resultAction)) {
        navigate('/menu');
      } else if (performLogin.rejected.match(resultAction)) {
        setError(resultAction.payload as string);
      }
    } catch {
      setError(labels.loginForm.errors.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginFormWrapper>
      {loading && <LoadingOverlay aria-label={labels.loginForm.loading} />}
      <Logo src={parrotLogo} alt={labels.loginForm.logoAltText} />
      <Input
        type="text"
        placeholder={labels.loginForm.placeholders.username}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
        aria-label={labels.loginForm.aria.username}
      />
      <Input
        type="password"
        placeholder={labels.loginForm.placeholders.password}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        aria-label={labels.loginForm.aria.password}
      />
      <Button onClick={handleLogin} disabled={loading}>
        {loading ? labels.loginForm.buttons.loggingIn : labels.loginForm.buttons.login}{' '}
        <IconArrow />
      </Button>
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
    </LoginFormWrapper>
  );
};

export default LoginForm;
