import Waybill from '../models/waybill.model.js'; // Update the file extension to .js


export const createWaybill = async (req, res) => {
  try {
    const {
      invoiceNumber,
      recipientName,
      recipientAddress,
      driversName,
      driversAddress,
      batchNumber,
      totalQuantity,
      totalWeight,
    } = req.body;

    // Extract userID from the token (assuming you have a middleware for verifying the user)
    const userId = req.user.id;

    const waybill = new Waybill({
      invoiceNumber,
      recipientName,
      recipientAddress,
      driversName,
      driversAddress,
      batchNumber,
      totalQuantity,
      totalWeight,
      userId,
    });

    await waybill.save();

    return res.status(201).json({ message: 'Waybill created successfully', waybill });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
