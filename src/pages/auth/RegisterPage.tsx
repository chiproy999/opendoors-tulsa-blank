import React from 'react';
import { Navigate } from 'react-router-dom';

// Redirect to the main auth page with register tab
const RegisterPage = () => {
  return <Navigate to="/auth" replace />;
};

export default RegisterPage;