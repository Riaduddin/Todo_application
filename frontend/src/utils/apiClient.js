import axios from 'axios';
import store from '../store/store'; // Import the Redux store to access the token

// Define the base URL for the Django backend API
const API_BASE_URL = 'http://127.0.0.1:8000/api/'; // Adjust if your backend runs elsewhere

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in headers
apiClient.interceptors.request.use(
  (config) => {
    // Prioritize token from Redux store
    let token = store.getState().auth.token;

    // Fallback: If store token is null/undefined, check localStorage directly
    // This might help immediately after login before the store update fully propagates
    if (!token) {
        token = localStorage.getItem('token');
        // console.log('[apiClient Interceptor] Using token from localStorage:', token ? 'Yes' : 'No'); // Optional debug
    } else {
        // console.log('[apiClient Interceptor] Using token from Redux store:', token ? 'Yes' : 'No'); // Optional debug
    }


    if (token) {
      // If the token exists (from either source), add it to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        // Ensure Authorization header is removed if no token exists
        delete config.headers['Authorization'];
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor to handle token refresh or global errors
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     // Example: Handle token expiry and refresh
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // Call your token refresh endpoint
//         // const { data } = await axios.post(API_BASE_URL + 'token/refresh/', { refresh: /* get refresh token */ });
//         // store.dispatch(tokenRefreshed(data.access)); // Dispatch action to update token in store
//         // apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + data.access;
//         // return apiClient(originalRequest); // Retry original request
//       } catch (refreshError) {
//         // Handle refresh token failure (e.g., logout user)
//         // store.dispatch(logout());
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
