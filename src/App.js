import React from 'react';
import TaskManager from './frontend/components/TaskManager';
import LoginPage from './frontend/layouts/LoginPage';
import RegistrationPage from './frontend/layouts/RegistrationPage';
import ForgotPasswordPage from './frontend/layouts/ForgotPasswordPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './frontend/components/Dashboard';
import { AuthProvider } from './frontend/context/AuthContext';
import PrivateRoute from './frontend/components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          {/* <Route path="/" element={<PrivateRoute><TaskManager /></PrivateRoute>} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
