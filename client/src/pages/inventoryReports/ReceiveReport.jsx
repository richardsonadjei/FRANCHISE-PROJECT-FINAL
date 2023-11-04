import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReceiveReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`/api/cocoabags/reports/receive?startDate=${startDate}&endDate=${endDate}`);
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
        setError('');
      } else {
        setError('Error fetching data. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('Error fetching data. Please try again.');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Receive Report', 10, 10);
    doc.autoTable({
      head: [['Batch Number', 'Received Quantity', 'Quantity Before', 'Quantity After', 'Date']],
      body: transactions.map((transaction) => [
        transaction.batchNumber,
        transaction.receivedQuantity,
        transaction.quantityBefore,
        transaction.quantityAfter,
        new Date(transaction.updatedAt).toLocaleDateString(),
      ]),
    });
    doc.save('receive_report.pdf');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTransactions();
  };

  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28 px-4">
      <h2 className="text-2xl font-bold mb-4">Receive Report</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="startDate" className="mb-2 text-sm text-gray-600">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="endDate" className="mb-2 text-sm text-gray-600">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Generate Report
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      {transactions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Transactions</h3>
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-r px-4 py-2">Batch Number</th>
                <th className="border-r px-4 py-2">Received Quantity</th>
                <th className="border-r px-4 py-2">Quantity Before</th>
                <th className="border-r px-4 py-2">Quantity After</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="border-r px-4 py-2">{transaction.batchNumber}</td>
                  <td className="border-r px-4 py-2">{transaction.receivedQuantity}</td>
                  <td className="border-r px-4 py-2">{transaction.quantityBefore}</td>
                  <td className="border-r px-4 py-2">{transaction.quantityAfter}</td>
                  <td className="px-4 py-2">{new Date(transaction.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={generatePDF}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ReceiveReport;
