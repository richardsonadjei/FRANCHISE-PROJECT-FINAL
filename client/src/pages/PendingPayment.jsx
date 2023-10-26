import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PendingPayment = () => {
  const [pendingIncomes, setPendingIncomes] = useState([]);

  useEffect(() => {
    // Fetch pending incomes from the backend
    fetch('/api/income/pending')
      .then((response) => response.json())
      .then((data) => {
        setPendingIncomes(data.pendingIncomes);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Pending Payments Report</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4">Batch Number</th>
            <th className="py-2 px-4">Payment Status</th>
            <th className="py-2 px-4">Source</th>
            <th className="py-2 px-4">Evacuated Quantity</th>
            <th className="py-2 px-4">Payment Method</th>
            <th className="py-2 px-4">Transaction Date</th>
            <th className="py-2 px-4">Customer Name</th>
            <th className="py-2 px-4">Description</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {pendingIncomes.map((income) => (
            <tr key={income._id} className="hover:bg-gray-100 transition duration-300">
              <td className="py-2 px-4">
                <Link to={`/update-payment?batchNumber=${income.batchNumber}`} className="text-blue-500 hover:underline">
                  {income.batchNumber}
                </Link>
              </td>
              <td className="py-2 px-4">{income.paymentStatus}</td>
              <td className="py-2 px-4">{income.source}</td>
              <td className="py-2 px-4">{income.evacuatedQuantity}</td>
              <td className="py-2 px-4">{income.paymentMethod}</td>
              <td className="py-2 px-4">{income.transactionDate}</td>
              <td className="py-2 px-4">{income.customerName}</td>
              <td className="py-2 px-4">{income.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingPayment;
