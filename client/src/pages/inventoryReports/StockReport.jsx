import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

const StockReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cocoaBags, setCocoaBags] = useState([]);

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

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
  
    const content = page.drawText('Stock Report', {
      x: 50,
      y: 350,
      size: 30,
      color: rgb(0, 0, 0),
    });
  
    // Table header
    let yPos = 310;
    page.drawText('Batch Number', { x: 50, y: yPos, size: 12, color: rgb(0, 0, 0) });
    page.drawText('Quantity', { x: 150, y: yPos, size: 12, color: rgb(0, 0, 0) });
    page.drawText('Price Per Bag', { x: 250, y: yPos, size: 12, color: rgb(0, 0, 0) });
    page.drawText('Stock Value', { x: 350, y: yPos, size: 12, color: rgb(0, 0, 0) });
    page.drawText('Supplier', { x: 450, y: yPos, size: 12, color: rgb(0, 0, 0) });
    // Add more table headers as needed
  
    // Table rows
    yPos -= 20;
    cocoaBags.forEach((bag) => {
      yPos -= 20;
      const stockValue = bag.quantity * bag.pricePerBag;
      page.drawText(bag.batchNumber, { x: 50, y: yPos, size: 12, color: rgb(0, 0, 0) });
      page.drawText(bag.quantity.toString(), { x: 150, y: yPos, size: 12, color: rgb(0, 0, 0) });
      page.drawText(bag.pricePerBag.toString(), { x: 250, y: yPos, size: 12, color: rgb(0, 0, 0) });
      page.drawText(stockValue.toString(), { x: 350, y: yPos, size: 12, color: rgb(0, 0, 0) });
      page.drawText(bag.supplier, { x: 450, y: yPos, size: 12, color: rgb(0, 0, 0) });
      // Add more table rows as needed
    });
  
    // Calculate total stock quantity and total stock value
  const totalStockQuantity = cocoaBags.reduce((acc, bag) => acc + bag.quantity, 0);
  const totalStockValue = cocoaBags.reduce((acc, bag) => acc + bag.quantity * bag.pricePerBag, 0);

  // Summary report table
  yPos -= 40; // Adjust the position for the summary table
  page.drawText('Summary Report', { x: 50, y: yPos, size: 16, color: rgb(0, 0, 0) });

  yPos -= 20;
  page.drawText('Total Stock Quantity', { x: 50, y: yPos, size: 12, color: rgb(0, 0, 0) });
  page.drawText(totalStockQuantity.toString(), { x: 250, y: yPos, size: 12, color: rgb(0, 0, 0) });

  yPos -= 20;
  page.drawText('Total Stock Value', { x: 50, y: yPos, size: 12, color: rgb(0, 0, 0) });
  page.drawText(totalStockValue.toString(), { x: 250, y: yPos, size: 12, color: rgb(0, 0, 0) });


    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };
  

  return (
    <div className="container mx-auto my-8">
      <div className="flex flex-col items-center mb-4">
        <input
          type="date"
          className="border p-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded mt-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePDF}>
          Generate Report PDF
        </button>
      </div>
    </div>
  );
};

export default StockReport;
