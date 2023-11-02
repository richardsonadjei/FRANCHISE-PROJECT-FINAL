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
      evacuatedWeight, // Add totalWeight to the destructuring assignment
    } = req.body;

    // Extract userID from the token (assuming you have a middleware for verifying the user)
    const userId = req.user.id;

    const waybill = new Waybill({
      customerName,
      portAgentName,
      portAgentAddress,
      portAgentContact,
      drivers,
      trucks,
      batchNumber,
      evacuatedQuantity,
      evacuatedWeight, // Include totalWeight in the Waybill creation
      userId,
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