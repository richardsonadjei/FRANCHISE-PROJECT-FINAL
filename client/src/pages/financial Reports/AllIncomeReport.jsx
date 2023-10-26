
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AllIncomeReport = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    // Fetch income data from the backend
    fetch('/api/income/all')
      .then((response) => response.json())
      .then((data) => {
        setIncomeData(data.incomes);
        calculateSummary(data.incomes);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const calculateSummary = (incomes) => {
    const totalQuantity = incomes.reduce((sum, income) => sum + income.evacuatedQuantity, 0);
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    setTotalQuantity(totalQuantity);
    setTotalIncome(totalIncome);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    // Main Report
    doc.text('Income Report', 10, 10); // Add heading for the main report
    doc.autoTable({
      head: [['Source', 'Batch Number', 'Evacuated Quantity', 'Payment Method', 'Payment Status', 'Transaction Date', 'Amount']],
      body: incomeData.map((income) => [
        income.source,
        income.batchNumber,
        income.evacuatedQuantity,
        income.paymentMethod,
        income.paymentStatus,
        income.transactionDate,
        income.amount,
      ]),
    });
  
    // Summary Report
    doc.text('Summary Report', 10, doc.autoTable.previous.finalY + 20); // Add heading for the summary report
    doc.autoTable({
      head: [['Total Quantity of Bags Evacuated', 'Total Income']],
      body: [[totalQuantity, totalIncome]],
      startY: doc.autoTable.previous.finalY + 30,
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
            <th className="py-2 px-4">Amount</th>
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
              <td className="py-2 px-4">{income.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">Summary:</h2>
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Total Quantity of Bags Evacuated</th>
              <th className="border border-gray-400 px-4 py-2">Total Income</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 px-4 py-2">{totalQuantity}</td>
              <td className="border border-gray-400 px-4 py-2">{totalIncome}</td>
            </tr>
          </tbody>
        </table>
      </div>
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