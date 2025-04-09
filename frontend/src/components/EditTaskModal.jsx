import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import { updateTask, selectTasksStatus } from '../features/tasks/tasksSlice';

const EditTaskModal = ({ task, isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();
  const tasksStatus = useSelector(selectTasksStatus);

  // Pre-fill form when the task prop changes (modal opens for a specific task)
  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      // Format date for input type="date" (YYYY-MM-DD)
      setDueDate(task.due_date || '');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Task title cannot be empty.');
      return;
    }

    const updatedTaskData = {
      id: task.id, // Include the task ID
      title: title.trim(),
      description: description.trim() || null,
      due_date: dueDate || null,
      // We don't update 'completed' here, that's handled by the checkbox
    };

    dispatch(updateTask(updatedTaskData))
      .unwrap()
      .then(() => {
        onClose(); // Close modal on successful update
      })
      .catch((error) => {
        console.error('Failed to update task:', error);
        alert(`Failed to update task: ${JSON.stringify(error)}`);
      });
  };

  // Handle modal closing
  const handleClose = (e) => {
    // Only close if clicking the backdrop, not the modal content itself
    if (e.target.id === 'edit-modal-backdrop') {
      onClose();
    }
  };

  if (!isOpen || !task) {
    return null;
  }

  // Animation variants for the backdrop and modal content
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { y: "-50px", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { type: "spring", stiffness: 100 } },
    exit: { y: "50px", opacity: 0 }
  };


  return (
    <AnimatePresence>
      {isOpen && task && (
        // Modal Backdrop with animation
        <motion.div
          id="edit-modal-backdrop"
          onClick={handleClose}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Modal Content with animation */}
          <motion.div
            variants={modalVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Task</h2>
              <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            &times; {/* Close icon */}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-task-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="edit-task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="edit-task-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              id="edit-task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>
          <div>
            <label htmlFor="edit-task-due-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Due Date
            </label>
            <input
              type="date"
              id="edit-task-due-date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button" // Important: type="button" to prevent form submission
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 dark:border-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={tasksStatus === 'loading'}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {tasksStatus === 'loading' ? 'Saving...' : 'Save Changes'}
            </button>
            </div>
          </form>
          </motion.div> {/* End Modal Content */}
        </motion.div> // End Modal Backdrop
      )}
    </AnimatePresence>
  );
};

export default EditTaskModal;
