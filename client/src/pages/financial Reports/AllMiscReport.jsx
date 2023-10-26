
import React, { useState } from 'react';

const AllMiscReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [expenses, setExpenses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/expenses/misc-expenses?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setExpenses(data.expenses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Miscellaneous Expenses Report</h1>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <div className="flex items-center space-x-4">
          <div>
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
          <div>
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
        </div>
      </form>
      {expenses.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Miscellaneous Expenses:</h2>
          <table className="border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">Description</th>
                <th className="border border-gray-400 px-4 py-2">Amount</th>
                <th className="border border-gray-400 px-4 py-2">Date</th>
                <th className="border border-gray-400 px-4 py-2">Person Name</th>
                <th className="border border-gray-400 px-4 py-2">Receipt Number</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense._id}>
                  <td className="border border-gray-400 px-4 py-2">{expense.description}</td>
                  <td className="border border-gray-400 px-4 py-2">{expense.amount}</td>
                  <td className="border border-gray-400 px-4 py-2">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="border border-gray-400 px-4 py-2">{expense.transaction.personName}</td>
                  <td className="border border-gray-400 px-4 py-2">{expense.transaction.receiptNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllMiscReport;