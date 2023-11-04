import express from 'express';
import { generateProfitLossByBatch, generateProfitLossReport, } from '../controllers/profitLoss.controller.js';

const profitLossRouter = express.Router();

profitLossRouter.get('/profit-loss', generateProfitLossReport);

profitLossRouter.get('/batch-profit-loss', generateProfitLossByBatch);

export default profitLossRouter;
