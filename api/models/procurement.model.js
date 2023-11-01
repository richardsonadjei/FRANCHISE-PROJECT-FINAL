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
  totalWeightPerBatch: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
});


const Procurement = mongoose.model('Procurement', procurementSchema);

export default Procurement;
