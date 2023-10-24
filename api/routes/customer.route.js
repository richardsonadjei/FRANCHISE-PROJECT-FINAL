import express from 'express';
import { createCustomer, getAllCustomers, updateCustomerByName } from '../controllers/customer.controller.js';

const router = express.Router();

// Create a new customer
router.post('/', createCustomer);
router.put('/:customerName', updateCustomerByName);
router.get('/getall', getAllCustomers);

export default router;