import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const BatchTransactionReport = () => {
  const [batchNumberOptions, setBatchNumberOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch('/api/cocoabags');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          const batchNumbers = data.map((batch) => batch.batchNumber);
          setBatchNumberOptions(batchNumbers);
        } else {
          console.error('Unexpected response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching batch numbers:', error);
      }
    };
    fetchBatches();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [
          'Batch Number',
          'Transaction Type',
          'Quantity Before',
          'Received Quantity',
          'Quantity After',
          'Total Weight Before',
          'Total Weight After',
          'Evacuated Quantity',
          'Modified Quantity',
          'Date',
        ],
      ],
      body: transactions.map((transaction) => [
        transaction.batchNumber,
        transaction.transactionType,
        transaction.quantityBefore,
        transaction.receivedQuantity,
        transaction.quantityAfter,
        transaction.totalWeightBefore,
        transaction.totalWeightAfter,
        transaction.evacuatedQuantity,
        transaction.modifiedQuantity,
        new Date(transaction.updatedAt).toLocaleString(),
      ]),
      columnStyles: {
        5: { columnWidth: 'auto' }, // Adjust the width of the 6th column (index 5) containing totalWeightBefore
        6: { columnWidth: 'auto' }, // Adjust the width of the 7th column (index 6) containing totalWeightAfter
      },
    });
    doc.save('transaction_report.pdf');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `/api/cocoabags/reports/transactions?batchNumber=${batchNumber}&startDate=${startDate}&endDate=${endDate}`
    );
    const data = await response.json();
    setTransactions(data.transactions);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Batch Transaction Report</h1>
      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Batch Number</label>
          <select
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select Batch</option>
            {batchNumberOptions.map((batchOption, index) => (
              <option key={index} value={batchOption}>
                {batchOption}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">Batch Number</th>
                <th className="py-2 px-4">Transaction Type</th>
                <th className="py-2 px-4">Quantity Before</th>
                <th className="py-2 px-4">Received Quantity</th>
                <th className="py-2 px-4">Quantity After</th>
                <th className="py-2 px-4">Total Weight Before</th>
                <th className="py-2 px-4">Total Weight After</th>
                <th className="py-2 px-4">Evacuated Quantity</th>
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
                  <td className="py-2 px-4">{transaction.totalWeightBefore}</td>
                  <td className="py-2 px-4">{transaction.totalWeightAfter}</td>
                  <td className="py-2 px-4">{transaction.evacuatedQuantity}</td>
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

export default BatchTransactionReport;