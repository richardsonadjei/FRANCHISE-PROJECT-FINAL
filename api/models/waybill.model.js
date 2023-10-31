import mongoose from 'mongoose';

// Nested schema for driver details
const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
});

// Nested schema for truck details
const truckSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
});

// Main waybill schema including arrays of drivers and trucks
const waybillSchema = new mongoose.Schema({
    wayBillNumber: {
      type: String,
      default: () => {
        // Generate a unique 6-digit wayBillNumber
        const min = 100000; // 6-digit number starts from 100000
        const max = 999999; // 6-digit number ends at 999999
        return String(Math.floor(Math.random() * (max - min + 1)) + min);
      },
      unique: true,
    },
  customerName: {
    type: String,
    required: true,
  },
  portAgentName: {
    type: String,
    required: true,
  },
  portAgentAddress: {
    type: String,
    required: true,
  },
  portAgentContact: {
    type: String,
    required: true,
  },
  drivers: [driverSchema], // Array of driver objects
  trucks: [truckSchema],   // Array of truck objects
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
