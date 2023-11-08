import upload from '../../uploads/multer-config.js';
import QCModel from '../models/qcCertificateModel.js';

const uploadQCCertificate = upload.single('certificate');

const uploadQCCertificateController = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      uploadQCCertificate(req, res, (err) => {
        if (err) {
          console.error('Multer Error:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const { filename, path, originalname } = req.file;
    const { batchNumber } = req.body; // Extract batchNumber from request body

    if (!batchNumber) {
      throw new Error('Batch number is required.'); // Validate if batchNumber is provided
    }

    const newCertificate = new QCModel({
      filename,
      path,
      originalname,
      batchNumber, // Include batchNumber in the newCertificate object
    });

    const savedCertificate = await newCertificate.save();

    return res.status(201).json({ message: 'QC Certificate uploaded successfully', certificate: savedCertificate });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
};

export { uploadQCCertificateController };
