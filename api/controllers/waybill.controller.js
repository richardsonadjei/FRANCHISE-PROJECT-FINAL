import Waybill from '../models/waybill.model.js'; // Update the file extension to .js


export const createWaybill = async (req, res) => {
  try {
    const {
      customerName,
      recipientName,
      recipientAddress,
      driversName,
      driversAddress,
      batchNumber,
      evacuatedQuantity,
    } = req.body;

    // Extract userID from the token (assuming you have a middleware for verifying the user)
    const userId = req.user.id;

    const waybill = new Waybill({
      customerName,
      recipientName,
      recipientAddress,
      driversName,
      driversAddress,
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
