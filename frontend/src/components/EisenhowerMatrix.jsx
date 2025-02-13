// src/components/EisenhowerMatrix.jsx
import { motion } from 'framer-motion';

const MatrixQuadrant = ({ title, tasks, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
    <h3 className={`text-lg font-semibold mb-3 ${color}`}>{title}</h3>
    <div className="space-y-2">
      {tasks.map(task => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-2 bg-gray-50 dark:bg-gray-700 rounded"
        >
          <p className="text-sm font-medium text-gray-800 dark:text-white">{task.title}</p>
          {task.dueDate && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  </div>
);

const EisenhowerMatrix = ({ tasks }) => {
  const categorizedTasks = {
    urgent_important: tasks.filter(t => t.urgency === 'HIGH' && t.importance === 'HIGH'),
    notUrgent_important: tasks.filter(t => t.urgency === 'LOW' && t.importance === 'HIGH'),
    urgent_notImportant: tasks.filter(t => t.urgency === 'HIGH' && t.importance === 'LOW'),
    notUrgent_notImportant: tasks.filter(t => t.urgency === 'LOW' && t.importance === 'LOW'),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MatrixQuadrant
        title="Do First (Urgent & Important)"
        tasks={categorizedTasks.urgent_important}
        color="text-red-600 dark:text-red-400"
      />
      <MatrixQuadrant
        title="Schedule (Not Urgent & Important)"
        tasks={categorizedTasks.notUrgent_important}
        color="text-blue-600 dark:text-blue-400"
      />
      <MatrixQuadrant
        title="Delegate (Urgent & Not Important)"
        tasks={categorizedTasks.urgent_notImportant}
        color="text-yellow-600 dark:text-yellow-400"
      />
      <MatrixQuadrant
        title="Don't Do (Not Urgent & Not Important)"
        tasks={categorizedTasks.notUrgent_notImportant}
        color="text-gray-600 dark:text-gray-400"
      />
    </div>
  );
};

export default EisenhowerMatrix;