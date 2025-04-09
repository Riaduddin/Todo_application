import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, selectTasksStatus } from '../features/tasks/tasksSlice';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(''); // Store as YYYY-MM-DD string
  const dispatch = useDispatch();
  const tasksStatus = useSelector(selectTasksStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Task title cannot be empty.'); // Simple validation
      return;
    }

    const newTaskData = {
      title: title.trim(),
      description: description.trim() || null, // Send null if empty
      due_date: dueDate || null, // Send null if empty
      // 'completed' defaults to false on the backend
    };

    dispatch(addTask(newTaskData))
      .unwrap()
      .then(() => {
        // Clear the form on successful submission
        setTitle('');
        setDescription('');
        setDueDate('');
      })
      .catch((error) => {
        console.error('Failed to add task:', error);
        // Handle error display if needed
        alert(`Failed to add task: ${JSON.stringify(error)}`);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">Add New Task</h3>
      <div className="space-y-3">
        <div>
          <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            placeholder="What needs to be done?"
          />
        </div>
        <div>
          <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description (Optional)
          </label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="2"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            placeholder="Add more details..."
          ></textarea>
        </div>
        <div>
          <label htmlFor="task-due-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Due Date (Optional)
          </label>
          <input
            type="date"
            id="task-due-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={tasksStatus === 'loading'} // Disable button while adding
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {tasksStatus === 'loading' ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;
