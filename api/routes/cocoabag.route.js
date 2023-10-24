import express from 'express';
import {
  addReceivedQuantityToCocoaBag,
  calculateStockDifference,
  createCocoaBag,
  generateAllTransactionReport,
  generateTransactionReport,
  getAllCocoaBags,
  getCocoaBagsByTransactionTypeAndDateRange,
  getCocoaBagsWithinDateRange,
  getInventorySummary,
  modifyQuantity,
  receiveReport,
} from '../controllers/cocoabag.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// POST request to create a new batch of cocoa beans
router.post('/', createCocoaBag);

// router.put('/:batchNumber', updateCocoaBagQuantityByBatchNumber);
router.get('/stock', getCocoaBagsWithinDateRange);
router.get('/transactions', getCocoaBagsByTransactionTypeAndDateRange);
router.get('/', getAllCocoaBags);
router.post('/calculate-stock-difference', calculateStockDifference);
router.get('/summary', getInventorySummary);

// Use verifyToken middleware to authenticate the request
router.put('/:batchNumber', verifyToken, addReceivedQuantityToCocoaBag);
router.get('/reports/receive', receiveReport);
router.put('/modify/:batchNumber', verifyToken, modifyQuantity);
router.get('/reports/transactions', generateTransactionReport);
router.get('/reports/alltransactions', generateAllTransactionReport);

export default router;