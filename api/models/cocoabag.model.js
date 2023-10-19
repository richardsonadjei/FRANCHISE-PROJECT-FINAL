import mongoose from 'mongoose';

const cocoaBagSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true
  },
  pricePerBag: {
    type: Number,
    default: 830, 
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Supplier model
    ref: 'Supplier', // The model to use for the reference
    required: true
  },
  batchNumber: {
    type: String,
    unique: true,
    required: true,
    default: function() {
      // Generate a six-digit batch number
      const randomNumber = Math.floor(100000 + Math.random() * 900000);
      return randomNumber.toString();
    }
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
  averageNetWeight: {
    type: Number,
    required: true,
  },
  averageGrossWeight: {
    type: Number,
    required: true,
  },
  comments: {
    type: String
  }
});

const CocoaBag = mongoose.model('CocoaBag', cocoaBagSchema);

export default CocoaBag; // Export the model as default
