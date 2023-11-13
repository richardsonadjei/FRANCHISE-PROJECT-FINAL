import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateExpenseStatus = () => {
  const { id } = useParams();
  const [newPaymentStatus, setNewPaymentStatus] = useState('Paid');
  const [expenseId, setExpenseId] = useState(id);
  const [expenseType, setExpenseType] = useState('expense');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const expenseIdParam = params.get('id');

    if (expenseIdParam) {
      setExpenseId(expenseIdParam);
    }
  }, [id]);

  const handleUpdatePaymentStatus = () => {
    fetch('/api/expenses/updatePaymentStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expenseType,
        id: expenseId,
        newPaymentStatus,
      }),
    })
      .then((response) => response.json())
      .then((updatedExpense) => {
        // Display a success message to the user
        alert('Expense updated successfully');

        // Delay navigation and then redirect to the home page
        setTimeout(() => {
          window.location.href = '/home';
        }, 3000);
      })
      .catch((error) => {
        console.error('Error updating payment status:', error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Update Payment Status</h1>

        <div className="mb-4">
          <label className="block text-gray-700">Expense ID</label>
          <input
            type="text"
            value={expenseId}
            className="border border-gray-300 p-2 rounded bg-gray-100 w-full"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Expense Type</label>
          <select
            value={expenseType}
            onChange={(e) => setExpenseType(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="procurement">Procurement</option>
            <option value="batchExpense">Batch Expense</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">New Payment Status</label>
          <input
            type="text"
            value={newPaymentStatus}
            onChange={(e) => setNewPaymentStatus(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full transition-all duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-500"
            placeholder="Paid"
          />
        </div>

        <button
          onClick={handleUpdatePaymentStatus}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full transition-all duration-300"
        >
          Update Payment Status
        </button>
      </div>
    </div>
  );
};

export default UpdateExpenseStatus;
