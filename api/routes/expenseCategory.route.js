import express from 'express';
import { createExpenseCategory, getAllExpenseCategories } from '../controllers/expenseCategory.controller.js';

const router = express.Router();

// Create an expense category
router.post('/expense-categories', createExpenseCategory);
router.get('/all/expense-categories', getAllExpenseCategories);

export default router;