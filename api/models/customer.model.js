import mongoose from 'mongoose';

const businessCustomerSchema = new mongoose.Schema({
  // Business Information
  companyName: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  website: {
    type: String,
  },

  // Contact Information
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  // Financial Information
  bankingDetails: {
    accountNumber: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    bankBranch: {
        type: String,
        required: true,
      },
    // Other banking details as needed
  },
  mobileMoneyDetails: {
    phoneNumber: {
      type: String,
     
    },
    provider: {
      type: String,
      required: true,
    },
    // Other mobile money details as needed
  },
  // Purchase History
  

  // Additional Fields for Reports
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const BusinessCustomer = mongoose.model('BusinessCustomer', businessCustomerSchema);

export default BusinessCustomer;
