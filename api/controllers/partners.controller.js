import Partner from '../models/partners.model.js';

export const createPartner = async (req, res) => {
  try {
    const {
      name,
      contribution,
      email,
      phoneNumber,
      ghanaCardNumber,
      nextofKing,
      address,
      dateOfBirth,
      Comment,
    } = req.body;

    const newPartner = new Partner({
      name,
      contribution,
      email,
      phoneNumber,
      ghanaCardNumber,
      nextofKing, // assuming nextofKing is an array of objects
      address, // assuming address is an array of objects
      dateOfBirth,
      Comment,
    });

    await newPartner.save();

    return res.status(201).json({ partner: newPartner });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
