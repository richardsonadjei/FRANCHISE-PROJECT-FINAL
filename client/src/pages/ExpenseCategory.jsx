
import React, { useState } from 'react';

const ExpenseCategory = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend API to create a new expense category
      const response = await fetch('/api/expense-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) {
        throw new Error('Failed to create expense category');
      }

      // Reset the form
      setCategoryName('');

      // Show success message
      alert('Expense category created successfully');

      // Navigate back to the homepage
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      // Show error message
      alert('Failed to create expense category');
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Expense Category</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="categoryName" className="block font-bold mb-1">
              Category Name
            </label>
            <input
              id="categoryName"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              placeholder="Enter category name"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseCategory;