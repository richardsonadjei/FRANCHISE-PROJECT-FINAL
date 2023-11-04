import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AllBatchTransactionReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactions, setTransactions] = useState([]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Batch Number', 'Transaction Type', 'Quantity Before', 'Received Quantity', 'Quantity After', 'Modified Quantity', 'Date']],
      body: transactions.map((transaction) => [
        transaction.batchNumber,
        transaction.transactionType,
        transaction.quantityBefore,
        transaction.receivedQuantity,
        transaction.quantityAfter,
        transaction.modifiedQuantity,
        new Date(transaction.updatedAt).toLocaleString(),
      ]),
    });
    doc.save('transaction_report.pdf');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/cocoabags/reports/alltransactions?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28 px-4">
      <h1 className="text-2xl font-bold mb-4">Batch Transaction Report</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Generate Report
          </button>
          {transactions.length > 0 && (
            <button
              onClick={generatePDF}
              className="ml-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Download PDF
            </button>
          )}
        </div>
      </form>
      {transactions.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">Batch Number</th>
                <th className="py-2 px-4">Transaction Type</th>
                <th className="py-2 px-4">Quantity Before</th>
                <th className="py-2 px-4">Received Quantity</th>
                <th className="py-2 px-4">Quantity After</th>
                <th className="py-2 px-4">Modified Quantity</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">{transaction.batchNumber}</td>
                  <td className="py-2 px-4">{transaction.transactionType}</td>
                  <td className="py-2 px-4">{transaction.quantityBefore}</td>
                  <td className="py-2 px-4">{transaction.receivedQuantity}</td>
                  <td className="py-2 px-4">{transaction.quantityAfter}</td>
                  <td className="py-2 px-4">{transaction.modifiedQuantity}</td>
                  <td className="py-2 px-4">{new Date(transaction.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllBatchTransactionReport;
