import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const BatchProcurementReport = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [procurements, setProcurements] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [batchNumbers, setBatchNumbers] = useState([]);

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
          setBatchNumbers(batchNumbers);
        } else {
          console.error('Unexpected response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching batch numbers:', error);
      }
    };
    fetchBatches();
  }, []);

  const fetchProcurementsByBatchAndPeriod = async () => {
    try {
      const response = await fetch(`/api/batch-procurements?batchNumber=${batchNumber}&startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setProcurements(data.procurements);
      setShowReport(true);
    } catch (error) {
      console.error(error);
    }
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Date', 'Batch Number', 'Amount', 'Quantity', 'Total Weight (tonnes)', 'Payment Status', 'Description', 'Supplier', 'Recorded By']],
      body: procurements.map((procurement) => [
        new Date(procurement.date).toLocaleDateString() + ', ' + new Date(procurement.date).toLocaleTimeString(),
        procurement.batchNumber,
        procurement.amount,
        procurement.quantity,
        procurement.totalWeightPerBatch,
        procurement.paymentStatus,
        procurement.description,
        procurement.supplier,
        procurement.recordedBy,
      ]),
      columnStyles: {
        4: { columnWidth: 'auto' }, // Adjust the width of the 5th column (index 4) containing totalWeightPerBatch
      },
    });
    doc.save('BatchProcurementReport.pdf');
  };

  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28 px-4">
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-3xl font-bold mb-6">Batch Procurement Report</h1>
        <label htmlFor="batchNumber" className="text-lg font-semibold mb-2">
          Batch Number
        </label>
        <select
          id="batchNumber"
          className="border p-2 rounded focus:outline-none focus:border-blue-500 transition duration-300"
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
        >
          <option value="">Select Batch Number</option>
          {batchNumbers.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
        <label htmlFor="startDate" className="text-lg font-semibold mt-4 mb-2">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          className="border p-2 rounded focus:outline-none focus:border-blue-500 transition duration-300"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="endDate" className="text-lg font-semibold mt-4 mb-2">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          className="border p-2 rounded focus:outline-none focus:border-blue-500 transition duration-300"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          onClick={fetchProcurementsByBatchAndPeriod}
        >
          Generate Report
        </button>
        {showReport && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Batch Procurement Report</h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-800 text-white">
              <tr>
          <th className="py-2 px-4">Date</th>
          <th className="py-2 px-4">Batch Number</th>
          <th className="py-2 px-4">Amount</th>
          <th className="py-2 px-4">Quantity</th>
          <th className="py-2 px-4">Total Weight (tonnes)</th>
          <th className="py-2 px-4">Payment Status</th>
          <th className="py-2 px-4">Description</th>
          <th className="py-2 px-4">Supplier</th>
          <th className="py-2 px-4">Procured By</th>
        </tr>
              </thead>
              <tbody>
                {procurements.map((procurement, index) => (
                  <tr key={index}>
                   <td className="py-2 px-4">
              {new Date(procurement.date).toLocaleDateString()}, {new Date(procurement.date).toLocaleTimeString()}
            </td>
            <td className="py-2 px-4">{procurement.batchNumber}</td>
            <td className="py-2 px-4">{procurement.amount}</td>
            <td className="py-2 px-4">{procurement.quantity}</td>
            <td className="py-2 px-4">{procurement.totalWeightPerBatch}</td>
            <td className="py-2 px-4">{procurement.paymentStatus}</td>
            <td className="py-2 px-4">{procurement.description}</td>
            <td className="py-2 px-4">{procurement.supplier}</td>
            <td className="py-2 px-4">{procurement.procuredBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showReport && (
          <button
            className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            onClick={generatePDF}
          >
            Download PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default BatchProcurementReport;
