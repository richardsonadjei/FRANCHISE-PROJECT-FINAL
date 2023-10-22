import express from 'express';
import {
  calculateStockDifference,
    createCocoaBag,
    getAllCocoaBags,
    getCocoaBagsByTransactionTypeAndDateRange,
    getCocoaBagsWithinDateRange,
    getInventorySummary,
    updateCocoaBagQuantityByBatchNumber,
  } from '../controllers/cocoabag.controller.js';
  

const router = express.Router();

// POST request to create a new batch of cocoa beans
router.post('/', createCocoaBag);
router.put('/:batchNumber', updateCocoaBagQuantityByBatchNumber);
router.get('/stock', getCocoaBagsWithinDateRange);
router.get('/transactions', getCocoaBagsByTransactionTypeAndDateRange);
router.get('/', getAllCocoaBags);
router.post('/calculate-stock-difference', calculateStockDifference);
router.get('/summary', getInventorySummary);

export default router;