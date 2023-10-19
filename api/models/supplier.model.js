// Import the mongoose library
import mongoose from 'mongoose';

// Define the supplier schema
const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },

  // You can add more fields as per your requirements, such as payment details, delivery terms, etc.
});

// Create the Supplier model and export it as the default export
const Supplier = mongoose.model('Supplier', supplierSchema);
export default Supplier;
