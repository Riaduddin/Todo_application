import React, { useState } from 'react'; // Import useState
import { AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskItem from './TaskItem';

// Accept onEditTask prop to pass down to TaskItem
const TaskList = ({ tasks, onEditTask }) => {
  // Local state to manage the order visually during drag, if needed,
  // or rely on Redux state update later. For now, let's manage locally.
  const [localTasks, setLocalTasks] = useState(tasks);

  // Update local state if the tasks prop changes (e.g., after fetching/filtering/sorting)
  React.useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  // --- dnd-kit setup ---
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setLocalTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        // Use arrayMove to update the order
        const newOrder = arrayMove(items, oldIndex, newIndex);

        // TODO: Dispatch an action here to update the order in Redux state
        // and potentially persist the order on the backend if required.
        console.log('New task order (visual only):', newOrder.map(t => t.id));

        return newOrder;
      });
    }
  }
  // --- End dnd-kit setup ---


  if (!localTasks || localTasks.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400 mt-4">No tasks yet. Add one!</p>;
  }

  return (
    // Provide DndContext and SortableContext
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={localTasks.map(task => task.id)} // Pass array of task IDs
        strategy={verticalListSortingStrategy} // Use vertical list strategy
      >
        <ul className="space-y-3">
          <AnimatePresence>
            {localTasks.map((task) => (
              // Pass the onEditTask handler to each TaskItem as the onEdit prop
              <TaskItem key={task.id} task={task} onEdit={onEditTask} />
            ))}
          </AnimatePresence>
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default TaskList;
