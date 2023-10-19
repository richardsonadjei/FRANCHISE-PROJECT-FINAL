import express from 'express';
import createCocoaBag from '../controllers/cocoabag.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// POST request to create a new batch of cocoa beans
router.post('/', verifyToken, createCocoaBag);

export default router;