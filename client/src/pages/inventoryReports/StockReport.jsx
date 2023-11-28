import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const StockReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cocoaBags, setCocoaBags] = useState([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    // Fetch data from the server when startDate or endDate changes
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/cocoabags/stock?startDate=${startDate}&endDate=${endDate}`);
        const data = await response.json();
        setCocoaBags(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        ['Batch Number','Date Stocked', 'Quantity', 'Price Per Bag', 'Stock Value', 'Total Weight (kg)', 'QC Certification','Supplier',  'Comment', 'Recorded By']
      ],
      body: cocoaBags.map((bag) => [
        bag.batchNumber,
        new Date(bag.packingDate).toLocaleDateString(), // Convert packingDate to local date
        bag.quantity,
        bag.pricePerBag,
        bag.quantity * bag.pricePerBag,
        bag.totalWeightPerBatch,
        bag.qcCertifications,
        bag.supplier,
        bag.comments,
        bag.recordedBy,
      ]),
    });
    doc.save('StockReport.pdf');
  };

  const headers = [
    'Batch Number','Date Stocked', 'Quantity', 'Price Per Bag', 'Stock Value',  'Total Weight (kg)', 'QC Certification','Supplier',,  'Comment', 'Recorded By'
  ];
  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28 px-4">
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-3xl font-bold mb-6">Stock Report</h1>
        <label htmlFor="startDate" className="text-lg font-semibold mb-2">
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
          onClick={() => setShowReport(true)}
        >
          Show Report
        </button>
        {showReport && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Stock Report</h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-800 text-white">
                <tr>
                  {headers.map((header) => (
                    <th key={header} className="py-2 px-4">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cocoaBags.map((bag, index) => (
                   <tr key={index}>
                   <td className="py-2 px-4">{bag.batchNumber}</td>
                   <td className="py-2 px-4">{new Date(bag.packingDate).toLocaleDateString()}</td>
                   <td className="py-2 px-4">{bag.quantity}</td>
                   <td className="py-2 px-4">{bag.pricePerBag}</td>
                   <td className="py-2 px-4">{bag.quantity * bag.pricePerBag}</td>
                   <td className="py-2 px-4">{bag.totalWeightPerBatch}</td>
                   <td className="py-2 px-4">{bag.qcCertifications}</td>
                   <td className="py-2 px-4">{bag.supplier}</td>
                   <td className="py-2 px-4">{bag.comments}</td>
                   <td className="py-2 px-4">{bag.recordedBy}</td>
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

export default StockReport;
