import express from 'express';
import { createWaybill } from '../controllers/waybill.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const waybillRouter = express.Router();

// Route for creating a waybill
waybillRouter.post('/', verifyToken, createWaybill);

export default waybillRouter;
