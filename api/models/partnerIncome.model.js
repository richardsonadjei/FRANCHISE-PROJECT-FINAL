import mongoose from 'mongoose';

const partnerIncomeSchema = new mongoose.Schema({
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner', // Reference to the Partner model (assuming you have a Partner model)
    required: true,
  },
  batchNumber: {
    type: String,
  
  },
  
  incomeAmount: {
    type: Number,
   
  },
  purpose:{
    type: String,
    default: 'Cocoa Evacuation',
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PartnerIncome = mongoose.model('PartnerIncome', partnerIncomeSchema);

export default PartnerIncome;


