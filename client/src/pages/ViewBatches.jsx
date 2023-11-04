import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const ViewBatches = () => {
  const [cocoaBags, setCocoaBags] = useState([]);

  useEffect(() => {
    fetchCocoaBags();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Cocoa Batches Report', 10, 10);

    let yPosition = 30;
    cocoaBags.forEach((cocoaBag) => {
      doc.text(`Batch Number: ${cocoaBag.batchNumber}`, 10, yPosition);
      doc.text(`Quantity: ${cocoaBag.quantity} bags`, 10, yPosition + 10);
      doc.text(`Price Per Bag: ${cocoaBag.pricePerBag}`, 10, yPosition + 20);
      doc.text(`Supplier: ${cocoaBag.supplier}`, 10, yPosition + 30);
      doc.text(`Harvest Year: ${cocoaBag.harvestYear}`, 10, yPosition + 40);
      doc.text(`QC Certifications: ${cocoaBag.qcCertifications}`, 10, yPosition + 50);
      doc.text(`Packing Date: ${new Date(cocoaBag.packingDate).toLocaleDateString()}`, 10, yPosition + 60);
      doc.text(`Average Net Weight Per Bag: ${cocoaBag.averageNetWeightPerBag}`, 10, yPosition + 70);
      doc.text(`Average Gross Weight Per Bag: ${cocoaBag.averageGrossWeightPerBag}`, 10, yPosition + 80);
      doc.text(`Comments: ${cocoaBag.comments}`, 10, yPosition + 90);
      doc.text(`Total Average Net Weight Per Batch: ${cocoaBag.totalAverageNetWeightPerBatch}`, 10, yPosition + 100);
      doc.text(`Total Average Gross Weight Per Batch: ${cocoaBag.totalAverageGrossWeightPerBatch}`, 10, yPosition + 110);
      doc.text(`Total Value Per Batch: ${cocoaBag.totalValuePerBatch}`, 10, yPosition + 120);
      yPosition += 140;
    });

    doc.save('cocoa_batches_report.pdf');
  };

  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28  p-8">
      {/* Your table rendering code */}
      <button
        onClick={generatePDF}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Download PDF Report
      </button>
    </div>
  );
};

export default ViewBatches;
