import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, selectAuthStatus, selectAuthError, resetAuthStatus } from '../features/auth/authSlice';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [formError, setFormError] = useState(''); // Local form validation error

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError); // API error from Redux state

  // Reset status on component mount
  useEffect(() => {
    dispatch(resetAuthStatus());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(''); // Clear previous local errors

    if (password !== passwordConfirm) {
      setFormError('Passwords do not match.');
      return;
    }
    if (!username || !email || !password) {
        setFormError('Please fill in all required fields.');
        return;
    }

    const userData = { username, email, password };

    dispatch(registerUser(userData))
      .unwrap()
      .then(() => {
        // Registration successful
        // Redirect to login page or maybe directly log them in (depends on backend/flow)
        console.log('Registration successful, redirecting to login.');
        navigate('/login'); // Redirect to login after successful registration
      })
      .catch((error) => {
        // Error is already set in the state by the rejected case
        // We can display the authError from Redux state
        console.error('Registration failed:', error);
        // If the error payload is an object (like DRF validation errors), format it
        if (typeof error === 'object' && error !== null) {
            const messages = Object.entries(error)
                .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                .join(' ');
            setFormError(messages || 'Registration failed. Please check your input.');
        } else {
            setFormError(error || 'Registration failed. Please try again.');
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Choose a username"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              placeholder="you@example.com"
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
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              placeholder="********"
            />
          </div>
           <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              autoComplete="new-password"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              placeholder="********"
            />
          </div>

          {(authStatus === 'failed' || formError) && (
            <p className="text-sm text-red-600 dark:text-red-400">{formError || authError || 'Registration failed.'}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={authStatus === 'loading'}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authStatus === 'loading' ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
         <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
