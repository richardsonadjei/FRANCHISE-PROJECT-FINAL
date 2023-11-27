import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const { Schema, model } = mongoose;

// Counter schema to store the batch number counter
const counterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    default: 1,
  },
});

const Counter = model('Counter', counterSchema);

const autoIncrement = AutoIncrementFactory(mongoose);

const cocoaBagSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
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
    
  },
  supplier: {
    type: String,
    
  },
  
}, {
  timestamps: true,
});

// Pre-save hook to generate the alphanumeric batchNumber
cocoaBagSchema.pre('save', async function (next) {
  try {
    if (!this.batchNumber) {
      // Find the counter for the batch
      const counter = await Counter.findOneAndUpdate(
        { name: 'batchNumber' },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
      );

      // Generate the batch number with letters (A, B, C, ...)
      const letter = String.fromCharCode(65 + Math.floor(counter.value / 100)); // ASCII code for 'A' is 65
      const number = (counter.value % 100).toString().padStart(3, '0');
      this.batchNumber = `${letter}${number}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const CocoaBag = mongoose.model('CocoaBag', cocoaBagSchema);

export default CocoaBag;
