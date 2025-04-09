import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentToken } from '../features/auth/authSlice'; // Use token presence as auth check

const ProtectedRoute = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  // If there's no token, redirect to the login page,
  // saving the current location they were trying to go to.
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child route components
  return <Outlet />;
};

export default ProtectedRoute;
