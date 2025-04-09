import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';

const SettingsPage = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Settings</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">User Profile</h2>
        {currentUser ? (
          <div className="space-y-2">
            <p><span className="font-medium text-gray-700 dark:text-gray-300">Username:</span> {currentUser.username}</p>
            {/* Display email if available - Note: email might not be in the simulated user object yet */}
            <p><span className="font-medium text-gray-700 dark:text-gray-300">Email:</span> {currentUser.email || 'N/A'}</p>
            {/* Add fields for first/last name if needed */}
            {/* <p><span className="font-medium">First Name:</span> {currentUser.first_name || 'N/A'}</p> */}
            {/* <p><span className="font-medium">Last Name:</span> {currentUser.last_name || 'N/A'}</p> */}
          </div>
        ) : (
          <p>Loading user information...</p>
        )}

        {/* Placeholder for other settings like password change or theme toggle */}
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
           <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Preferences</h2>
           <p className="text-gray-600 dark:text-gray-400">Theme toggle is available in the Navbar.</p>
           {/* Add password change form later if needed */}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
