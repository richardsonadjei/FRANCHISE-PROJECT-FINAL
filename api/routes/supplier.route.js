import express from 'express';
import { createSupplier, getAllSuppliers, searchSupplierByName, updateSupplier } from '../controllers/supplier.controller.js';



const router = express.Router();

// POST request to create a new supplier
router.put('/:id', updateSupplier);
router.post('/', createSupplier);
router.get('/', searchSupplierByName);
router.get('/all', getAllSuppliers);

export default router;
