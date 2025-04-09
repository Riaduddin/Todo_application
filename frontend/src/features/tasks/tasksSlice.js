import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../utils/apiClient';
import { logout } from '../auth/authSlice'; // Import the logout action

const initialState = {
  items: [], // Array to hold task objects
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// --- Placeholder Async Thunks ---
// Replace these with actual API calls later

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    // Use apiClient to fetch tasks from the backend endpoint
    const response = await apiClient.get('/tasks/'); // Endpoint defined in tasks/urls.py router
    console.log('res:', response); // DEBUG LOG
    return response.data; // The backend should return a list of tasks
  } catch (error) {
    // Handle potential errors (e.g., network error, unauthorized)
    return rejectWithValue(error.response?.data || 'Failed to fetch tasks');
  }
});

export const addTask = createAsyncThunk('tasks/addTask', async (newTaskData, { rejectWithValue }) => {
  try {
    // Use apiClient to send the new task data to the backend
    const response = await apiClient.post('/tasks/', newTaskData); // Endpoint from router
    return response.data; // Backend should return the created task object
  } catch (error) {
    // Handle potential errors (e.g., validation errors)
    return rejectWithValue(error.response?.data || 'Failed to add task');
  }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, ...updateData }, { rejectWithValue }) => {
  try {
    // Use apiClient to send updated data using PUT or PATCH
    // Using PATCH is often preferred for partial updates
    const response = await apiClient.patch(`/tasks/${id}/`, updateData); // Endpoint from router
    return response.data; // Backend should return the updated task object
  } catch (error) {
    // Handle potential errors
    return rejectWithValue(error.response?.data || 'Failed to update task');
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, { rejectWithValue }) => {
  try {
    // Use apiClient to send a DELETE request
    await apiClient.delete(`/tasks/${taskId}/`); // Endpoint from router
    return taskId; // Return the id of the deleted task for reducer logic
  } catch (error) {
    // Handle potential errors
    return rejectWithValue(error.response?.data || 'Failed to delete task');
  }
});

// --- Tasks Slice ---

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Revert to explicitly setting fields
    clearTasksAndResetStatus: (state) => {
        console.log('[tasksSlice] Clearing tasks and resetting status (explicitly).'); // DEBUG LOG
        state.items = []; // Clear the tasks array
        state.status = 'idle';
        state.error = null;
    }
    // We might not need clearTasksAndResetStatus anymore if logout handles it
  },
  extraReducers: (builder) => {
    builder
      // Reset state when user logs out
      .addCase(logout, (state) => {
          console.log('[tasksSlice] Logout detected, resetting state.'); // DEBUG LOG
          // Return initialState to fully reset
          return initialState;
      })
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Replace current tasks with fetched tasks
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add Task
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload); // Add the new task to the list
        // Optionally reset status after adding if needed
        state.status = 'succeeded';
      })
       .addCase(addTask.pending, (state) => {
        state.status = 'loading'; // Or a specific 'adding' status
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          // Merge updates into the existing task item
          state.items[index] = { ...state.items[index], ...action.payload };
        }
         state.status = 'succeeded';
      })
       .addCase(updateTask.pending, (state) => {
        state.status = 'loading'; // Or a specific 'updating' status
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action) => {
        // Remove the task with the matching id
        state.items = state.items.filter(task => task.id !== action.payload);
         state.status = 'succeeded';
      })
       .addCase(deleteTask.pending, (state) => {
        state.status = 'loading'; // Or a specific 'deleting' status
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export the modified action
export const { clearTasksAndResetStatus } = tasksSlice.actions;

// Selectors
export const selectAllTasks = (state) => state.tasks.items;
export const selectTasksStatus = (state) => state.tasks.status;
export const selectTasksError = (state) => state.tasks.error;
export const selectTaskById = (state, taskId) =>
  state.tasks.items.find(task => task.id === taskId);

export default tasksSlice.reducer;
