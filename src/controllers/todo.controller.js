// src/controllers/todo.controller.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create todo
export const createTodo = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const userId = req.userId;

    const todo = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority: priority || 'LOW',
        userId
      },
      include: {
        subtasks: true
      }
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Error creating todo' });
  }
};

// Get all todos for user
export const getAllTodos = async (req, res) => {
  try {
    const userId = req.userId;
    const todos = await prisma.task.findMany({
      where: {
        userId
      },
      include: {
        subtasks: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(todos);
  } catch (error) {
    console.error('Error getting todos:', error);
    res.status(500).json({ message: 'Error getting todos' });
  }
};

// Get single todo
export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const todo = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
        userId
      },
      include: {
        subtasks: true
      }
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    console.error('Error getting todo:', error);
    res.status(500).json({ message: 'Error getting todo' });
  }
};

// Update todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { title, description, dueDate, priority, status } = req.body;

    const todo = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
        userId
      }
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const updatedTodo = await prisma.task.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        status
      },
      include: {
        subtasks: true
      }
    });

    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Error updating todo' });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const todo = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
        userId
      }
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await prisma.task.delete({
      where: {
        id: parseInt(id)
      }
    });

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Error deleting todo' });
  }
};

// Create subtask
export const createSubtask = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { title } = req.body;
    const userId = req.userId;

    const todo = await prisma.task.findFirst({
      where: {
        id: parseInt(todoId),
        userId
      }
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const subtask = await prisma.subtask.create({
      data: {
        title,
        taskId: parseInt(todoId)
      }
    });

    res.status(201).json(subtask);
  } catch (error) {
    console.error('Error creating subtask:', error);
    res.status(500).json({ message: 'Error creating subtask' });
  }
};

// Update subtask
export const updateSubtask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const userId = req.userId;

    const subtask = await prisma.subtask.findFirst({
      where: {
        id: parseInt(id),
        task: {
          userId
        }
      }
    });

    if (!subtask) {
      return res.status(404).json({ message: 'Subtask not found' });
    }

    const updatedSubtask = await prisma.subtask.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title,
        completed
      }
    });

    res.json(updatedSubtask);
  } catch (error) {
    console.error('Error updating subtask:', error);
    res.status(500).json({ message: 'Error updating subtask' });
  }
};

// Delete subtask
export const deleteSubtask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const subtask = await prisma.subtask.findFirst({
      where: {
        id: parseInt(id),
        task: {
          userId
        }
      }
    });

    if (!subtask) {
      return res.status(404).json({ message: 'Subtask not found' });
    }

    await prisma.subtask.delete({
      where: {
        id: parseInt(id)
      }
    });

    res.json({ message: 'Subtask deleted successfully' });
  } catch (error) {
    console.error('Error deleting subtask:', error);
    res.status(500).json({ message: 'Error deleting subtask' });
  }
};