import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  personName: {
    type: String,
    default: null,
  },
  receiptNumber: {
    type: String,
    default: null,
  },
});

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending'], // You can adjust the enum values based on your use case
    default: 'Pending', // Default value is set to 'Pending'
  },
  date: {
    type: Date,
    default: Date.now,
  },
  recordedBy:{
    type: String,
    required: true,
  },
 
  transaction: transactionSchema,
 
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
