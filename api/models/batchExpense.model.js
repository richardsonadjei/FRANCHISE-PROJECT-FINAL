import mongoose from 'mongoose';

const batchExpenseSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid'], // You can adjust the enum values based on your use case
    default: 'Paid', 
  },
});

const BatchExpense = mongoose.model('BatchExpense', batchExpenseSchema);

export default BatchExpense;
