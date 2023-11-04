
import React, { useState } from 'react';

const ProfitLossReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/profit-loss?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalExpenses = () => {
    if (reportData) {
      const { totalProcurementExpenses, totalBatchExpenses, totalMiscellaneousExpenses } = reportData;
      return totalProcurementExpenses + totalBatchExpenses + totalMiscellaneousExpenses;
    }
    return 0;
  };

  const calculateProfitLoss = () => {
    if (reportData) {
      const { totalIncome, totalExpenses } = reportData;
      return totalIncome - totalExpenses;
    }
    return 0;
  };

  return (
    <div className="flex justify-center mx-auto overflow-y-auto max-h-screen mt-28 px-4">
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center">Profit Loss Report</h1>
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
                  <th className="border border-gray-400 px-4 py-2">Date</th>
                </tr>
              </thead>
              {/* Table data */}
              <tbody>
                {reportData.procurementData.map((expense) => (
                  <tr key={expense._id}>
                    <td className="border border-gray-400 px-4 py-2">{expense.description}</td>
                    <td className="border border-gray-400 px-4 py-2">{expense.amount}</td>
                    <td className="border border-gray-400 px-4 py-2">
  {new Date(expense.date).toLocaleDateString()}
</td>
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
                  <th className="border border-gray-400 px-4 py-2">Date</th>
                </tr>
              </thead>
              {/* Table data */}
              <tbody>
                {reportData.batchExpensesData.map((expense) => (
                  <tr key={expense._id}>
                    <td className="border border-gray-400 px-4 py-2">{expense.description}</td>
                    <td className="border border-gray-400 px-4 py-2">{expense.amount}</td>
                    <td className="border border-gray-400 px-4 py-2">
  {new Date(expense.date).toLocaleDateString()}
</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Miscellaneous Expense Table */}
            <h2 className="text-lg font-bold mb-2 mt-4">Miscellaneous Expenses:</h2>
            <table className="border-collapse border border-gray-400 w-full shadow-lg">
              {/* Table headers */}
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2">Description</th>
                  <th className="border border-gray-400 px-4 py-2">Amount</th>
                  <th className="border border-gray-400 px-4 py-2">Date</th>
                </tr>
              </thead>
              {/* Table data */}
              <tbody>
                {reportData.miscellaneousExpensesData.map((expense) => (
                  <tr key={expense._id}>
                    <td className="border border-gray-400 px-4 py-2">{expense.description}</td>
                    <td className="border border-gray-400 px-4 py-2">{expense.amount}</td>
                    <td className="border border-gray-400 px-4 py-2">
  {new Date(expense.date).toLocaleDateString()}
</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Income Table */}
            <h2 className="text-lg font-bold mb-2 mt-4">Income:</h2>
            <table className="border-collapse border border-gray-400 w-full shadow-lg">
              {/* Table headers */}
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2">Description</th>
                  <th className="border border-gray-400 px-4 py-2">Amount</th>
                  <th className="border border-gray-400 px-4 py-2">Date</th>
                </tr>
              </thead>
              {/* Table data */}
              <tbody>
                {reportData.incomeData.map((income) => (
                  <tr key={income._id}>
                    <td className="border border-gray-400 px-4 py-2">{income.description}</td>
                    <td className="border border-gray-400 px-4 py-2">{income.amount}</td>
                    <td className="border border-gray-400 px-4 py-2">
  {new Date(income.transactionDate).toLocaleDateString()}
</td>

                  </tr>
                ))}
              </tbody>
            </table>
            {/* Summary Report */}
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-4">
Summary Report:</h2>
              <table className="border-collapse border border-gray-400 w-full shadow-lg">
                {/* Table headers */}
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2 font-bold">Total Income:</th>
                    <th className="border border-gray-400 px-4 py-2">Amount</th>
                   
                  </tr>
                </thead>
                {/* Table data */}
                <tbody>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-bold">Total Income:</td>
                    <td className="border border-gray-400 px-4 py-2">{reportData.totalIncome}</td>
                   
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-bold">Total Expenses:</td>
                    <td className="border border-gray-400 px-4 py-2">{calculateTotalExpenses()}</td>
       
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2 font-bold">Profit/Loss:</td>
                    <td className="border border-gray-400 px-4 py-2">{calculateProfitLoss()}</td>
                 
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

export default ProfitLossReport;