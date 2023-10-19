import Supplier from '../models/supplier.model.js';
import { errorHandler } from '../utils/error.js';

const createSupplier = async (req, res) => {
  try {
    const { name, contactPerson, email, phone, address } = req.body;
    const newSupplier = new Supplier({ name, contactPerson, email, phone, address });
    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { createSupplier };

// SUPPLIER UPDATE CONTROLLER
export const updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract supplier ID from request parameters
    const updatedFields = req.body; // Get the updated fields from the request body

    // Find the supplier by ID
    const existingSupplier = await Supplier.findById(id);
    if (!existingSupplier) {
      return next(errorHandler(404, 'Supplier not found'));
    }

    // Update supplier details
    Object.assign(existingSupplier, updatedFields);

    // Save updated supplier details
    const updatedSupplier = await existingSupplier.save();

    // Return updated supplier details (excluding sensitive information)
    const { _id, ...rest } = updatedSupplier._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


export const searchSupplierByName = async (req, res, next) => {
  try {
    const { name } = req.query;

    const foundSupplier = await Supplier.findOne({ name });

    if (!foundSupplier) {
      return next(errorHandler(404, 'Supplier not found'));
    }

    const { _id, ...rest } = foundSupplier._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


export const getAllSuppliers = async (req, res, next) => {
  try {
    const allSuppliers = await Supplier.find();
    res.status(200).json(allSuppliers);
  } catch (error) {
    next(error);
  }
};
