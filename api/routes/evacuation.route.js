import express from 'express';
import { getEvacuationsByPeriod, performEvacuation } from '../controllers/evacuation.controller.js';

const evacuationRouter = express.Router();

// Route for performing evacuation
evacuationRouter.post('/', performEvacuation);
evacuationRouter.get('/period', getEvacuationsByPeriod);

export default evacuationRouter;