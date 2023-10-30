import express from 'express';
import { generateProfitLossByBatch, generateProfitLossReport, getFinancialSnapshot } from '../controllers/profitLoss.controller.js';

const profitLossRouter = express.Router();

profitLossRouter.get('/profit-loss', generateProfitLossReport);
profitLossRouter.get('/financial-snapshot', getFinancialSnapshot);
profitLossRouter.get('/batch-profit-loss', generateProfitLossByBatch);

export default profitLossRouter;
