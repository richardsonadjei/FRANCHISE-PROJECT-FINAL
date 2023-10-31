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
  harvestYear: {
    type: Number,
    required: true,
  },
  qcCertifications: {
    type: String,
    enum: ['Certified', 'Yet To Certify', 'Not Certified'],
  },
  packingDate: {
    type: Date,
    required: true,
  },
  averageNetWeightPerBag: {
    type: Number,
    required: true,
  },
  averageGrossWeightPerBag: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
  },
  totalAverageNetWeightPerBatch: {
    type: Number,
    required: true,
    default: function () {
      return this.quantity * this.averageNetWeightPerBag;
    },
  },
  totalAverageGrossWeightPerBatch: {
    type: Number,
    required: true,
    default: function () {
      return this.quantity * this.averageGrossWeightPerBag;
    },
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
  feedback: {
    type: String,
  },
  supplier: {
    type: String,
  },
  expenses: [
    {
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
    },
  ],
});

// Pre-save middleware to update totalValuePerBatch and amount in expenses
cocoaBagSchema.pre('save', function (next) {
  this.totalValuePerBatch = this.quantity * this.pricePerBag;

  // Update amount and set batchNumber in expenses based on pricePerBag and quantity
  this.expenses.forEach((expense) => {
    expense.amount = this.pricePerBag * this.quantity;
    expense.batchNumber = this.batchNumber; // Set batchNumber for each expense
  });

  next();
});

const CocoaBag = mongoose.model('CocoaBag', cocoaBagSchema);

export default CocoaBag;
