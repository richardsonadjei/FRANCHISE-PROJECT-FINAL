import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PendingExpensesReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);

  const handleGenerateReport = () => {
    fetch(`/api/expenses/pending-expenses?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((data) => {
        setReportData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdatePaymentStatus = (expenseId) => {
    // Navigate to the update payment status page with the expense ID as a URL parameter
    window.location.href = `/update-expenses-status?id=${expenseId}`;
  };

  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28 px-4">
      <h1 className="text-2xl font-bold mb-4">Pending Expenses Report</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label className="mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <button
        onClick={handleGenerateReport}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        Generate Report
      </button>
      {reportData.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Report Results:</h2>
          <table className="w-full border-collapse shadow-md">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-gray-500 px-4 py-2">Description</th>
                <th className="border border-gray-500 px-4 py-2">Amount</th>
                <th className="border border-gray-500 px-4 py-2">Category</th>
                <th className="border border-gray-500 px-4 py-2">Payment Status</th>
                <th className="border border-gray-500 px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((expense) => (
                <tr key={expense._id}>
                  <td className="border border-gray-500 px-4 py-2">{expense.description}</td>
                  <td className="border border-gray-500 px-4 py-2">{expense.amount}</td>
                  <td className="border border-gray-500 px-4 py-2">{expense.category}</td>
                  <td className="border border-gray-500 px-4 py-2">
                    <button
                      onClick={() => handleUpdatePaymentStatus(expense._id)}
                      className="text-blue-500 underline focus:outline-none hover:text-blue-700"
                    >
                      {expense.paymentStatus}
                    </button>
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingExpensesReport;
