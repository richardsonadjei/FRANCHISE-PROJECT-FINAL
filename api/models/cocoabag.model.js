import mongoose from 'mongoose';

const cocoaBagSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  pricePerBag: {
    type: Number,
    default: 830,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    unique: true,
    required: true,
    default: function () {
      const randomNumber = Math.floor(100000 + Math.random() * 900000);
      return randomNumber.toString();
    },
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
    required: true,
    default: function () {
      return this.quantity * this.pricePerBag;
    },
  },
});

const CocoaBag = mongoose.model('CocoaBag', cocoaBagSchema);

export default CocoaBag;
