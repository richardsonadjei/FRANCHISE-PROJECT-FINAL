import Income from '../models/income.model.js';
import Expense from '../models/expense.model.js';
import Procurement from '../models/procurement.model.js';
import BatchExpense from '../models/batchExpense.model.js';



export const generateProfitLossReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Fetch all data from Procurement model within the specified date range
    const procurementData = await Procurement.find({
      date: {
        $gte: new Date(`${startDate}T00:00:00Z`),
        $lte: new Date(`${endDate}T23:59:59Z`),
      },
    });

    // Calculate total procurement expenses
    const totalProcurementExpenses = procurementData.reduce((sum, item) => sum + item.amount, 0);

    // Fetch all data from BatchExpense model within the specified date range
    const batchExpensesData = await BatchExpense.find({
      date: {
        $gte: new Date(`${startDate}T00:00:00Z`),
        $lte: new Date(`${endDate}T23:59:59Z`),
      },
    });

    // Calculate total batch expenses
    const totalBatchExpenses = batchExpensesData.reduce((sum, item) => sum + item.amount, 0);

    // Fetch all data from Expense model within the specified date range
    const miscellaneousExpensesData = await Expense.find({
      date: {
        $gte: new Date(`${startDate}T00:00:00Z`),
        $lte: new Date(`${endDate}T23:59:59Z`),
      },
    });

    // Calculate total miscellaneous expenses
    const totalMiscellaneousExpenses = miscellaneousExpensesData.reduce((sum, item) => sum + item.amount, 0);

    // Fetch all data from Income model within the specified date range
    const incomeData = await Income.find({
      transactionDate: {
        $gte: new Date(`${startDate}T00:00:00Z`),
        $lte: new Date(`${endDate}T23:59:59Z`),
      },
    });

    // Calculate total income
    const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);

    // Calculate total expenses from all models
    const totalExpenses = totalProcurementExpenses + totalBatchExpenses + totalMiscellaneousExpenses;

    res.status(200).json({
      procurementData,
      totalProcurementExpenses,
      batchExpensesData,
      totalBatchExpenses,
      miscellaneousExpensesData,
      totalMiscellaneousExpenses,
      incomeData,
      totalIncome,
      totalExpenses,
      profitLoss: totalIncome - totalExpenses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





export const getFinancialSnapshot = async (req, res) => {
  try {
    // Calculate total income from all income records
    const incomeData = await Income.aggregate([
      {
        $group: {
          _id: null,
          totalIncome: { $sum: '$amount' }, // Use 'amount' field for income
        },
      },
    ]);

    // Calculate total procurement expenses from Procurement model (sum of all procurements for all batches)
    const totalProcurementExpensesData = await Procurement.aggregate([
      {
        $group: {
          _id: null,
          totalProcurementExpenses: { $sum: '$amount' },
        },
      },
    ]);

    // Calculate total batch expenses from BatchExpense model (sum of all amounts for batch expenses)
    const totalBatchExpensesData = await BatchExpense.aggregate([
      {
        $group: {
          _id: null,
          totalBatchExpenses: { $sum: '$amount' },
        },
      },
    ]);

    // Calculate total expenses from Expense model (sum of all amounts for all categories)
    const totalExpensesData = await Expense.aggregate([
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: '$amount' },
        },
      },
    ]);

    const totalIncome = incomeData.length > 0 ? incomeData[0].totalIncome : 0;
    const totalProcurementExpenses = totalProcurementExpensesData.length > 0 ? totalProcurementExpensesData[0].totalProcurementExpenses : 0;
    const totalBatchExpenses = totalBatchExpensesData.length > 0 ? totalBatchExpensesData[0].totalBatchExpenses : 0;
    const totalExpenses = totalExpensesData.length > 0 ? totalExpensesData[0].totalExpenses : 0;

    const totalCombinedExpenses = totalProcurementExpenses + totalBatchExpenses + totalExpenses;
    const profitLoss = totalIncome - totalCombinedExpenses;

    res.status(200).json({ totalIncome, totalCombinedExpenses, profitLoss });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




export const generateProfitLossByBatch = async (req, res) => {
  try {
    const { batchNumber, startDate, endDate } = req.query;
    // Convert start and end dates to proper Date objects
    const formattedStartDate = new Date(`${startDate}T00:00:00Z`);
    const formattedEndDate = new Date(`${endDate}T23:59:59Z`);
    
    // Find all procurements for the specified batch within the date range
    const procurementExpenses = await Procurement.find({
      batchNumber,
      date: {
        $gte: formattedStartDate,
        $lte: formattedEndDate,
      },
    });
    
    // Find all batch expenses for the specified batch within the date range
    const batchExpenses = await BatchExpense.find({
      batchNumber,
      date: {
        $gte: formattedStartDate,
        $lte: formattedEndDate,
      },
    });

    // Calculate total expenses from procurement data
    const totalProcurementExpenses = procurementExpenses.reduce((total, procurement) => total + procurement.amount, 0);
    console.log("Total procurement expenses:", totalProcurementExpenses);

    // Calculate total batch expenses
    const totalBatchExpenses = batchExpenses.reduce((total, batchExpense) => total + batchExpense.amount, 0);
    console.log("Total batch expenses:", totalBatchExpenses);

    const totalExpenses = totalProcurementExpenses + totalBatchExpenses;
    console.log("Total expenses:", totalExpenses);

    // Find income data for the specified batch within the date range
    const income = await Income.findOne({
      batchNumber,
      transactionDate: {
        $gte: formattedStartDate,
        $lte: formattedEndDate,
      },
    });
    
    if (!income) {
      return res.status(404).json({ error: 'Income data not found for the specified batch and date range' });
    }

    // Calculate profit or loss
    const totalIncome = income.amount;
    const profitLoss = totalIncome - totalExpenses;
    
    res.status(200).json({ totalIncome, totalExpenses, profitLoss });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

