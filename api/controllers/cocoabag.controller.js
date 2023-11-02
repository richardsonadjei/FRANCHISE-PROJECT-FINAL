import CocoaBag from '../models/cocoabag.model.js';
import Transaction from '../models/transaction.model.js';
import Procurement from '../models/procurement.model.js';



const createCocoaBag = async (req, res) => {
  
 
  try {
    const {
      quantity,
      supplier,
      harvestYear,
      qcCertifications,
      packingDate,
      totalWeightPerBatch,
      comments,
      userId,
      paymentStatus, // Include paymentStatus in the destructured variables
    } = req.body;

    // Check if paymentStatus is empty
    if (!paymentStatus) {
      return res.status(400).json({ error: 'Payment status is required' });
    }

    // Create a new CocoaBag instance
    const newCocoaBag = new CocoaBag({
      quantity, // Use the quantity from the request body
      supplier,
      harvestYear,
      qcCertifications,
      packingDate,
      totalWeightPerBatch,
      comments,
      userId,
      transactionType: 'Creation',
      expenses: [
        {
          category: 'procurement',
          date: new Date(),
        },
      ],
    });

    // Save the new CocoaBag to the database
    const savedCocoaBag = await newCocoaBag.save();

    // Create a new Procurement instance with all fields included, including quantity
    const newProcurement = new Procurement({
      amount: savedCocoaBag.totalValuePerBatch,
      category: 'procurement',
      description: 'Procurement Of Cocoabeans',
      date: savedCocoaBag.createdAt, // Use the creation date of the CocoaBag
      batchNumber: savedCocoaBag.batchNumber,
      paymentStatus: paymentStatus, // Use the paymentStatus from the request body
      quantity: quantity, // Use the quantity from the request body
      totalWeightPerBatch: totalWeightPerBatch,
    });

    // Save the new Procurement to the database
    const savedProcurement = await newProcurement.save();

    res.status(201).json({ cocoaBag: savedCocoaBag, procurement: savedProcurement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};







const getAllCocoaBags = async (req, res) => {
  try {
    const cocoaBags = await CocoaBag.find();
    res.status(200).json(cocoaBags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






const getCocoaBagsWithinDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    

    // Regular expression to validate date format (YYYY-MM-DD)
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

    // Check if startDate and endDate match the expected format
    if (!dateFormat.test(startDate) || !dateFormat.test(endDate)) {
      console.log('Invalid date format. Expected format: YYYY-MM-DD');
      return res.status(400).json({ error: 'Invalid date format. Please provide valid startDate and endDate (YYYY-MM-DD).' });
    }

    // Parse startDate and endDate strings into Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    

    // Find all cocoa bags within the specified date range
    const cocoaBags = await CocoaBag.find({
      packingDate: { $gte: start, $lte: end },
    });

    res.status(200).json(cocoaBags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCocoaBagsByTransactionTypeAndDateRange = async (req, res) => {
  try {
    const { startDate, endDate, transactionType } = req.query;

    // Regular expression to validate date format (YYYY-MM-DD)
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

    // Check if startDate and endDate match the expected format
    if (!dateFormat.test(startDate) || !dateFormat.test(endDate)) {
      console.log('Invalid date format. Expected format: YYYY-MM-DD');
      return res.status(400).json({ error: 'Invalid date format. Please provide valid startDate and endDate (YYYY-MM-DD).' });
    }

    // Parse startDate and endDate strings into Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Find all cocoa bags within the specified date range and transaction type
    const cocoaBags = await CocoaBag.find({
      packingDate: { $gte: start, $lte: end },
      transactionType: transactionType,
    });

    res.status(200).json(cocoaBags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



const calculateStockDifference = async (req, res) => {
  try {
    const { physicalStock } = req.body;

    // Retrieve all cocoa bags from the database
    const cocoaBags = await CocoaBag.find();

    // Calculate the stock difference for each batch
    const stockDifferences = cocoaBags.map((bag) => {
      const batchStockDifference = bag.quantity - physicalStock;
      return {
        batchNumber: bag.batchNumber,
        stockDifference: batchStockDifference,
      };
    });

    // Respond with the stock differences for each batch
    res.status(200).json(stockDifferences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getInventorySummary = async (req, res) => {
  try {
    const cocoaBags = await CocoaBag.find();
    const totalQuantity = cocoaBags.reduce((acc, bag) => acc + bag.quantity, 0);
    const totalValue = cocoaBags.reduce((acc, bag) => acc + bag.totalValuePerBatch, 0);
    const totalWeight = cocoaBags.reduce((acc, bag) => acc + bag.totalWeightPerBatch, 0);
    res.status(200).json({ totalQuantity, totalValue, totalWeight });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const addReceivedQuantityToCocoaBag = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const { receivedQuantity, paymentStatus, receivedWeight } = req.body;

    // Find the cocoa bag with the specified batchNumber
    const cocoaBag = await CocoaBag.findOne({ batchNumber });
    if (!cocoaBag) {
      return res.status(404).json({ error: 'Cocoa bag not found' });
    }

    // Parse quantityBefore and receivedQuantity as numbers
    const quantityBefore = parseInt(cocoaBag.quantity, 10);
    const receivedQuantityParsed = parseInt(receivedQuantity, 10);
    const totalWeightBefore = cocoaBag.totalWeightPerBatch;
    const totalWeightAfter = parseInt(totalWeightBefore, 10) + parseInt(receivedWeight, 10);
// Add receivedWeight to totalWeightBefore

    // Perform addition operation to calculate quantityAfter
    const quantityAfter = quantityBefore + receivedQuantityParsed;

    // Update the quantity, received quantity, and totalWeightPerBatch of the cocoa bag
    cocoaBag.quantity = quantityAfter;
    cocoaBag.receivedQuantity += receivedQuantityParsed;
    cocoaBag.totalWeightPerBatch = totalWeightAfter;

    // Save the updated cocoa bag
    const updatedCocoaBag = await cocoaBag.save();

    // Calculate amount for the Procurement instance
    const pricePerBag = cocoaBag.pricePerBag;
    const amount = receivedQuantityParsed * pricePerBag;

    // Create a new Procurement instance with updated amount, paymentStatus, and totalWeightPerBatch
    const newProcurement = new Procurement({
      amount,
      category: 'procurement',
      description: 'Procurement Of Cocoabeans',
      date: new Date(),
      batchNumber: cocoaBag.batchNumber,
      paymentStatus: paymentStatus,
      totalWeightPerBatch: receivedWeight, // Set totalWeightPerBatch to receivedWeight
      quantity: receivedQuantityParsed, // Include received quantity in the Procurement instance
    });

    // Save the new Procurement to the database
    await newProcurement.save();

    // Create a new transaction for the received quantity update
    const transaction = new Transaction({
      batchNumber,
      transactionType: 'Update',
      userId: req.user.id,
      username: req.user.username,
      quantityBefore,
      quantityAfter,
      receivedQuantity: receivedQuantityParsed,
      totalWeightBefore,
      totalWeightAfter,
    });

    // Save the transaction
    await transaction.save();

    res.status(200).json(updatedCocoaBag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






const receiveReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC
    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0); // Set time to midnight in UTC

    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999); // Set time to end of day in UTC

   

    // Find transactions of type 'Update' within the specified date range
    const transactions = await Transaction.find({
      transactionType: 'Update',
      updatedAt: { $gte: start, $lte: end },
    });

    

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Assuming you have a Transaction model

const modifyQuantity = async (req, res) => {
  const { batchNumber } = req.params;
  const { quantity } = req.body;

  try {
    // Find the CocoaBag by batchNumber
    const cocoaBag = await CocoaBag.findOne({ batchNumber });

    if (!cocoaBag) {
      return res.status(404).json({ error: 'CocoaBag not found' });
    }

    // Store the existing quantity for logging purposes
    const quantityBefore = cocoaBag.quantity;

    // Update the CocoaBag quantity based on user input
    cocoaBag.quantity = quantity;
    await cocoaBag.save();

    // Calculate modifiedQuantity based on user input and quantityBefore
    const modifiedQuantity = quantity - quantityBefore;

    // Create a transaction entry with modified quantity
    const transaction = new Transaction({
      batchNumber,
      transactionType: 'Modify',
      userId: req.userId, // Assuming you extract user ID from the token in your middleware
      username: req.username, // Assuming you have a way to get the username
      quantityBefore,
      quantityAfter: quantity, // Updated quantityAfter with the new quantity entered by the user
      modifiedQuantity, // Save the modified quantity
    });
    await transaction.save();

    // Return the modified CocoaBag
    res.status(200).json({
      message: 'CocoaBag quantity modified successfully',
      cocoaBag,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default modifyQuantity;



export const generateTransactionReport = async (req, res) => {
  try {
    const { batchNumber, startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    const cocoaBagTransactions = await CocoaBag.find({
      batchNumber,
      updatedAt: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    const otherTransactions = await Transaction.find({
      batchNumber,
      updatedAt: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    const transactions = [...cocoaBagTransactions, ...otherTransactions];

    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const generateAllTransactionReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    const cocoaBagTransactions = await CocoaBag.find({
      updatedAt: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    const otherTransactions = await Transaction.find({
      updatedAt: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    const transactions = [...cocoaBagTransactions, ...otherTransactions];

    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};






export {
  createCocoaBag,
  getAllCocoaBags,
  getCocoaBagsWithinDateRange,
  getCocoaBagsByTransactionTypeAndDateRange,
  calculateStockDifference,
  getInventorySummary,addReceivedQuantityToCocoaBag,receiveReport,modifyQuantity,

};


