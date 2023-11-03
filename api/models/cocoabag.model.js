import mongoose from 'mongoose';

function generateRandomBatchNumber() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return randomNumber.toString();
}

const cocoaBagSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
    unique: true,
    required: true,
    default: generateRandomBatchNumber,
  },
  quantity: {
    type: Number,
    required: true,
  },
  pricePerBag: {
    type: Number,
    default: 1308,
    required: true,
  },
  qcCertifications: {
    type: String,
    enum: ['Graded And Sealed', 'Not Graded And Sealed'],
  },
  packingDate: {
    type: Date,
    required: true,
  },
  comments: {
    type: String,
  },
  totalWeightPerBatch: {
    type: Number,
    required: true,
  },
  totalValuePerBatch: {
    type: Number,
    default: function () {
      return this.quantity * this.pricePerBag;
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  transactionType: {
    type: String,
    enum: ['Creation'],
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  supplier: {
    type: String,
  },
});


const CocoaBag = mongoose.model('CocoaBag', cocoaBagSchema);

export default CocoaBag;
