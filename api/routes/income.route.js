import express from 'express';
import { addIncome, getIncomesByBatchAndDateRange, getIncomesByDateRange, getPendingIncomes, updatePaymentStatus } from '../controllers/income.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const incomeRouter = express.Router();

// Route for adding income
incomeRouter.post('/', verifyToken, addIncome);
incomeRouter.get('/pending', verifyToken, getPendingIncomes);
incomeRouter.put('/update-payment-status', verifyToken, updatePaymentStatus);
incomeRouter.get('/all', verifyToken, getIncomesByDateRange);
incomeRouter.get('/all-batch', getIncomesByBatchAndDateRange)

export default incomeRouter;
