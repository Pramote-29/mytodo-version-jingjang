// src/components/TodoItem.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  CheckCircleIcon,
  TrashIcon,
  PencilIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PaperClipIcon,
  BellIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const priorityColors = {
  LOW: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  HIGH: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
};

const TodoItem = ({ todo, onStatusChange, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date) => {
    if (!date) return null;
    return format(new Date(date), 'MMM dd, yyyy');
  };

  const formatDateTime = (date) => {
    if (!date) return null;
    return format(new Date(date), 'MMM dd, yyyy HH:mm');
  };

  const hasAdditionalInfo = todo.description || todo.notes?.length > 0 || todo.attachments?.length > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Main Task Info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <button
              onClick={() => onStatusChange(todo.id)}
              className={`p-1 rounded-full transition-colors
                ${todo.status === 'DONE'
                  ? 'text-green-500 hover:text-green-600'
                  : 'text-gray-400 hover:text-gray-500'}`}
            >
              <CheckCircleIcon className="h-6 w-6" />
            </button>
            <div className="flex-1">
              <h3 className={`font-medium ${
                todo.status === 'DONE' 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-800 dark:text-white'
              }`}>
                {todo.title}
              </h3>
              
              {/* Tags and Indicators */}
              <div className="flex flex-wrap items-center gap-2 mt-1">
                {todo.category && (
                  <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <TagIcon className="h-3 w-3 mr-1" />
                    {todo.category.name}
                  </span>
                )}
                {todo.dueDate && (
                  <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    {formatDate(todo.dueDate)}
                  </span>
                )}
                {todo.reminder && (
                  <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <BellIcon className="h-3 w-3 mr-1" />
                    {formatDateTime(todo.reminder)}
                  </span>
                )}
                {todo.attachments?.length > 0 && (
                  <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <PaperClipIcon className="h-3 w-3 mr-1" />
                    {todo.attachments.length} files
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[todo.priority]}`}>
              {todo.priority}
            </span>
            
            <div className="flex space-x-1">
              <button
                onClick={() => onEdit(todo)}
                className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
              {hasAdditionalInfo && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  {isExpanded ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && hasAdditionalInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-3"
          >
            {/* Description */}
            {todo.description && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {todo.description}
              </div>
            )}

            {/* Notes */}
            {todo.notes?.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</h4>
                {todo.notes.map((note) => (
                  <div
                    key={note.id}
                    className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded"
                  >
                    {note.content}
                  </div>
                ))}
              </div>
            )}

            {/* Attachments */}
            {todo.attachments?.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Attachments</h4>
                <div className="space-y-1">
                  {todo.attachments.map((attachment) => (
                    <a
                      key={attachment.id}
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <PaperClipIcon className="h-4 w-4 mr-1" />
                      {attachment.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TodoItem;