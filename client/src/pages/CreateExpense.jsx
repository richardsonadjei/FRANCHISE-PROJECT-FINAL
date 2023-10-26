
import React, { useState, useEffect } from 'react';

const CreateExpense = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [personName, setPersonName] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [showTransactionInput, setShowTransactionInput] = useState(false);
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showBatchNumber, setShowBatchNumber] = useState(false);
  const [batchNumber, setBatchNumber] = useState('');

  useEffect(() => {
    fetch('/api/all/expense-categories')
      .then((response) => response.json())
      .then((data) => {
        const categoryNames = data.categories.map((category) => category.name);
        setCategories(categoryNames);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value.toLowerCase();
    setCategory(selectedCategory);
    setShowTransactionInput(selectedCategory === 'miscellaneous');
    setShowBatchNumber(selectedCategory === 'procurement');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          amount,
          category,
          personName,
          receiptNumber,
          batchNumber: showBatchNumber ? batchNumber : null,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Expense created successfully');
        setDescription('');
        setAmount('');
        setCategory('');
        setPersonName('');
        setReceiptNumber('');
        setBatchNumber('');
        setShowTransactionInput(false);
        setShowBatchNumber(false);
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to create expense');
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-bold mb-4">Create Expense</h1>
        {successMessage && <div className="bg-green-200 text-green-800 p-2 rounded mb-4">{successMessage}</div>}
        {errorMessage && <div className="bg-red-200 text-red-800 p-2 rounded mb-4">{errorMessage}</div>}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          
        <div className="mb-4">
            <label htmlFor="category" className="block font-bold mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              placeholder='Describe The Purpose Of The Expenditure'
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block font-bold mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
         
          {showTransactionInput && (
            <>
              <div className="mb-4">
                <label htmlFor="personName" className="block font-bold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="personName"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                  placeholder='Enter Name of Person Or Company Expenditure Was Made To'
                />
              </div>
              <div className="mb-4">
                <label htmlFor="receiptNumber" className="block font-bold mb-1">
                  Receipt Number
                </label>
                <input
                  type="text"
                  id="receiptNumber"
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
            </>
          )}
          {showBatchNumber && (
            <div className="mb-4">
              <label htmlFor="batchNumber" className="block font-bold mb-1">
                Batch Number
              </label>
              <input
                type="text"
                id="batchNumber"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Create Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateExpense;