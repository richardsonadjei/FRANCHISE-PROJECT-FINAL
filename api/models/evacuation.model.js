import mongoose from 'mongoose';

const evacuationSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
    required: true,
  },
  evacuatedQuantity: {
    type: Number,
    required: true,
  },
  evacuationDate: {
    type: Date,
    default: Date.now,
  },
  customerName: {
    type: String,
    required: true,
  },
  shippingLocation: {
    type: String,
    required: true,
  },
  shippingMethod: {
    type: String,
    required: true,
  },
  evacuationStatus: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
  // Add more fields as needed for additional evacuation details
});

const Evacuation = mongoose.model('Evacuation', evacuationSchema);

export default Evacuation;
