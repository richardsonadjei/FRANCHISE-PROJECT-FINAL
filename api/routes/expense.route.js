import express from 'express';
import { createExpense, fetchMiscellaneousExpenses, fetchProcurementExpenses, generateExpenseReport } from '../controllers/expense.controller.js';

const router = express.Router();

router.post('/', createExpense);
router.get('/all-expenses', generateExpenseReport);
router.get('/misc-expenses', fetchMiscellaneousExpenses);
router.get('/procurement-expenses', fetchProcurementExpenses);


export default router;