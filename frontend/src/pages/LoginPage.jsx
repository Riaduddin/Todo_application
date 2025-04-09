import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, selectAuthStatus, selectAuthError, resetAuthStatus } from '../features/auth/authSlice';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);

  // Reset status on component mount/unmount if needed
  useEffect(() => {
    dispatch(resetAuthStatus()); // Reset status when component loads
    return () => {
        // Optional: Reset status when component unmounts
        // dispatch(resetAuthStatus());
    };
  }, [dispatch]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      dispatch(loginUser({ username, password }))
        .unwrap() // Use unwrap to handle fulfilled/rejected promises directly
        .then(() => {
          // Login successful (handled by extraReducers setting state)
          navigate('/'); // Redirect to dashboard on successful login
        })
        .catch((error) => {
          // Error is already set in the state by the rejected case
          console.error('Login failed:', error);
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              placeholder="Your Username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              placeholder="********"
            />
          </div>

          {authStatus === 'failed' && (
            <p className="text-sm text-red-600 dark:text-red-400">{authError || 'Login failed. Please check your credentials.'}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={authStatus === 'loading'}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authStatus === 'loading' ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
