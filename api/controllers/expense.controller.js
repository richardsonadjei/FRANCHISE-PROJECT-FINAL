import Expense from '../models/expense.model.js';
import BatchExpense from '../models/batchExpense.model.js';
import Procurement from '../models/procurement.model.js';


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

const generateExpenseReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Fetch data from Procurement model within the specified date range
    const procurementData = await Procurement.find({
      date: {
        $gte: new Date(`${startDate}T00:00:00Z`),
        $lte: new Date(`${endDate}T23:59:59Z`),
      },
    });

    // Fetch data from Expense model within the specified date range
    const expenseData = await Expense.find({
      date: {
        $gte: new Date(`${startDate}T00:00:00Z`),
        $lte: new Date(`${endDate}T23:59:59Z`),
      },
    });

    // Fetch data from BatchExpense model within the specified date range
    const batchExpenseData = await BatchExpense.find({
      date: {
        $gte: new Date(`${startDate}T00:00:00Z`),
        $lte: new Date(`${endDate}T23:59:59Z`),
      },
    });

    // Calculate total amounts for each model
    const procurementTotal = procurementData.reduce((total, item) => total + item.amount, 0);
    const expenseTotal = expenseData.reduce((total, item) => total + item.amount, 0);
    const batchExpenseTotal = batchExpenseData.reduce((total, item) => total + item.amount, 0);

    // Calculate total amount across all three models
    const totalAmount = procurementTotal + expenseTotal + batchExpenseTotal;

    // Combine the fetched data into response object
    const data = {
      procurementData: procurementData,
      procurementTotal: procurementTotal,
      expenseData: expenseData,
      expenseTotal: expenseTotal,
      batchExpenseData: batchExpenseData,
      batchExpenseTotal: batchExpenseTotal,
      totalAmount: totalAmount,
    };

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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


  

  const fetchProcurementExpenses = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      // Fetch procurements from the Procurement model within the specified date range
      const procurementData = await Procurement.find({
        date: {
          $gte: new Date(`${startDate}T00:00:00Z`),
          $lte: new Date(`${endDate}T23:59:59Z`),
        },
      });
  
      res.status(200).json(procurementData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  


  export { generateExpenseReport, fetchProcurementExpenses };