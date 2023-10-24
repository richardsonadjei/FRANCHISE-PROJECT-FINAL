import BusinessCustomer from '../models/customer.model.js';
export const createCustomer = async (req, res) => {
    try {
      const { companyName, registrationNumber, website, email, phone, address, bankingDetails, mobileMoneyDetails } = req.body;
  
      const customer = new BusinessCustomer({
        companyName,
        registrationNumber,
        website,
        email,
        phone,
        address,
        bankingDetails,
        mobileMoneyDetails,
      });
  
      await customer.save();
  
      res.status(201).json({ success: true, data: customer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };

  export const updateCustomerByName = async (req, res) => {
    try {
      const { customerName } = req.params; // Extract customer name from URL parameters
      const updatedFields = req.body; // Updated fields from request body
  
      // Find the customer by name and update the fields
      const customer = await BusinessCustomer.findOneAndUpdate(
        { companyName: customerName }, // Search criteria
        { $set: updatedFields }, // Fields to update
        { new: true } // Return the updated document
      );
  
      if (!customer) {
        return res.status(404).json({ success: false, error: 'Customer not found' });
      }
  
      res.status(200).json({ success: true, data: customer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };

  export const getAllCustomers = async (req, res) => {
    try {
      const customers = await BusinessCustomer.find();
      res.status(200).json({ success: true, data: customers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };