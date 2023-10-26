
import React, { useState } from 'react';

const AllExpenseReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [expenses, setExpenses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/expenses/all-expenses?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setExpenses(data.expenses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center">All Expense Report</h1>
        <form onSubmit={handleSubmit} className="border rounded p-4">
          <div className="mb-4">
            <label htmlFor="startDate" className="block font-bold mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-2 py-1 w-full"
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
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Generate Report
          </button>
        </form>
        {expenses.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Expense Report:</h2>
            <table className="border-collapse border border-gray-400 w-full">
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2">Description</th>
                  <th className="border border-gray-400 px-4 py-2">Amount</th>
                  <th className="border border-gray-400 px-4 py-2">Category</th>
                  <th className="border border-gray-400 px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id}>
                    <td className="border border-gray-400 px-4 py-2">{expense.description}</td>
                    <td className="border border-gray-400 px-4 py-2">{expense.amount}</td>
                    <td className="border border-gray-400 px-4 py-2">{expense.category}</td>
                    <td className="border border-gray-400 px-4 py-2">{new Date(expense.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllExpenseReport;