import Evacuation from '../models/evacuation.model.js'
import Transaction from '../models/transaction.model.js'; // Import the Transaction model
import CocoaBag from '../models/cocoabag.model.js'; // Import the CocoaBag model

// Controller function for performing evacuation
const performEvacuation = async (req, res) => {
  try {
    // Extract data from the request body
    const { batchNumber, evacuatedQuantity, evacuatedWeight, customerName, shippingLocation, shippingMethod,recordedBy } = req.body;

    // Find the existing quantity and totalWeightPerBatch of cocoa bags in the database before the evacuation
    const cocoaBagBeforeEvacuation = await CocoaBag.findOne({ batchNumber });
    if (!cocoaBagBeforeEvacuation) {
      // Handle the case where the batch number is not found in the CocoaBag model
      return res.status(404).json({ error: 'Batch number not found' });
    }

    // Calculate quantityBefore and quantityAfter
    const quantityBefore = cocoaBagBeforeEvacuation.quantity;
    const quantityAfter = quantityBefore - evacuatedQuantity;
    const totalWeightBefore = cocoaBagBeforeEvacuation.totalWeightPerBatch;
    const totalWeightAfter = totalWeightBefore - evacuatedWeight;

    // Update totalValuePerBatch after evacuation
    const totalValuePerBatch = quantityAfter * 1308; // Assuming 1308 is the unit price per quantity

    // Update the existing quantity, totalWeightPerBatch, and totalValuePerBatch of cocoa bags in the CocoaBag model
    cocoaBagBeforeEvacuation.quantity = quantityAfter;
    cocoaBagBeforeEvacuation.totalWeightPerBatch = totalWeightAfter;
    cocoaBagBeforeEvacuation.totalValuePerBatch = totalValuePerBatch;
    await cocoaBagBeforeEvacuation.save();

    // Create a new evacuation instance
    const evacuation = new Evacuation({
      batchNumber,
      evacuatedQuantity,
      evacuatedWeight,
      customerName,
      shippingLocation,
      shippingMethod,
      recordedBy, 
    });

    // Save the evacuation details to the database
    await evacuation.save();

    // Create a new transaction record for the evacuation
    const transaction = new Transaction({
      batchNumber,
      transactionType: 'Evacuation',
      receivedQuantity: 0,
      modifiedQuantity: 0,
      quantityBefore,
      quantityAfter,
      evacuatedQuantity,
      totalWeightBefore,
      totalWeightAfter,
      recordedBy,
      evacuationDate: evacuation.evacuationDate, // Use the evacuation date from the Evacuation model
    });

    // Save the transaction details to the database
    await transaction.save();

    // Send a success response
    return res.status(201).json({ message: 'Evacuation successful', evacuation, transaction });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};











const getEvacuationsByPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const evacuations = await Evacuation.find({
      evacuationDate: {
        $gte: new Date(`${startDate}T00:00:00Z`), // Set the start time to midnight UTC
        $lte: new Date(`${endDate}T23:59:59Z`),   // Set the end time to 11:59:59 PM UTC
      },
    });
   
    return res.status(200).json({ evacuations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getEvacuationsByBatchAndPeriod = async (req, res) => {
  try {
    const { batchNumber, startDate, endDate } = req.query;


    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const evacuations = await Evacuation.find({
      batchNumber,
      evacuationDate: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });



    return res.status(200).json({ evacuations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { performEvacuation, getEvacuationsByPeriod,getEvacuationsByBatchAndPeriod };
