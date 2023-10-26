import mongoose from 'mongoose';

const waybillSchema = new mongoose.Schema({
  wayBillNumber: {
    type: String,
    default: () => {
      // Generate an alphanumeric 8-digit wayBillNumber
      const alphanumeric = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let wayBillNumber = '';
      for (let i = 0; i < 8; i++) {
        wayBillNumber += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
      }
      return wayBillNumber;
    },
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  recipientName: {
    type: String,
    required: true,
  },
  recipientAddress: {
    type: String,
    required: true,
  },
  driversName: {
    type: String,
    required: true,
  },
  driversAddress: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    required: true,
  },
  evacuatedQuantity: {
    type: Number,
  },
  totalWeight: {
    type: Number,
    default: function () {
      // Calculate total weight in tonnes based on evacuated quantity
      if (this.evacuatedQuantity) {
        return (0.05 * this.evacuatedQuantity).toFixed(2);
      }
      return 0;
    },
    get: function () {
      // Display the total weight with unit (tonnes)
      return this.totalWeight.toFixed(2) + ' tonnes';
    },
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
  deliveryStatus: {
    type: String,
    enum: ['Shipped', 'Delivered', 'In Transit'],
    default: 'In Transit',
  },
  userId: {
    type: String,
    required: true,
  },
});

const Waybill = mongoose.model('Waybill', waybillSchema);
export default Waybill;
