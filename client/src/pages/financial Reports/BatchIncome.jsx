import React, { useState, useEffect } from 'react';

const BatchIncome = () => {
  const [batchNumbers, setBatchNumbers] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [incomes, setIncomes] = useState([]);
  const [error, setError] = useState(null);

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

  const fetchIncomeReport = async () => {
    try {
      const response = await fetch(`/api/income/all-batch?batchNumber=${selectedBatch}&startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      if (response.ok) {
        setIncomes(data.incomes);
        setError(null);
      } else {
        setError(data.error);
        setIncomes([]);
      }
    } catch (error) {
      setError('Internal Server Error');
      setIncomes([]);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4 bg-gray-100 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Batch Income Report</h1>
      <div className="flex space-x-4 mb-4">
        <select
          className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          <option value="" disabled>Select Batch Number</option>
          {batchNumbers.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          onClick={fetchIncomeReport}
        >
          Generate Report
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {incomes.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Income Report</h2>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Date</th>
                <th className="border p-2">Customer Name</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Payment Status</th>
                <th className="border p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((income) => (
                <tr key={income._id}>
                  <td className="border p-2">{new Date(income.transactionDate).toLocaleDateString()}</td>
                  <td className="border p-2">{income.customerName}</td>
                  <td className="border p-2">Ghc{income.amount}</td>
                  <td className="border p-2">{income.paymentStatus}</td>
                  <td className="border p-2">{income.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BatchIncome;
