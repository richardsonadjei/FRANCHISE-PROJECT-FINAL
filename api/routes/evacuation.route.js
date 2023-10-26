import express from 'express';
import { getEvacuationsByBatchAndPeriod, getEvacuationsByPeriod, performEvacuation } from '../controllers/evacuation.controller.js';

const evacuationRouter = express.Router();

// Route for performing evacuation
evacuationRouter.post('/', performEvacuation);
evacuationRouter.get('/period', getEvacuationsByPeriod);
evacuationRouter.get('/batch-evacuations', getEvacuationsByBatchAndPeriod);


export default evacuationRouter;