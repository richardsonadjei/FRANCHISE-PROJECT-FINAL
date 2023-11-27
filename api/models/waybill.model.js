import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const { Schema, model } = mongoose;

// Counter schema to store the wayBillNumber counter
const counterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
  },
});

const WaybillCounter = model('WaybillCounter', counterSchema);
const autoIncrement = AutoIncrementFactory(mongoose);

const waybillSchema = new Schema({
  wayBillNumber: {
    type: String,
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
  drivers: [{
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
  }],
  trucks: [{
    registrationNumber: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
  }],
  batchNumber: {
    type: String,
    required: true,
  },
  evacuatedQuantity: {
    type: Number,
  },
  evacuatedWeight: {
    type: Number,
    required: true,
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
  generatedBy: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Pre-save hook to generate the alphanumeric wayBillNumber
waybillSchema.pre('save', async function (next) {
  try {
    if (!this.wayBillNumber) {
      // Find the counter for the wayBillNumber
      const counter = await WaybillCounter.findOneAndUpdate(
        { name: 'wayBillNumber' },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
      );

      // Generate the wayBillNumber with 'WB' prefix and padded number
      const paddedNumber = counter.value.toString().padStart(2, '0');
      this.wayBillNumber = `WB${paddedNumber}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Waybill = model('Waybill', waybillSchema);

export default Waybill;