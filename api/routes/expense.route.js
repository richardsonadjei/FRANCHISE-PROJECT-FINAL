import express from 'express';
import { createExpense, fetchMiscellaneousExpenses, fetchProcurementExpenses, generateExpenseReport, pendingExpenses, updatePaymentStatus } from '../controllers/expense.controller.js';

const router = express.Router();

router.post('/', createExpense);
router.get('/all-expenses', generateExpenseReport);
router.get('/misc-expenses', fetchMiscellaneousExpenses);
router.get('/procurement-expenses', fetchProcurementExpenses);
router.get('/pending-expenses', pendingExpenses);
router.post('/updatePaymentStatus', updatePaymentStatus);


export default router;