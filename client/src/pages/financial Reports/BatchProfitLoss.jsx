import React, { useState, useEffect } from 'react';

const BatchProfitLoss = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalIncome, setTotalIncome] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(null);
  const [profitLoss, setProfitLoss] = useState(null);
  const [batchNumbers, setBatchNumbers] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/batch-profit-loss?batchNumber=${batchNumber}&startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setTotalIncome(data.totalIncome);
      setTotalExpenses(data.totalExpenses);
      setProfitLoss(data.profitLoss);
    } catch (error) {
      console.error(error);
    }
  };

  const isProfit = profitLoss >= 0;

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 rounded-lg shadow-lg bg-white">
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
      {totalIncome !== null && totalExpenses !== null && profitLoss !== null && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2 text-center">Summary Report</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Total Income</th>
                <th className="border border-gray-300 px-4 py-2">Total Expenses</th>
                <th className="border border-gray-300 px-4 py-2">Profit / Loss</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center">Ghc{totalIncome}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Ghc{totalExpenses}</td>
                <td className={`border border-gray-300 px-4 py-2 text-center ${isProfit ? 'text-green-700' : 'text-red-700'}`}>
                  {isProfit ? '+' : '-'} Ghc{Math.abs(profitLoss)}
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
