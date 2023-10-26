import Expense from '../models/expense.model.js';

export const createExpense = async (req, res) => {
  try {
    const { description, amount, category, date,batchNumber, personName, receiptNumber, } = req.body;

    const newExpense = new Expense({
      description,
      amount,
      category,
      date,
      batchNumber,
      transaction: {
        personName,
        receiptNumber,
      },
    });

    await newExpense.save();

    return res.status(201).json({ expense: newExpense });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const generateExpenseReport = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      const expenses = await Expense.find({
        date: {
          $gte: new Date(`${startDate}T00:00:00Z`), // Set the start time to midnight UTC
          $lte: new Date(`${endDate}T23:59:59Z`),   // Set the end time to 11:59:59 PM UTC
        },
      });
  
      return res.status(200).json({ expenses });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const fetchMiscellaneousExpenses = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      const expenses = await Expense.find({
        category: 'miscellaneous',
        date: {
          $gte: new Date(`${startDate}T00:00:00Z`), // Set the start time to midnight UTC
          $lte: new Date(`${endDate}T23:59:59Z`),   // Set the end time to 11:59:59 PM UTC
        },
      });
  
      return res.status(200).json({ expenses });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const fetchProcurementExpenses = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const expenses = await Expense.find({
        category: 'procurement',
        date: {
          $gte: new Date(`${startDate}T00:00:00Z`),
          $lte: new Date(`${endDate}T23:59:59Z`),
        },
      });
  
      return res.status(200).json({ expenses });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };