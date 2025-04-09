import { configureStore } from '@reduxjs/toolkit';
// Import slice reducers
import authReducer from '../features/auth/authSlice';
import tasksReducer from '../features/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    // Add reducers to the store
    auth: authReducer,
    tasks: tasksReducer,
  },
  // Optional: Add middleware, enhancers, etc.
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // devTools: process.env.NODE_ENV !== 'production',
});

export default store;
