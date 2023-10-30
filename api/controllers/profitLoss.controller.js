import Income from '../models/income.model.js';
import Expense from '../models/expense.model.js';
import Procurement from '../models/procurement.model.js';


export const generateProfitLossReport = async (req, res) => {
  let totalIncome = 0;
  let totalExpenses = 0;

  try {
    const { startDate, endDate } = req.query;

    // Calculate total income from Income model within the specified date range
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
          totalIncome: { $sum: '$amount' },
        },
      },
    ]);

    // Calculate total procurement expenses from Procurement model within the specified date range
    const procurementExpensesData = await Procurement.aggregate([
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
          totalProcurementExpenses: { $sum: '$amount' },
        },
      },
    ]);

    // Calculate total miscellaneous expenses from Expense model within the specified date range
    const miscellaneousExpensesData = await Expense.aggregate([
      {
        $match: {
          category: 'miscellaneous',
          date: {
            $gte: new Date(`${startDate}T00:00:00Z`),
            $lte: new Date(`${endDate}T23:59:59Z`),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalMiscellaneousExpenses: { $sum: '$amount' },
        },
      },
    ]);

    totalIncome = incomeData.length > 0 ? incomeData[0].totalIncome : 0;
    const totalProcurementExpenses = procurementExpensesData.length > 0 ? procurementExpensesData[0].totalProcurementExpenses : 0;
    const totalMiscellaneousExpenses = miscellaneousExpensesData.length > 0 ? miscellaneousExpensesData[0].totalMiscellaneousExpenses : 0;

    totalExpenses = totalProcurementExpenses + totalMiscellaneousExpenses;
    const profitLoss = totalIncome - totalExpenses;

    res.status(200).json({ totalIncome, totalExpenses, profitLoss });
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

    // Calculate total expenses from Procurement model (sum of all procurements for all batches)
    const procurementExpensesData = await Procurement.aggregate([
      {
        $group: {
          _id: null,
          totalProcurementExpenses: { $sum: '$amount' },
        },
      },
    ]);

    // Calculate total miscellaneous expenses from Expense model
    const miscellaneousExpensesData = await Expense.aggregate([
      {
        $match: {
          category: 'miscellaneous',
        },
      },
      {
        $group: {
          _id: null,
          totalMiscellaneousExpenses: { $sum: '$amount' },
        },
      },
    ]);

    const totalIncome = incomeData.length > 0 ? incomeData[0].totalIncome : 0;
    const totalProcurementExpenses = procurementExpensesData.length > 0 ? procurementExpensesData[0].totalProcurementExpenses : 0;
    const totalMiscellaneousExpenses = miscellaneousExpensesData.length > 0 ? miscellaneousExpensesData[0].totalMiscellaneousExpenses : 0;

    const totalCombinedExpenses = totalProcurementExpenses + totalMiscellaneousExpenses;
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
    const procurements = await Procurement.find({
      batchNumber,
      date: {
        $gte: formattedStartDate,
        $lte: formattedEndDate,
      },
    });

    // Calculate total expenses from procurement data
    const totalExpenses = procurements.reduce((total, procurement) => total + procurement.amount, 0);

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
