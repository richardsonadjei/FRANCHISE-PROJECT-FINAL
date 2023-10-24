import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
    default:'Cocoa Sales'
  },
  batchNumber: {
    type: String,
    required: true,
  },
  evacuatedQuantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    default: function () {
      // Calculate amount as 830 multiplied by evacuatedQuantity
      return 830 * this.evacuatedQuantity;
    },
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Bank Transaction', 'Mobile Money'],
    required: true,
  },
  bankTransactionDetails: {
    // Bank transaction details schema
    bankName: {
      type: String,
    },
    paidInBy: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    transactionId: {
      type: String,
    },
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
  customerName: {
    type: String,
  },
  invoiceNumber: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending', 'Failed'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
   userId: {
    type: String,
    required: true,
  },
});

// Function to generate a random alphanumeric string for invoiceNumber
function generateInvoiceNumber() {
  const alphanumericCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let invoiceNumber = '';
  for (let i = 0; i < 5; i++) {
    invoiceNumber += alphanumericCharacters.charAt(Math.floor(Math.random() * alphanumericCharacters.length));
  }
  return invoiceNumber;
}

// Middleware to generate invoice number before saving
incomeSchema.pre('save', function (next) {
  if (!this.invoiceNumber) {
    this.invoiceNumber = generateInvoiceNumber();
  }
  next();
});

const Income = mongoose.model('Income', incomeSchema);

export default Income;
