import React, { useState } from 'react';
import jsPDF from 'jspdf';

const TransactionHistory = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [reportData, setReportData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchReportData = async () => {
    try {
      // Fetch data from the server using fetch
      const response = await fetch(`/api/cocoabags/transactions?startDate=${startDate}&endDate=${endDate}&transactionType=${transactionType}`);
      const data = await response.json();
      setReportData(data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Error fetching data. Please try again.');
      setReportData([]);
    }
  };


  
  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      doc.text('Transaction History Report', 14, 10);
      reportData.forEach((item, index) => {
        const transactionDate = new Date(item.createdAt).toLocaleDateString();
        const text = `${transactionDate} - Batch Number: ${item.batchNumber} - Quantity: ${item.quantity} bags - Transaction Type: ${item.transactionType}`;
        doc.text(text, 14, 20 + index * 10);
      });
      doc.save('transaction_report.pdf');
      setErrorMessage('');
    } catch (error) {
      console.error('Error generating PDF:', error);
      setErrorMessage('Error generating PDF. Please try again.');
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction History Report</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Start Date</label>
        <input
          type="date"
          className="mt-1 p-2 border rounded w-full"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">End Date</label>
        <input
          type="date"
          className="mt-1 p-2 border rounded w-full"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Transaction Type</label>
        <select
          className="mt-1 p-2 border rounded w-full"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="">Select Transaction Type</option>
          <option value="Creation">Creation</option>
          <option value="Update">Update</option>
          <option value="Sale">Sale</option>
        </select>
      </div>
      <div className="mb-4 flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={fetchReportData}>
          Fetch Data
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={generatePDF}>
          Generate PDF
        </button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {reportData.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Transaction History</h2>
          <ul>
            {reportData.map((item) => (
              <li key={item.batchNumber}>
                Date: {new Date(item.createdAt).toLocaleDateString()} - Batch Number: {item.batchNumber} - Quantity: {item.quantity} bags - Transaction Type: {item.transactionType}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
