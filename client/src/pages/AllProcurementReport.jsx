
import React, { useState } from 'react';

const AllProcurementReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [expenses, setExpenses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/expenses/procurement-expenses?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setExpenses(data.expenses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Procurement Report</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="startDate" className="block font-bold mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block font-bold mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate Report
        </button>
      </form>
      {expenses.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Procurement Expenses:</h2>
          <table className="border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">Description</th>
                <th className="border border-gray-400 px-4 py-2">Amount</th>
                <th className="border border-gray-400 px-4 py-2">Category</th>
                <th className="border border-gray-400 px-4 py-2">Batch Number</th>
                <th className="border border-gray-400 px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">{expense.description}</td>
                  <td className="border border-gray-400 px-4 py-2">{expense.amount}</td>
                  <td className="border border-gray-400 px-4 py-2">{expense.category}</td>
                  <td className="border border-gray-400 px-4 py-2">{expense.batchNumber}</td>
                  <td className="border border-gray-400 px-4 py-2">{new Date(expense.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllProcurementReport;