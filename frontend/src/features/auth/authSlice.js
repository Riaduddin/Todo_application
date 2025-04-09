import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../utils/apiClient'; // Import the apiClient

// Initial state - check localStorage for existing user info/token
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // User info object
  token: localStorage.getItem('token') || null, // JWT access token
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Example Async Thunk for Login (implement API call later)
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue, dispatch }) => { // Added dispatch
    try {
      // 1. Get Tokens
      const tokenResponse = await apiClient.post('/token/', credentials);
      const { access, refresh } = tokenResponse.data;

      // Store token immediately so subsequent requests are authenticated
      localStorage.setItem('token', access);
      // NOTE: We need to manually set the header for the *next* request in this thunk,
      // as the interceptor runs *before* this thunk completes and updates the store.
      // Alternatively, structure this differently (e.g., separate thunk for fetching user).
      // For simplicity here, we'll set the header directly for the getUserDetails call.

      // 2. Get User Details using the new token
      const userDetailsResponse = await apiClient.get('/users/me/', {
          headers: { Authorization: `Bearer ${access}` } // Pass token explicitly
      });
      const userDetails = userDetailsResponse.data; // This should include id, username, email etc.

      // 3. Prepare data for Redux state and localStorage
      const dataToStore = {
          access: access,
          refresh: refresh, // Store refresh token if needed later
          user: userDetails
      };

      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(dataToStore.user));

      // 4. Return data to be stored in Redux state
      return dataToStore;

    } catch (error) {
      // Handle API errors (from token or user details fetch)
      localStorage.removeItem('token'); // Clean up token if login fails
      localStorage.removeItem('user');
      const message = error.response?.data?.detail || error.message || 'Login failed'; // Use detail from DRF SimpleJWT
      return rejectWithValue(message);
    }
  }
);

// Example Async Thunk for Registration (implement API call later)
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            // Make the actual API call to the registration endpoint
            const response = await apiClient.post('/register/', userData); // Use apiClient
            // API should return the created user data (excluding password)
            return response.data;
        } catch (error) {
            // Handle potential validation errors from DRF (often in error.response.data)
            const message = error.response?.data || error.message || 'Registration failed';
            return rejectWithValue(message);
        }
    }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Synchronous action for logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    // Reducer to reset status/error if needed
    resetAuthStatus: (state) => {
        state.status = 'idle';
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.access; // Store the access token
        state.user = action.payload.user; // Store user info
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Error message from rejectWithValue
        state.user = null;
        state.token = null;
      })
      // Registration cases
      .addCase(registerUser.pending, (state) => {
          state.status = 'loading';
          state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
          state.status = 'succeeded'; // Registration succeeded, but user might not be logged in yet
          state.error = null;
          // Decide if user should be logged in automatically or redirected
      })
      .addCase(registerUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload; // Contains error details
      });
  },
});

export const { logout, resetAuthStatus } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
