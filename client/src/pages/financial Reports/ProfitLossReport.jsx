import React, { useState } from 'react';

const ProfitLossReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalIncome, setTotalIncome] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(null);
  const [profitLoss, setProfitLoss] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/profit-loss?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setTotalIncome(data.totalIncome);
      setTotalExpenses(data.totalCombinedExpenses);
      setProfitLoss(data.profitLoss);
    } catch (error) {
      console.error(error);
    }
  };

  const isProfit = profitLoss >= 0;

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-semibold mb-6 text-center">Profit and Loss Report</h1>
      <form onSubmit={handleSubmit} className="mb-6">
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

export default ProfitLossReport;
