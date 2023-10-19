import express from 'express';
import createCocoaBag, { getAllCocoaBags } from '../controllers/cocoabag.controller.js';


const router = express.Router();

// POST request to create a new batch of cocoa beans
router.post('/', createCocoaBag);
router.get('/', getAllCocoaBags);

export default router;