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
      paymentStatus: 'Pending',
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
}



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

    // Calculate total batch expenses
    const totalBatchExpenses = batchExpenses.reduce((total, batchExpense) => total + batchExpense.amount, 0);

    const totalExpenses = totalProcurementExpenses + totalBatchExpenses;

    // Find income data for the specified batch within the date range
    const incomeData = await Income.find({
      batchNumber,
      transactionDate: {
        $gte: formattedStartDate,
        $lte: formattedEndDate,
      },
    });

    // Calculate total income
    const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);

    const profitLoss = totalIncome - totalExpenses;

    res.status(200).json({
      procurementExpenses,
      totalProcurementExpenses,
      batchExpenses,
      totalBatchExpenses,
      incomeData,
      totalIncome,
      totalExpenses,
      profitLoss,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

