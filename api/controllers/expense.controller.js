import Expense from '../models/expense.model.js';
import CocoaBag from '../models/cocoabag.model.js';
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

    // Fetch expenses from Expense model within the specified date range
    const expenseData = await Expense.find({
      date: {
        $gte: new Date(`${startDate}T00:00:00Z`),
        $lte: new Date(`${endDate}T23:59:59Z`),
      },
    });

    // Fetch expenses from CocoaBag model within the specified date range
    const cocoaBagExpenses = await CocoaBag.find({
      'expenses.date': {
        $gte: new Date(`${startDate}T00:00:00Z`),
        $lte: new Date(`${endDate}T23:59:59Z`),
      },
    });

    // Extract and format the required data from CocoaBag expenses
    const formattedCocoaBagExpenses = cocoaBagExpenses.flatMap((cocoaBag) =>
      cocoaBag.expenses.filter(
        (expense) =>
          expense.date >= new Date(`${startDate}T00:00:00Z`) &&
          expense.date <= new Date(`${endDate}T23:59:59Z`)
      )
    );

    // Combine data from both models
    const combinedData = [
      ...expenseData.map((expense) => ({
        expenseId: expense._id,
        amount: expense.amount,
        category: expense.category,
        description: expense.description, // Add the description field
        date: expense.date,
        cocoaBag: null, // Since this is from Expense model, cocoaBag will be null
      })),
      ...formattedCocoaBagExpenses.map((expense) => ({
        expenseId: expense._id,
        amount: expense.amount,
        category: expense.category,
        description: expense.description, // Add the description field
        date: expense.date,
        cocoaBag: {
          _id: expense.cocoaBagId, // Add relevant fields from CocoaBag model if needed
          // Add other fields from CocoaBag model as needed
        },
      })),
    ];

    res.status(200).json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};;




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