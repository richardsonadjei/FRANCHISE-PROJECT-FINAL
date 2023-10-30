import Procurement from '../models/procurement.model.js';
import CocoaBag from '../models/cocoabag.model.js';
import Partner from '../models/partners.model.js';
import PartnerIncome from '../models/partnerIncome.model.js';

export const calculateAndDistributeProfit = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Calculate total expenses (sum of procurements) for the specified batch from Procurement model
    const procurementData = await Procurement.aggregate([
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

    // Find income for the specified batch from CocoaBag model
    const cocoaBag = await CocoaBag.findOne({ batchNumber });

    if (!cocoaBag || !procurementData.length) {
      return res.status(404).json({ error: 'Data not found for the specified batch' });
    }

    const totalExpenses = procurementData[0].totalExpenses;
    const totalIncome = cocoaBag.totalValuePerBatch;

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
