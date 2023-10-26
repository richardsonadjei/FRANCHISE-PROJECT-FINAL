import ExpenseCategory from '../models/expenseCategory.model.js';

export const createExpenseCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the category name already exists
    const existingCategory = await ExpenseCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: 'Category name already exists' });
    }

    // Create a new category
    const newCategory = new ExpenseCategory({ name });
    await newCategory.save();

    return res.status(201).json({ category: newCategory });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllExpenseCategories = async (req, res) => {
  try {
    const categories = await ExpenseCategory.find();
    return res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
