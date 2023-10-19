import React, { useState, useEffect } from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';

const ViewBatches = () => {
  const [cocoaBags, setCocoaBags] = useState([]);

  useEffect(() => {
    fetchCocoaBags();
  }, []);

  const fetchCocoaBags = async () => {
    try {
      const response = await fetch('/api/cocoabags');
      const data = await response.json();
      setCocoaBags(data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalQuantity = cocoaBags.reduce((total, cocoaBag) => total + cocoaBag.quantity, 0);
  const totalNetWeight = cocoaBags.reduce((total, cocoaBag) => total + cocoaBag.averageNetWeightPerBag, 0);
  const totalGrossWeight = cocoaBags.reduce((total, cocoaBag) => total + cocoaBag.totalAverageGrossWeightPerBatch, 0);
  const totalValue = cocoaBags.reduce((total, cocoaBag) => total + cocoaBag.totalValuePerBatch, 0);
  const totalAverageNetWeight = cocoaBags.reduce((total, cocoaBag) => total + cocoaBag.totalAverageNetWeightPerBatch, 0);

  const generatePDFReport = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    let y = page.getHeight() - 50;

    page.drawText('Summary Report Of All Batches', {
      x: 50,
      y,
      size: fontSize + 2,
      font,
    });

    y -= 20;

    page.drawText(`Total Quantity: ${totalQuantity}`, {
      x: 50,
      y,
      size: fontSize,
      font,
    });

    y -= 20;

    page.drawText(`Total Average Gross Weight: ${totalGrossWeight}`, {
      x: 50,
      y,
      size: fontSize,
      font,
    });

    y -= 20;

    page.drawText(`Total Average Net Weight: ${totalAverageNetWeight}`, {
      x: 50,
      y,
      size: fontSize,
      font,
    });

    y -= 20;

    page.drawText(`Total Value: ${totalValue}`, {
      x: 50,
      y,
      size: fontSize,
      font,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'cocoa-batches-report.pdf';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">View Cocoa Batches</h1>
      {cocoaBags.length === 0 ? (
        <p>No cocoa batches available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-b px-4 py-2">Batch Number</th>
                <th className="border-b px-4 py-2">Quantity</th>
                <th className="border-b px-4 py-2">Price Per Bag</th>
                <th className="border-b px-4 py-2">Supplier</th>
                <th className="border-b px-4 py-2">Harvest Year</th>
                <th className="border-b px-4 py-2">QC Certifications</th>
                <th className="border-b px-4 py-2">Packing Date</th>
                <th className="border-b px-4 py-2">Average Net Weight Per Bag</th>
                <th className="border-b px-4 py-2">Average Gross Weight Per Bag</th>
                <th className="border-b px-4 py-2">Comments</th>
                <th className="border-b px-4 py-2">Total Average Net Weight Per Batch</th>
                <th className="border-b px-4 py-2">Total Average Gross Weight Per Batch</th>
                <th className="border-b px-4 py-2">Total Value Per Batch</th>
              </tr>
            </thead>
            <tbody>
              {cocoaBags.map((cocoaBag) => (
                <tr key={cocoaBag._id}>
                  <td className="border-b px-4 py-2">{cocoaBag.batchNumber}</td>
                  <td className="border-b px-4 py-2">{cocoaBag.quantity}</td>
                  <td className="border-b px-4 py-2">{cocoaBag.pricePerBag}</td>
                  <td className="border-b px-4 py-2">{cocoaBag.supplier}</td>
                  <td className="border-b px-4 py-2">{cocoaBag.harvestYear}</td>
                  <td className="border-b px-4 py-2">{cocoaBag.qcCertifications}</td>
                  <td className="border-b px-4 py-2">{new Date(cocoaBag.packingDate).toLocaleDateString()}</td>
                  <td className="border-b px-4 py-2">{cocoaBag.averageNetWeightPerBag}</td>
                  <td className="border-b px-4 py-2">{cocoaBag.averageGrossWeightPerBag}</td>
                  <td className="border-b px-4 py-2">{cocoaBag.comments}</td>
                  <td className="border-b px-4 py-2">{cocoaBag.totalAverageNetWeightPerBatch}</td>
                  <td className="border-b px-4 py-2">{cocoaBag.totalAverageGrossWeightPerBatch}</td>
                  <td className="border-b px-4 py-2">{cocoaBag.totalValuePerBatch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {cocoaBags.length > 0 && (
        <div className="bg-white rounded p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Summary Report</h2>
        <table className="min-w-full table-auto border border-gray-300 rounded mb-4">
          <tbody>
            <tr className="bg-gray-100">
              <td className="border-b px-4 py-2 font-bold">Total Quantity</td>
              <td className="border-b px-4 py-2">{totalQuantity}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border-b px-4 py-2 font-bold">Total Average Net Weight</td>
              <td className="border-b px-4 py-2">{totalNetWeight}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border-b px-4 py-2 font-bold">Total Average Gross Weight</td>
              <td className="border-b px-4 py-2">{totalGrossWeight}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border-b px-4 py-2 font-bold">Total Value</td>
              <td className="border-b px-4 py-2">{totalValue}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={generatePDFReport}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Download PDF Report
        </button>
      </div>
      )}
    </div>
  );
};

export default ViewBatches;