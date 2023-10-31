import BatchExpense from '../models/batchExpense.model.js'; // Import the BatchExpense model

export const createBatchExpense = async (req, res) => {
  try {
    const { batchNumber, expenses } = req.body;

    // Create a new BatchExpense instance
    const batchExpense = new BatchExpense({
      batchNumber,
      expenses,
    });

    // Save the batchExpense to the database
    const createdBatchExpense = await batchExpense.save();

    res.status(201).json(createdBatchExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create batch expense' });
  }
};
