import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ['Update', 'Modify', 'Evacuation'],
    required: true,
  },
  receivedQuantity: {
    type: Number,
    default: 0,
  },
  modifiedQuantity: {
    type: Number,
    default: 0,
  },
  quantityBefore: {
    type: Number,
    required: true,
  },
  quantityAfter: {
    type: Number,
    required: true,
  },
  evacuatedQuantity: {
    type: Number,
  },
  totalWeightBefore: {
    type: Number,
    
  },
  totalWeightAfter: {
    type: Number,
   
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  evacuationDate: {
    type: Date,
    default: Date.now(),
  },
  recordedBy: {
    type: String,
    required: true,
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;