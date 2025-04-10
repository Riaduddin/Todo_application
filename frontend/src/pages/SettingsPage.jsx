import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import apiClient from '../utils/apiClient';
import { updateUser } from '../features/auth/authSlice'; // Import the updateUser action

const SettingsPage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(currentUser?.first_name || '');
  const [lastName, setLastName] = useState(currentUser?.last_name || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(null);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(null);
  const [profileUpdateError, setProfileUpdateError] = useState(null);
  const [passwordChangeError, setPasswordChangeError] = useState(null);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileUpdateSuccess(null);
    setProfileUpdateError(null);

    try {
      const response = await apiClient.patch('users/me/update/', {
        first_name: firstName,
        last_name: lastName,
      });

      if (response.status === 200) {
        setProfileUpdateSuccess('Profile updated successfully!');
        dispatch(updateUser({ first_name: firstName, last_name: lastName })); // Dispatch the updateUser action
      } else {
        setProfileUpdateError('Failed to update profile.');
      }
    } catch (error) {
      setProfileUpdateError(error.response?.data?.message || 'An error occurred.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordChangeSuccess(null);
    setPasswordChangeError(null);

    try {
      const response = await apiClient.put('users/me/password/', {
        old_password: oldPassword,
        new_password: newPassword,
      });

      if (response.status === 200) {
        setPasswordChangeSuccess('Password changed successfully!');
        setOldPassword('');
        setNewPassword('');
      } else {
        setPasswordChangeError('Failed to change password.');
      }
    } catch (error) {
      setPasswordChangeError(error.response?.data?.old_password?.[0] || 'An error occurred.');
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Settings</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">User Profile</h2>
        {currentUser ? (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            {profileUpdateSuccess && <p className="text-green-500">{profileUpdateSuccess}</p>}
            {profileUpdateError && <p className="text-red-500">{profileUpdateError}</p>}
            <div>
              <label htmlFor="firstName" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">First Name:</label>
              <input
                type="text"
                id="firstName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Last Name:</label>
              <input
                type="text"
                id="lastName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Profile
            </button>
          </form>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          {passwordChangeSuccess && <p className="text-green-500">{passwordChangeSuccess}</p>}
          {passwordChangeError && <p className="text-red-500">{passwordChangeError}</p>}
          <div>
            <label htmlFor="oldPassword" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Old Password:</label>
            <input
              type="password"
              id="oldPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">New Password:</label>
            <input
              type="password"
              id="newPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
