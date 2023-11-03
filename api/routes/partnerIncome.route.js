import express from 'express';
import { calculateAndDistributeProfit, getPartnerIncomesByPeriod } from '../controllers/partnerIncome.controller.js';

const partnerIncome = express.Router();

// POST request to calculate and distribute partner income
partnerIncome.post('/partner-income/:batchNumber', calculateAndDistributeProfit);

// GET request to fetch partner incomes within a specific period
partnerIncome.get('/partner-income-report', getPartnerIncomesByPeriod);

export default partnerIncome;
