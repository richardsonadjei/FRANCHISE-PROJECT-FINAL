import express from 'express';
import createCocoaBag, { getAllCocoaBags, updateCocoaBagQuantityByBatchNumber,  } from '../controllers/cocoabag.controller.js';


const router = express.Router();

// POST request to create a new batch of cocoa beans
router.post('/', createCocoaBag);
router.get('/', getAllCocoaBags);
router.put('/:batchNumber', updateCocoaBagQuantityByBatchNumber);
export default router;