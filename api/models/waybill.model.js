import mongoose from 'mongoose';

const waybillSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
  },
  recipientName: { // Corrected spelling
    type: String,
    required: true,
  },
  recipientAddress: { // Corrected spelling
    type: String,
    required: true,
  },
  driversName: {
    type: String,
    required: true,
  },
  driversAddress: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  totalWeight: {
    type: Number,
    required: true,
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
  deliveryStatus: {
    type: String,
    enum: ['Shipped', 'Delivered', 'In Transit'],
    default: 'In Transit',
  },
  userId: {
    type: String,
    required: true,
  },
});

const Waybill = mongoose.model('Waybill', waybillSchema);
export default Waybill;