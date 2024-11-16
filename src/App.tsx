import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Login from './pages/LoginPage';
import Menu from './pages/MenuPage';
import { useTokenMonitor } from './hooks/useTokenMonitor';

const App: React.FC = () => {
  useTokenMonitor();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  );
};

export default App;
