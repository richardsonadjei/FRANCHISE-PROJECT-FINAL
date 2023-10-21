import express from 'express';
import {
    createCocoaBag,
    getAllCocoaBags,
    getCocoaBagsByTransactionTypeAndDateRange,
    getCocoaBagsWithinDateRange,
    updateCocoaBagQuantityByBatchNumber,
  } from '../controllers/cocoabag.controller.js';
  

const router = express.Router();

// POST request to create a new batch of cocoa beans
router.post('/', createCocoaBag);
router.get('/', getAllCocoaBags);
router.put('/:batchNumber', updateCocoaBagQuantityByBatchNumber);
router.get('/stock', getCocoaBagsWithinDateRange);
router.get('/transactions', getCocoaBagsByTransactionTypeAndDateRange);


export default router;