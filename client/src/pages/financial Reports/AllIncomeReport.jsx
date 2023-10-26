import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AllIncomeReport = () => {
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    // Fetch income data from the backend
    fetch('/api/income/all')
      .then((response) => response.json())
      .then((data) => {
        setIncomeData(data.incomes);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Source', 'Batch Number', 'Evacuated Quantity', 'Payment Method', 'Payment Status', 'Transaction Date']],
      body: incomeData.map((income) => [
        income.source,
        income.batchNumber,
        income.evacuatedQuantity,
        income.paymentMethod,
        income.paymentStatus,
        income.transactionDate,
      ]),
    });
    doc.save('income_report.pdf');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center text-3xl font-semibold mb-6">Income Report</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4">Source</th>
            <th className="py-2 px-4">Batch Number</th>
            <th className="py-2 px-4">Evacuated Quantity</th>
            <th className="py-2 px-4">Payment Method</th>
            <th className="py-2 px-4">Payment Status</th>
            <th className="py-2 px-4">Transaction Date</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {incomeData.map((income) => (
            <tr key={income._id} className="hover:bg-gray-100 transition duration-300">
              <td className="py-2 px-4">{income.source}</td>
              <td className="py-2 px-4">{income.batchNumber}</td>
              <td className="py-2 px-4">{income.evacuatedQuantity}</td>
              <td className="py-2 px-4">{income.paymentMethod}</td>
              <td className="py-2 px-4">{income.paymentStatus}</td>
              <td className="py-2 px-4">{income.transactionDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleDownloadPDF}
      >
        Download PDF
      </button>
    </div>
  );
};

export default AllIncomeReport;
