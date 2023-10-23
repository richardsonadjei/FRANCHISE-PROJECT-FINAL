import CocoaBag from '../models/cocoabag.model.js';

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

const updateCocoaBagQuantityByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params; // Get the batchNumber of the cocoa bag to be updated
    const { quantity } = req.body; // Get the new quantity value from the request body

    // Retrieve the existing cocoa bag document
    const existingCocoaBag = await CocoaBag.findOne({ batchNumber });

    if (!existingCocoaBag) {
      return res.status(404).json({ error: 'Cocoa bag not found' });
    }

    const previousQuantity = existingCocoaBag.quantity; // Get the previous quantity

    // Update the cocoa bag by batchNumber
    const updatedCocoaBag = await CocoaBag.findOneAndUpdate(
      { batchNumber },
      { quantity, updatedAt: Date.now(), transactionType: 'Update' },
      { new: true }
    );

    res.status(200).json({ updatedCocoaBag, previousQuantity });
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

const receiveStock = async (req, res) => {
  try {
    const { batchNumber, receivedQuantity } = req.body;

    // Retrieve the existing cocoa bag document
    const existingCocoaBag = await CocoaBag.findOne({ batchNumber });

    if (!existingCocoaBag) {
      return res.status(404).json({ error: 'Cocoa bag not found' });
    }

    // Update the received quantity of the cocoa bag by batchNumber
    existingCocoaBag.receivedQuantity += receivedQuantity;
    await existingCocoaBag.save();

    res.status(200).json(existingCocoaBag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export {
  createCocoaBag,
  getAllCocoaBags,
  updateCocoaBagQuantityByBatchNumber,
  getCocoaBagsWithinDateRange,
  getCocoaBagsByTransactionTypeAndDateRange,
  calculateStockDifference,getInventorySummary,receiveStock
};


