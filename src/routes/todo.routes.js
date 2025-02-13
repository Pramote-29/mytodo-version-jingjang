// src/routes/todo.routes.js
import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  createSubtask,
  updateSubtask,
  deleteSubtask
} from '../controllers/todo.controller.js';

const router = Router();

// Todo routes
router.post('/', authenticate, createTodo);
router.get('/', authenticate, getAllTodos);
router.get('/:id', authenticate, getTodoById);
router.put('/:id', authenticate, updateTodo);
router.delete('/:id', authenticate, deleteTodo);

// Subtask routes
router.post('/:todoId/subtasks', authenticate, createSubtask);
router.put('/subtasks/:id', authenticate, updateSubtask);
router.delete('/subtasks/:id', authenticate, deleteSubtask);

export default router;