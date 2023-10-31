import mongoose from 'mongoose';

const procurementSchema = new mongoose.Schema({
  amount: {
    type: Number,
  },
  category: {
    type: String,
    default: 'procurement',
  },
  description: {
    type: String,
    default: 'Procurement Of Cocoabeans',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  batchNumber: {
    type: String,
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Credit'],
  },
});

const Procurement = mongoose.model('Procurement', procurementSchema);

export default Procurement;
