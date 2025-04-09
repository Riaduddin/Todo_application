import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable'; // Import useSortable
import { CSS } from '@dnd-kit/utilities'; // Import CSS utilities
import { updateTask, deleteTask } from '../features/tasks/tasksSlice';

// Accept onEdit prop to handle opening the edit modal
const TaskItem = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    // Dispatch updateTask action with the toggled completed status
    dispatch(updateTask({ id: task.id, completed: !task.completed }));
  };

  const handleDelete = () => {
    // Dispatch deleteTask action
    if (window.confirm(`Are you sure you want to delete task: "${task.title}"?`)) {
        dispatch(deleteTask(task.id));
    }
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } } // Slide out left on exit
  };

  // --- dnd-kit setup ---
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging, // Optional: use this to style the item while dragging
  } = useSortable({ id: task.id }); // Use task.id as the unique identifier

  const style = {
    // Apply transform and transition styles for drag effect
    transform: CSS.Transform.toString(transform),
    transition,
    // Optional: Add styles for when item is being dragged
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 'auto', // Ensure dragged item is on top
  };
  // --- End dnd-kit setup ---

  return (
    // Use motion.li, apply variants, ref, style, and dnd attributes/listeners
    <motion.li
      ref={setNodeRef}
      style={style}
      {...attributes} // Apply dnd attributes here (needed for identification)
      // Remove listeners from the main li element
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout // Enable layout animations for reordering/filtering
      className={`flex items-center justify-between p-4 mb-3 rounded-lg shadow transition-colors duration-200 ${task.completed ? 'bg-green-100 dark:bg-green-900 opacity-60' : 'bg-white dark:bg-gray-800'}`}
    >
      <div className="flex items-center space-x-4 flex-grow mr-4 overflow-hidden"> {/* Added overflow-hidden */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300 dark:border-gray-600 focus:ring-indigo-500 cursor-pointer"
        />
        <div>
          <span className={`font-medium ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
            {task.title}
          </span>
          {task.description && (
            <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
              {task.description}
            </p>
          )}
           {task.due_date && (
            <p className={`text-xs mt-1 ${task.completed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'}`}>
              Due: {new Date(task.due_date + 'T00:00:00').toLocaleDateString()} {/* Adjust date formatting as needed */}
            </p>
          )}
        </div>
      </div>
      {/* Button container */}
      <div className="flex-shrink-0 flex items-center space-x-2">
         {/* Drag Handle - Apply listeners ONLY here */}
         <button {...listeners} className="cursor-grab p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Drag task">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg> {/* Simple handle icon */}
         </button>

         {/* Edit button */}
         <button
           onClick={() => onEdit(task)}
           className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
         >
           Edit
         </button>
         {/* Delete button */}
        <button
          onClick={handleDelete}
          className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
        >
          Delete
        </button>
      </div>
    </motion.li> // End motion.li
  );
};

export default TaskItem;
