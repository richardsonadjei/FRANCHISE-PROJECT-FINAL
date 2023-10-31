import express from 'express';
import { createBatchExpense } from '../controllers/batchExpense.controller.js';

const batchExpenseRouter = express.Router();

// Route to create a new batchExpense
batchExpenseRouter.post('/batch-expense', createBatchExpense);

export default batchExpenseRouter;
