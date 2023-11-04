import React, { useState } from 'react';


const AllExpenseReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/expenses/all-expenses?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalExpense = () => {
    if (reportData) {
      const { procurementTotal, expenseTotal, batchExpenseTotal } = reportData;
      return procurementTotal + expenseTotal + batchExpenseTotal;
    }
    return 0;
  };

  return (
    <div className="flex justify-center mx-auto overflow-y-auto max-h-screen mt-28 px-4">
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
        {reportData && (
          <div className="mt-4">
            {/* Procurement Expense Table */}
            <h2 className="text-lg font-bold mb-2">Procurement Expenses:</h2>
            <table className="border-collapse border border-gray-400 w-full shadow-lg">
              {/* Table headers */}
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2">Description</th>
                  <th className="border border-gray-400 px-4 py-2">Amount</th>
                  {/* Add more headers if needed */}
                </tr>
              </thead>
              {/* Table data */}
              <tbody>
                {reportData.procurementData.map((expense) => (
                  <tr key={expense._id}>
                    <td className="border border-gray-400 px-4 py-2">{expense.description}</td>
                    <td className="border border-gray-400 px-4 py-2">{expense.amount}</td>
                    {/* Add more fields if needed */}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Expense Table */}
            <h2 className="text-lg font-bold mb-2 mt-4">Other Expenses:</h2>
            <table className="border-collapse border border-gray-400 w-full shadow-lg">
              {/* Table headers */}
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2">Description</th>
                  <th className="border border-gray-400 px-4 py-2">Amount</th>
                  {/* Add more headers if needed */}
                </tr>
              </thead>
              {/* Table data */}
              <tbody>
                {reportData.expenseData.map((expense) => (
                  <tr key={expense._id}>
                    <td className="border border-gray-400 px-4 py-2">{expense.description}</td>
                    <td className="border border-gray-400 px-4 py-2">{expense.amount}</td>
                    {/* Add more fields if needed */}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Batch Expense Table */}
            <h2 className="text-lg font-bold mb-2 mt-4">Batch Expenses:</h2>
            <table className="border-collapse border border-gray-400 w-full shadow-lg">
              {/* Table headers */}
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2">Description</th>
                  <th className="border border-gray-400 px-4 py-2">Amount</th>
                  {/* Add more headers if needed */}
                </tr>
              </thead>
              {/* Table data */}
              <tbody>
                {reportData.batchExpenseData.map((expense) => (
                  <tr key={expense._id}>
                    <td className="border border-gray-400 px-4 py-2">{expense.description}</td>
                    <td className="border border-gray-400 px-4 py-2">{expense.amount}</td>
                    {/* Add more fields if needed */}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Summary Report */}
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2">Summary Report:</h2>
              <table className="border-collapse border border-gray-400 w-full shadow-lg">
                <tbody>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-bold">Total Procurement Expenses:</td>
                    <td className="border border-gray-400 px-4 py-2">{reportData.procurementTotal}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-bold">Total Misc Expenses:</td>
                    <td className="border border-gray-400 px-4 py-2">{reportData.expenseTotal}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-bold">Total Other  Expenses:</td>
                    <td className="border border-gray-400 px-4 py-2">{reportData.batchExpenseTotal}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-bold">Total Expenses:</td>
                    <td className="border border-gray-400 px-4 py-2">{calculateTotalExpense()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllExpenseReport;
