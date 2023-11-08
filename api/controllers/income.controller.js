import Income from '../models/income.model.js';


export const addIncome = async (req, res) => {
  try {
   
    const { source, batchNumber, evacuatedQuantity, evacuatedWeight, paymentMethod, bankTransactionDetails, customerName, description, amount } = req.body;
    const userId = req.user.id; // Extract username from the token

    const income = new Income({
      source,
      batchNumber,
      evacuatedQuantity,
      evacuatedWeight,
      amount,
      paymentMethod,
      bankTransactionDetails,
      transactionDate: new Date(),
      customerName,
      description,
      paymentStatus: 'Pending',
      userId, // Add username to the income instance
    });

    await income.save();

    return res.status(201).json({ message: 'Income recorded successfully', income });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPendingIncomes = async (req, res) => {
  try {
    const pendingIncomes = await Income.find({ paymentStatus: 'Pending' });
    return res.status(200).json({ pendingIncomes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



  export const updatePaymentStatus = async (req, res) => {
    try {
      const { batchNumber, paymentStatus } = req.body;
      // Validate batchNumber
      if (!batchNumber || typeof batchNumber !== 'string') {
        return res.status(400).json({ error: 'Invalid batch number' });
      }
  
      // Find the income record by batch number
      const income = await Income.findOne({ batchNumber });
  
      if (!income) {
        return res.status(404).json({ error: 'Income record not found' });
      }
  
      // Update the payment status
      income.paymentStatus = paymentStatus;
  
      // Save the updated record
      await income.save();
  
      return res.status(200).json({ message: 'Payment status updated successfully', income });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  export const getIncomesByDateRange = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      // Validate startDate and endDate
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required parameters.' });
      }
  
      const start = new Date(`${startDate}T00:00:00Z`); // Set the start time to midnight UTC
      const end = new Date(`${endDate}T23:59:59Z`);   // Set the end time to 11:59:59 PM UTC
  
      // Query incomes within the specified range
      const incomes = await Income.find({
        transactionDate: { $gte: start, $lte: end }
      });
  
      return res.status(200).json({ incomes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  export const getIncomesByBatchAndDateRange = async (req, res) => {
    try {
      const { batchNumber, startDate, endDate } = req.query;
      // Validate batchNumber, startDate, and endDate
      if (!batchNumber || !startDate || !endDate) {
        return res.status(400).json({ error: 'Batch number, start date, and end date are required parameters.' });
      }
      const start = new Date(`${startDate}T00:00:00Z`);
      const end = new Date(`${endDate}T23:59:59Z`);
      // Query incomes within the specified batch number and date range
      const incomes = await Income.find({
        batchNumber: batchNumber,
        transactionDate: { $gte: start, $lte: end }
      });
      return res.status(200).json({ incomes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };