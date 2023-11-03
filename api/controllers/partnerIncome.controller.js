import Procurement from '../models/procurement.model.js';
import BatchExpense from '../models/batchExpense.model.js';
import Partner from '../models/partners.model.js';
import PartnerIncome from '../models/partnerIncome.model.js';
import Income from '../models/income.model.js';

export const calculateAndDistributeProfit = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Calculate total expenses (sum of procurements and batch expenses) for the specified batch from Procurement and BatchExpense models
    const procurementExpenses = await Procurement.aggregate([
      {
        $match: {
          batchNumber: batchNumber,
        },
      },
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: '$amount' },
        },
      },
    ]);

    const batchExpenses = await BatchExpense.aggregate([
      {
        $match: {
          batchNumber: batchNumber,
        },
      },
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: '$amount' },
        },
      },
    ]);

    const totalExpenses = (procurementExpenses.length ? procurementExpenses[0].totalExpenses : 0) +
                         (batchExpenses.length ? batchExpenses[0].totalExpenses : 0);

    // Calculate total income for the specified batch from Income model
    const incomeData = await Income.aggregate([
      {
        $match: {
          batchNumber: batchNumber,
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: '$amount' },
        },
      },
    ]);

    const totalIncome = incomeData.length ? incomeData[0].totalIncome : 0;

    // Calculate profit for the batch
    const profit = totalIncome - totalExpenses;

    // Get partners and their contributions from Partner model
    const partners = await Partner.find();

    // Calculate total contribution of all partners
    const totalContributions = partners.reduce((total, partner) => total + partner.contribution, 0);

    // Distribute profit among partners based on their contribution
    partners.forEach(async (partner) => {
      const partnerProfitShare = (partner.contribution / totalContributions) * profit;

      // Create a PartnerIncome instance for each partner
      const partnerIncome = new PartnerIncome({
        partnerId: partner._id,
        batchNumber: batchNumber,
        incomeAmount: partnerProfitShare,
        purpose: 'Cocoa Evacuation',
      });

      // Save partner's income share to PartnerIncome model
      await partnerIncome.save();
    });

    res.status(200).json({ message: 'Profit calculated and distributed among partners successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




export const getPartnerIncomesByPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate with specific time (00:00:00 for start date and 23:59:59 for end date) in UTC
    const start = new Date(`${startDate}T00:00:00Z`);
    const end = new Date(`${endDate}T23:59:59Z`);

    // Fetch partnerIncomes within the specified period
    const partnerIncomes = await PartnerIncome.find({
      createdAt: { $gte: start, $lte: end },
    });

    // Fetch partner names associated with each partnerIncome record
    const partnerIncomesWithNames = await Promise.all(partnerIncomes.map(async (income) => {
      const partner = await Partner.findById(income.partnerId);
      return {
        partnerName: partner.name,
        ...income.toObject(), // Include other income fields if needed
      };
    }));

    res.status(200).json({ partnerIncomes: partnerIncomesWithNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
