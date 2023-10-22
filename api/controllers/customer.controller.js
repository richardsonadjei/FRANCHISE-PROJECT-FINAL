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