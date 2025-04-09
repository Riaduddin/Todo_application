import React, { useState, useEffect } from 'react'; // Import useState
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, selectAllTasks, selectTasksStatus, selectTasksError } from '../features/tasks/tasksSlice';
import { selectCurrentUser } from '../features/auth/authSlice'; // To greet the user
import TaskList from '../components/TaskList'; // Import the TaskList component
import AddTaskForm from '../components/AddTaskForm'; // Import the AddTaskForm component
import EditTaskModal from '../components/EditTaskModal'; // Import the EditTaskModal component

// Accept currentUser as a prop
const DashboardPage = ({ currentUser: currentUserFromProp }) => {
  // Add log at the very start of the render
  console.log('[DashboardPage Render Start] Component rendering...');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // Task object to edit
  const [filter, setFilter] = useState('all'); // State for filtering
  const [sortBy, setSortBy] = useState('created_at_desc'); // State for sorting: 'created_at_desc', 'created_at_asc', 'due_date_asc', 'due_date_desc'

  const dispatch = useDispatch();
  // Use a fresh selector call inside the component body
  const tasks = useSelector(state => state.tasks.items);
  const tasksStatus = useSelector(state => state.tasks.status);
  const tasksError = useSelector(state => state.tasks.error);
  // Use the prop instead of the selector for currentUser
  const currentUser = currentUserFromProp;

  // Log state values obtained from selectors/props
  console.log('[DashboardPage Render Values] User:', currentUser?.username, 'Task Status:', tasksStatus, 'Tasks:', tasks);


  // --- Modal State and Handlers ---
  // Function to open the edit modal
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  // Function to close the edit modal
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingTask(null);
  }
  // --- End Modal State and Handlers ---

  // Fetch tasks when the component mounts OR when the currentUser ID prop changes
  useEffect(() => {
    console.log(`[DashboardPage Effect Start] Status: ${tasksStatus}, User ID from prop: ${currentUser?.id}`); // DEBUG LOG
    console.log('[DashboardPage Effect Start] Tasks currently in state:', tasks); // DEBUG LOG - Log tasks array
    // Only fetch if we have a logged-in user (from prop) AND the task status is idle
    if (currentUser?.id && tasksStatus === 'idle') {
        console.log(`[DashboardPage Effect] Dispatching fetchTasks for user ID: ${currentUser.id}`); // DEBUG LOG
        dispatch(fetchTasks());
    }
    // If the user logs out (currentUser prop becomes null), the tasks are cleared by the logout action.
    // If the user ID changes OR if the status becomes idle again while a user is logged in, fetch tasks.
  }, [currentUser?.id, tasksStatus, dispatch]); // Re-add tasksStatus to dependency array

  let content;

  if (tasksStatus === 'loading') {
    content = <p className="text-center text-gray-500">Loading tasks...</p>;
  } else if (tasksStatus === 'succeeded' && currentUser) { // Add check for currentUser here too
     // Explicitly filter tasks from the store to match the current user prop
     // This acts as a safeguard against rendering stale state immediately after login
     const tasksForCurrentUser = tasks.filter(task => task.user === currentUser.username);
     console.log('[DashboardPage Render] Status succeeded, rendering tasks for user:', currentUser.username, tasksForCurrentUser); // DEBUG LOG

    // Filter tasks based on the current filter state (using already filtered list)
    const filteredTasks = tasksForCurrentUser.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true; // 'all' filter
    });

    // Sort the filtered tasks based on the current sortBy state
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        switch (sortBy) {
            case 'created_at_asc':
                return new Date(a.created_at) - new Date(b.created_at);
            case 'due_date_asc':
                // Handle null due dates (e.g., push them to the end)
                if (!a.due_date) return 1;
                if (!b.due_date) return -1;
                return new Date(a.due_date) - new Date(b.due_date);
            case 'due_date_desc':
                 if (!a.due_date) return 1;
                 if (!b.due_date) return -1;
                return new Date(b.due_date) - new Date(a.due_date);
            case 'created_at_desc': // Default sort
            default:
                return new Date(b.created_at) - new Date(a.created_at);
        }
    });

    // Pass the handleEditTask function and sorted/filtered tasks to TaskList
    content = <TaskList tasks={sortedTasks} onEditTask={handleEditTask} />;
  } else if (tasksStatus === 'failed') {
    content = <p className="text-center text-red-500">Error loading tasks: {tasksError}</p>;
  } else {
      console.log(`[DashboardPage Render] Status: ${tasksStatus}, Tasks:`, tasks); // DEBUG LOG for other statuses
  }


  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {currentUser?.username || 'User'}!
      </h1>

      {/* Container for Add Task Form and Task List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6">

        {/* Add the AddTaskForm component */}
        <AddTaskForm />

        {/* Filter Buttons */}
        <div className="my-6 border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-center space-x-3">
         <button
           onClick={() => setFilter('all')}
           className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
         >
           All
         </button>
         <button
           onClick={() => setFilter('active')}
           className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
         >
           Active
         </button>
         <button
           onClick={() => setFilter('completed')}
           className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
         >
           Completed
         </button>
       </div>

       {/* Sorting Controls */}
       <div className="my-4 flex justify-center items-center space-x-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Sort by:</span>
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-1 border rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
                <option value="created_at_desc">Newest First</option>
                <option value="created_at_asc">Oldest First</option>
                <option value="due_date_asc">Due Date (Asc)</option>
                <option value="due_date_desc">Due Date (Desc)</option>
                {/* Add other sorting options like priority later if needed */}
            </select>
       </div>

        {/* Task List Content Area */}
        <div className="mt-6">
          {content}
        </div>
      </div> {/* End container div */}

      {/* Render the Edit Task Modal */}
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        task={editingTask}
      />
    </div>
  );
};

export default DashboardPage;
