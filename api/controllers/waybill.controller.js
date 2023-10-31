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
      userId,
    });

    await waybill.save();

    return res.status(201).json({ message: 'Waybill created successfully', waybill });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
