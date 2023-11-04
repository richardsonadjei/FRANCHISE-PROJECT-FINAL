import mongoose from 'mongoose';

const qcCertificateSchema = new mongoose.Schema({
  filename: String,
  path: String,
  originalname: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const QCCertificate = mongoose.model('QCCertificate', qcCertificateSchema);

export default QCCertificate;
