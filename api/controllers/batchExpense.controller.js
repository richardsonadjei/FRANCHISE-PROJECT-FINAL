import BatchExpense from '../models/batchExpense.model.js';

export const createBatchExpense = async (req, res) => {
  try {
    const { batchNumber, description, amount, paymentStatus, recordedBy } = req.body;

    // Create a new BatchExpense instance
    const batchExpense = new BatchExpense({
      batchNumber,
      description,
      amount,
      paymentStatus,
      recordedBy // Include the paymentStatus field in the creation
    });

    // Save the batchExpense to the database
    const createdBatchExpense = await batchExpense.save();

    res.status(201).json(createdBatchExpense);
  } catch (error) {
    console.error('Error creating batch expense:', error);
    res.status(500).json({ error: 'Failed to create batch expense' });
  }
};
