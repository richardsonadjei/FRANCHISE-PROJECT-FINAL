import React, { useEffect, useState } from 'react';

const BatchProfitLoss = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);
  const [batchNumbers, setBatchNumbers] = useState([]);

  useEffect(() => {
    // Fetch batchNumbers and populate the dropdown options
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
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/batch-profit-loss?batchNumber=${batchNumber}&startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const isProfit = reportData && reportData.profitLoss >= 0;

  return (
    <div className="max-w-2xl mx-auto overflow-y-auto max-h-screen mt-28 p-6 rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-semibold mb-6 text-center">Batch Profit and Loss Report</h1>
      <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label htmlFor="batchNumber" className="block text-sm font-medium text-gray-600 mb-1">
          Batch Number
        </label>
        <select
          id="batchNumber"
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
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
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-600 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-600 mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Generate Report
        </button>
      </form>
      {reportData && (
       <div className="mt-6">
       {/* Procurement Expense Table */}
       <h2 className="text-xl font-semibold mb-2">Procurement Expenses:</h2>
       <table className="w-full border-collapse border border-gray-300">
         {/* Table headers */}
         <thead>
           <tr className="bg-gray-200">
             <th className="border border-gray-300 px-4 py-2">Description</th>
             <th className="border border-gray-300 px-4 py-2">Amount</th>
             <th className="border border-gray-300 px-4 py-2">Date</th>
             <th className="border border-gray-300 px-4 py-2">Payment Status</th>
           </tr>
         </thead>
         {/* Table data */}
         <tbody>
           {reportData.procurementExpenses.map((expense) => (
             <tr key={expense._id}>
               <td className="border border-gray-300 px-4 py-2">{expense.description}</td>
               <td className="border border-gray-300 px-4 py-2">{expense.amount}</td>
               <td className="border border-gray-300 px-4 py-2">{new Date(expense.date).toLocaleDateString()}</td>
               <td className="border border-gray-300 px-4 py-2">{expense.paymentStatus}</td>
             </tr>
           ))}
         </tbody>
       </table>

          {/* Batch Expense Table */}
          <h2 className="text-xl font-semibold mb-2 mt-4">Batch Expenses:</h2>
          <table className="w-full border-collapse border border-gray-300">
            {/* Table headers */}
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
              </tr>
            </thead>
            {/* Table data */}
            <tbody>
              {reportData.batchExpenses.map((expense) => (
                <tr key={expense._id}>
                  <td className="border border-gray-300 px-4 py-2">{expense.description}</td>
                  <td className="border border-gray-300 px-4 py-2">{expense.amount}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(expense.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Income Table */}
          <h2 className="text-xl font-semibold mb-2 mt-4">Income:</h2>
          <table className="w-full border-collapse border border-gray-300">
            {/* Table headers */}
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
              </tr>
            </thead>
            {/* Table data */}
            <tbody>
              {reportData.incomeData.map((income) => (
                <tr key={income._id}>
                  <td className="border border-gray-300 px-4 py-2">{income.description}</td>
                  <td className="border border-gray-300 px-4 py-2">{income.amount}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(income.transactionDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary Report */}
          <h2 className="text-xl font-semibold mb-2 mt-4">Summary Report:</h2>
          <table className="w-full border-collapse border border-gray-300">
            {/* Table headers */}
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Total Income</th>
                <th className="border border-gray-300 px-4 py-2">Total Expenses</th>
                <th className="border border-gray-300 px-4 py-2">Profit / Loss</th>
              </tr>
            </thead>
            {/* Table data */}
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center">Ghc{reportData.totalIncome}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Ghc{reportData.totalExpenses}</td>
                <td className={`border border-gray-300 px-4 py-2 text-center ${isProfit ? 'text-green-700' : 'text-red-700'}`}>
                  {isProfit ? '+' : '-'} Ghc{Math.abs(reportData.profitLoss)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BatchProfitLoss;
