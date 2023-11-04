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
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28 px-4">
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-3xl font-bold mb-6">All Miscellaneous Expenses Report</h1>
        <form onSubmit={handleSubmit} className="text-center">
          <div className="mb-4 flex items-center">
            <label htmlFor="startDate" className="block font-semibold mb-1 mr-2">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="border p-2 rounded focus:outline-none focus:border-blue-500 transition duration-300"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="endDate" className="block font-semibold mb-1 mr-2">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              className="border p-2 rounded focus:outline-none focus:border-blue-500 transition duration-300"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Generate Report
          </button>
        </form>
        {expenses.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Miscellaneous Expenses:</h2>
            <table className="border-collapse border border-gray-400">
              {/* Table header and body */}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMiscReport;
