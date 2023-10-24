import express from 'express';
import { performEvacuation } from '../controllers/evacuation.controller.js';

const evacuationRouter = express.Router();

// Route for performing evacuation
evacuationRouter.post('/', performEvacuation);

export default evacuationRouter;