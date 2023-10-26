import Income from '../models/income.model.js';


export const addIncome = async (req, res) => {
    try {
      const { source, batchNumber, paymentMethod, bankTransactionDetails, customerName, description,evacuatedQuantity } = req.body;
      const userId = req.user.id; // Extract username from the token
  
      const income = new Income({
        source,
        batchNumber,
        evacuatedQuantity,
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

  export const getAllIncomes = async (req, res) => {
    try {
      const incomes = await Income.find();
      return res.status(200).json({ incomes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };