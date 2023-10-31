import mongoose from 'mongoose';

const batchExpenseSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
    required: true,
  },
  expenses: [
    {
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
    },
  ],
});

const BatchExpense = mongoose.model('BatchExpense', batchExpenseSchema);

export default BatchExpense;
