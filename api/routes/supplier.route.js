import express from 'express';
import { createSupplier } from '../controllers/supplier.controller.js';


const router = express.Router();

// POST request to create a new supplier
router.post('/', createSupplier);

export default router;
