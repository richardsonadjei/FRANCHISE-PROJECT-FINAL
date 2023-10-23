import express from 'express';
import { createCustomer, updateCustomerByName } from '../controllers/customer.controller.js';

const router = express.Router();

// Create a new customer
router.post('/', createCustomer);
router.put('/:customerName', updateCustomerByName);

export default router;