import React, { useState } from 'react';

const AllIncomeReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [incomes, setIncomes] = useState([]);
  const [error, setError] = useState(null);

  const fetchIncomesByDateRange = async () => {
    try {
      const response = await fetch(`/api/income/all?startDate=${startDate}&endDate=${endDate}`);
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

  // Calculate total amount for each payment status
  const calculateTotalAmount = (status) => {
    return incomes.reduce((total, income) => {
      if (income.paymentStatus === status) {
        return total + income.amount;
      }
      return total;
    }, 0);
  };

  // Calculate total amount irrespective of payment status
  const totalAmount = incomes.reduce((total, income) => total + income.amount, 0);

  return (
    <div className="container mx-auto mt-10 p-4 bg-gray-100 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">All Income Report</h1>
      <div className="flex space-x-4 mb-4">
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
          onClick={fetchIncomesByDateRange}
        >
          Generate Report
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {incomes.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Income Report</h2>
          <table className="w-full border mb-4">
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

          {/* Summary Table */}
          <h2 className="text-xl font-bold mb-2">Summary</h2>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Payment Status</th>
                <th className="border p-2">Total Amount (Ghc)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Paid</td>
                <td className="border p-2">Ghc{calculateTotalAmount('Paid')}</td>
              </tr>
              <tr>
                <td className="border p-2">Pending</td>
                <td className="border p-2">Ghc{calculateTotalAmount('Pending')}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border p-2">Total</td>
                <td className="border p-2">Ghc{totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllIncomeReport;
