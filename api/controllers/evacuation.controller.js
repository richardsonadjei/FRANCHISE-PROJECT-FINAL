import Evacuation from '../models/evacuation.model.js'
import Transaction from '../models/transaction.model.js'; // Import the Transaction model
import CocoaBag from '../models/cocoabag.model.js'; // Import the CocoaBag model

// Controller function for performing evacuation
const performEvacuation = async (req, res) => {
  try {
    // Extract data from the request body
    const { batchNumber, evacuatedQuantity, customerName, shippingLocation, shippingMethod } = req.body;

    // Find the existing quantity of cocoa bags in the database before the evacuation
    const cocoaBagBeforeEvacuation = await CocoaBag.findOne({ batchNumber });
    if (!cocoaBagBeforeEvacuation) {
      // Handle the case where the batch number is not found in the CocoaBag model
      return res.status(404).json({ error: 'Batch number not found' });
    }

    // Calculate quantityBefore and quantityAfter
    const quantityBefore = cocoaBagBeforeEvacuation.quantity;
    const quantityAfter = quantityBefore - evacuatedQuantity;

    // Create a new evacuation instance
    const evacuation = new Evacuation({
      batchNumber,
      evacuatedQuantity,
      customerName,
      shippingLocation,
      shippingMethod,
    });

    // Save the evacuation details to the database
    await evacuation.save();

    // Create a new transaction record for the evacuation
    const transaction = new Transaction({
      batchNumber,
      transactionType: 'Evacuation',
      evacuatedQuantity,
      quantityBefore,
      quantityAfter,
      evacuationDate: evacuation.evacuationDate, // Use the evacuation date from the Evacuation model
    });

    // Save the transaction details to the database
    await transaction.save();

    // Update the existing quantity of cocoa bags in the CocoaBag model
    cocoaBagBeforeEvacuation.quantity = quantityAfter;
    await cocoaBagBeforeEvacuation.save();

    // Send a success response
    return res.status(201).json({ message: 'Evacuation successful', evacuation, transaction });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { performEvacuation };
