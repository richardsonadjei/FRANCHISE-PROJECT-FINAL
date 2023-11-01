import express from 'express';
import getProcurementsByBatchAndPeriod, { allProcurementsByPeriod } from '../controllers/procurement.controller.js'; // Import the controller function

const procurementRouter = express.Router();

// Route to fetch procurements by batch and period
procurementRouter.get('/batch-procurements', getProcurementsByBatchAndPeriod);
procurementRouter.get('/procurements', allProcurementsByPeriod);

export default procurementRouter;
