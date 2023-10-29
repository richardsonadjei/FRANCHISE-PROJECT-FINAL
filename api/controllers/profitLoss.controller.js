import Income from '../models/income.model.js';
import Expense from '../models/expense.model.js';
import CocoaBag from '../models/cocoabag.model.js';

export const generateProfitLossReport = async (req, res) => {
  let totalIncome = 0;
  let totalExpenses = 0;
  let totalCocoaBagExpenses = 0;

  try {
    const { startDate, endDate } = req.query;

    // Calculate total income within the specified date range
    const incomeData = await Income.aggregate([
      {
        $match: {
          transactionDate: {
            $gte: new Date(`${startDate}T00:00:00Z`),
            $lte: new Date(`${endDate}T23:59:59Z`),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: '$amount' }, // Use 'amount' field for income
        },
      },
    ]);

    // Calculate total expenses from Expense model within the specified date range
    const expenseData = await Expense.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${startDate}T00:00:00Z`),
            $lte: new Date(`${endDate}T23:59:59Z`),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: '$amount' }, // Use 'amount' field for expenses
        },
      },
    ]);

    // Calculate total expenses from CocoaBag model within the specified date range
    const cocoaBagExpenses = await CocoaBag.aggregate([
      {
        $match: {
          'expenses.date': {
            $gte: new Date(`${startDate}T00:00:00Z`),
            $lte: new Date(`${endDate}T23:59:59Z`),
          },
        },
      },
      {
        $unwind: '$expenses',
      },
      {
        $match: {
          'expenses.date': {
            $gte: new Date(`${startDate}T00:00:00Z`),
            $lte: new Date(`${endDate}T23:59:59Z`),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalCocoaBagExpenses: { $sum: '$expenses.amount' }, // Use 'amount' field for expenses in CocoaBag model
        },
      },
    ]);

    totalIncome = incomeData.length > 0 ? incomeData[0].totalIncome : 0;
    totalExpenses = expenseData.length > 0 ? expenseData[0].totalExpenses : 0;
    totalCocoaBagExpenses = cocoaBagExpenses.length > 0 ? cocoaBagExpenses[0].totalCocoaBagExpenses : 0;

    const totalCombinedExpenses = totalExpenses + totalCocoaBagExpenses;
    const profitLoss = totalIncome - totalCombinedExpenses;

    res.status(200).json({ totalIncome, totalCombinedExpenses, profitLoss });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getFinancialSnapshot = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear(); // Get current year
    const startDate = `${currentYear}-01-01T00:00:00Z`; // Start of the current year
    const endDate = new Date().toISOString(); // Current date and time

    // Calculate total income within the specified date range
    const incomeData = await Income.aggregate([
      {
        $match: {
          transactionDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: '$amount' }, // Use 'amount' field for income
        },
      },
    ]);

    // Calculate total expenses from Expense model within the specified date range
    const expenseData = await Expense.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: '$amount' }, // Use 'amount' field for expenses
        },
      },
    ]);

    // Calculate total expenses from CocoaBag model within the specified date range
    const cocoaBagExpenses = await CocoaBag.aggregate([
      {
        $match: {
          'expenses.date': {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $unwind: '$expenses',
      },
      {
        $match: {
          'expenses.date': {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalCocoaBagExpenses: { $sum: '$expenses.amount' }, // Use 'amount' field for expenses in CocoaBag model
        },
      },
    ]);

    const totalIncome = incomeData.length > 0 ? incomeData[0].totalIncome : 0;
    const totalExpenses = expenseData.length > 0 ? expenseData[0].totalExpenses : 0;
    const totalCocoaBagExpenses = cocoaBagExpenses.length > 0 ? cocoaBagExpenses[0].totalCocoaBagExpenses : 0;

    const totalCombinedExpenses = totalExpenses + totalCocoaBagExpenses;
    const profitLoss = totalIncome - totalCombinedExpenses;

    res.status(200).json({ totalIncome, totalCombinedExpenses, profitLoss });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};