// task.router.js
import express from 'express';
import * as taskController from '../controllers/task.controller.js';

const router = express.Router();

router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', taskController.createTask);
router.patch('/tasks/:taskId', taskController.updateTaskStatus);
router.delete('/tasks/:taskId', taskController.removeTask);

export default router;
