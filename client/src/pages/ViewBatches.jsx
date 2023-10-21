import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const ViewBatches = () => {
  const [cocoaBags, setCocoaBags] = useState([]);

  useEffect(() => {
    fetchCocoaBags();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF('landscape'); // Set the orientation to landscape
    doc.setFontSize(12);
    let yPosition = 20; // Adjust the initial yPosition
  
    const itemsPerPage = 10; // Number of items to display per page
    let startIndex = 0;
    let endIndex = Math.min(startIndex + itemsPerPage, cocoaBags.length);
  
    while (startIndex < cocoaBags.length) {
      // Add content to the PDF for the current page
      for (let i = startIndex; i < endIndex; i++) {
        // Add data to the PDF
        // ...
        yPosition += 10; // Adjust vertical spacing
      }
  
      // Add pagination information (optional)
      doc.text(`Page ${Math.floor(startIndex / itemsPerPage) + 1}`, 250, 280);
  
      // Create a new page if there are more items to display
      if (endIndex < cocoaBags.length) {
        doc.addPage('landscape');
        yPosition = 20; // Reset yPosition for the new page
      }
  
      // Update indices for the next page
      startIndex = endIndex;
      endIndex = Math.min(startIndex + itemsPerPage, cocoaBags.length);
    }
  
    doc.save('cocoa_batches_report.pdf');
  };
  return (
    <div className="container mx-auto p-8">
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
