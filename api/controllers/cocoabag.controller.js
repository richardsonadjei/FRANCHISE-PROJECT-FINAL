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
    });

    // Save the new CocoaBag to the database
    const savedCocoaBag = await newCocoaBag.save();

    res.status(201).json(savedCocoaBag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default createCocoaBag;


export const getAllCocoaBags = async (req, res) => {
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

    // Update the cocoa bag by batchNumber
    const updatedCocoaBag = await CocoaBag.findOneAndUpdate(
      { batchNumber: batchNumber },
      { quantity: quantity },
      { new: true }
    );

    if (!updatedCocoaBag) {
      return res.status(404).json({ error: 'Cocoa bag not found' });
    }

    res.status(200).json(updatedCocoaBag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { updateCocoaBagQuantityByBatchNumber };
