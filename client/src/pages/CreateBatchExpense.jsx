import React, { useState, useEffect } from 'react';

const CreateBatchExpense = () => {
  const [batchNumbers, setBatchNumbers] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/api/cocoabags')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const batchNumbers = data.map((batch) => batch.batchNumber);
          setBatchNumbers(batchNumbers);
        } else {
          console.error('Unexpected response structure:', data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation and submit the form data to the server
    if (!batchNumber || !description || !amount) {
      setErrorMessage('Please fill in all fields');
      setSuccessMessage('');
      return;
    }

    const expenseData = {
      batchNumber,
      description,
      amount,
      paymentStatus
    };

    fetch('/api/batch-expense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data._id) {
          setSuccessMessage('Batch expense created successfully!');
          setErrorMessage('');
          setBatchNumber('');
          setDescription('');
          setAmount('');
          // Delay redirect to homepage
          setTimeout(() => {
            window.location.href = '/home';
          }, 1000);
        } else {
          setErrorMessage('Failed to create batch expense.');
          setSuccessMessage('');
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Failed to create batch expense.');
        setSuccessMessage('');
      });
  };

  return (
    <div className="container mx-auto  overflow-y-auto max-h-screen mt-28 px-4">
      <form className="shadow-lg rounded-lg p-6" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Create Batch Expense</h2>
        {successMessage && (
          <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
            {errorMessage}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="batchNumber" className="block font-medium mb-1">
            Batch Number
          </label>
          <select
            id="batchNumber"
            className="border border-gray-300 rounded p-2 w-full"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
          >
            <option value="">Select Batch Number</option>
            {batchNumbers.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="border border-gray-300 rounded p-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block font-medium mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="border border-gray-300 rounded p-2 w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="paymentStatus" className="block font-medium mb-1">
          Payment Status
        </label>
        <select
          id="paymentStatus"
          className="border border-gray-300 rounded p-2 w-full"
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
        >
         <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          
        </select>
      </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
        >
          Create Expense
        </button>
      </form>
    </div>
  );
};

export default CreateBatchExpense;
