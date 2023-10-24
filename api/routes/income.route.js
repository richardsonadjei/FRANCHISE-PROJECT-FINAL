import express from 'express';
import { addIncome } from '../controllers/income.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const incomeRouter = express.Router();

// Route for adding income
incomeRouter.post('/', verifyToken, addIncome);

export default incomeRouter;
