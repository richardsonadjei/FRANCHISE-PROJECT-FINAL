import express from 'express';
import  { calculateAndDistributeProfit } from '../controllers/partnerIncome.controller.js';



const  partnerIncome= express.Router();

// POST request to calculate and distribute partner income
partnerIncome.post('/partner-income/:batchNumber', calculateAndDistributeProfit);

export default partnerIncome;
