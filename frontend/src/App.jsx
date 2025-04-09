import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'; // Explicitly import Tailwind's entry point
import { logout, selectCurrentToken, selectCurrentUser } from './features/auth/authSlice';
// No longer need to import task clearing action here
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar'; // Import the Navbar component

function App() {
  // --- Theme State ---
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  // --- End Theme State ---

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken); // Check if user is logged in
  // Define currentUser here using the selector
  const currentUser = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout()); // Dispatching logout will now also trigger the task slice reset
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    // Ensure the main div takes full height and uses flex column
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Use the Navbar component */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Apply dark mode classes to main content area and make it grow */}
      <main className="p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            {/* Pass currentUser as a prop */}
            <Route path="/" element={<DashboardPage currentUser={currentUser} />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Optional: Add a 404 Not Found route */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
