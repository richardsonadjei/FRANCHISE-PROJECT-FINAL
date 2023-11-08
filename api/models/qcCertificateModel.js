import mongoose from 'mongoose';

const qcCertificateSchema = new mongoose.Schema({
  filename: String,
  path: String,
  originalname: String,
  batchNumber: {
    type: String, // You can change the data type according to your requirements (String, Number, etc.)
    required: true, // Set it to true if the batchNumber is required
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const QCCertificate = mongoose.model('QCCertificate', qcCertificateSchema);

export default QCCertificate;
