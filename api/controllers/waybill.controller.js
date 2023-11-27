import Waybill from '../models/waybill.model.js';

export const createWaybill = async (req, res) => {
  try {
    const {
      customerName,
      portAgentName,
      portAgentAddress,
      portAgentContact,
      drivers,
      trucks,
      batchNumber,
      evacuatedQuantity,
      evacuatedWeight,
      generatedBy
    } = req.body;

    const waybill = new Waybill({
      customerName,
      portAgentName,
      portAgentAddress,
      portAgentContact,
      drivers,
      trucks,
      batchNumber,
      evacuatedQuantity,
      evacuatedWeight,
      generatedBy // Include totalWeight in the Waybill creation
      
    });

    await waybill.save();

    return res.status(201).json({ message: 'Waybill created successfully', waybill });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getAllWaybillsByPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Assuming startDate and endDate are provided in the format 'YYYY-MM-DD'
    const waybills = await Waybill.find({
      createdAt: {
        $gte: new Date(`${startDate}T00:00:00.000Z`), // Start of the day for startDate
        $lte: new Date(`${endDate}T23:59:59.999Z`),   // End of the day for endDate
      },
    });

    return res.status(200).json({ waybills });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};