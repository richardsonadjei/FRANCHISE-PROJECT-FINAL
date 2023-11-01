import Procurement from '../models/procurement.model.js'; // Import the Procurement model

const getProcurementsByBatchAndPeriod = async (req, res) => {
  try {
    const { batchNumber, startDate, endDate } = req.query;

    const procurements = await Procurement.find({
      batchNumber,
      date: {
        $gte: new Date(`${startDate}T00:00:00Z`), // Set the start time to midnight UTC
        $lte: new Date(`${endDate}T23:59:59Z`),   // Set the end time to 11:59:59 PM UTC
      },
    });

    return res.status(200).json({ procurements });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getProcurementsByBatchAndPeriod;

export const allProcurementsByPeriod = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      const procurements = await Procurement.find({
        date: {
          $gte: new Date(`${startDate}T00:00:00Z`), // Set the start time to midnight UTC
          $lte: new Date(`${endDate}T23:59:59Z`),   // Set the end time to 11:59:59 PM UTC
        },
      });
  
      return res.status(200).json({ procurements });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
 
