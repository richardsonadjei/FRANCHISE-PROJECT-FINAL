import express from 'express';
import { createWaybill, getAllWaybillsByPeriod } from '../controllers/waybill.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const waybillRouter = express.Router();

// Route for creating a waybill
waybillRouter.post('/', verifyToken, createWaybill);
waybillRouter.post('/waybills', verifyToken, getAllWaybillsByPeriod);

export default waybillRouter;
