import CocoaBag from '../models/cocoabag.model.js';
import Transaction from '../models/transaction.model.js';

const createCocoaBag = async (req, res) => {
  try {
    const {
      quantity,
      supplier,
      harvestYear,
      qcCertifications,
      packingDate,
      averageNetWeightPerBag,
      averageGrossWeightPerBag,
      comments,
      userId,
    } = req.body;

    // Create a new CocoaBag instance
    const newCocoaBag = new CocoaBag({
      quantity,
      supplier,
      harvestYear,
      qcCertifications,
      packingDate,
      averageNetWeightPerBag,
      averageGrossWeightPerBag,
      comments,
      userId,
      transactionType: 'Creation',
    });

    // Save the new CocoaBag to the database
    const savedCocoaBag = await newCocoaBag.save();
    res.status(201).json(savedCocoaBag);
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
    res.status(200).json({ totalQuantity, totalValue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const addReceivedQuantityToCocoaBag = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const { receivedQuantity } = req.body;

    // Find the cocoa bag with the specified batchNumber
    const cocoaBag = await CocoaBag.findOne({ batchNumber });

    if (!cocoaBag) {
      return res.status(404).json({ error: 'Cocoa bag not found' });
    }

    const quantityBefore = cocoaBag.quantity;
    const quantityAfter = quantityBefore + receivedQuantity;

    // Update the quantity and received quantity of the cocoa bag
    cocoaBag.quantity = quantityAfter;
    cocoaBag.receivedQuantity += receivedQuantity;

    // Save the updated cocoa bag
    const updatedCocoaBag = await cocoaBag.save();

    // Create a new transaction for the received quantity update
    const transaction = new Transaction({
      batchNumber,
      transactionType: 'Update',
      userId: req.user.id,
      quantityBefore,
      quantityAfter,
      receivedQuantity,
    });

    // Save the transaction
    await transaction.save();

    res.status(200).json(updatedCocoaBag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






export {
  createCocoaBag,
  getAllCocoaBags,
  getCocoaBagsWithinDateRange,
  getCocoaBagsByTransactionTypeAndDateRange,
  calculateStockDifference,
  getInventorySummary,addReceivedQuantityToCocoaBag

};


