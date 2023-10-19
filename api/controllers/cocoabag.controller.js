import CocoaBag from '../models/cocoabag.model.js';

const createCocoaBag = async (req, res) => {
  try {
    const {
      quantity,
      supplier,
      harvestYear,
      qcCertifications,
      packingDate,
      averageNetWeight,
      averageGrossWeight,
      comments,
    } = req.body;

    // Create a new CocoaBag instance
    const newCocoaBag = new CocoaBag({
      quantity,
      supplier,
      harvestYear,
      qcCertifications,
      packingDate,
      averageNetWeight,
      averageGrossWeight,
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