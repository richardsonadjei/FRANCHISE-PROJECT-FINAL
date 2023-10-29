import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contribution: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  ghanaCardNumber: {
    type: String,
    required: true,
  },
  nextofKing: {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        
    },
    ghanaCardNumber: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
      
    },
    phoneNumber: {
        type: String,
        
    }

},
  address: {
    houseNumber: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  Comment: {
    type: String,
   
},
date: {
    type: Date,
    default: Date.now,
},
  // Add more fields as needed for partner biodata
});

const Partner = mongoose.model('Partner', partnerSchema);

export default Partner;
