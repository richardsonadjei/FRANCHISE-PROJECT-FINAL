import Income from '../models/income.model.js';


export const addIncome = async (req, res) => {
    try {
      const { source, batchNumber, amount, paymentMethod, bankTransactionDetails, customerName, description,evacuatedQuantity } = req.body;
      const userId = req.user.id; // Extract username from the token
  
      const income = new Income({
        source,
        batchNumber,
        evacuatedQuantity,
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
  