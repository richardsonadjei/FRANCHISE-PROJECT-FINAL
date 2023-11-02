import React, { useState } from "react";
import { Link } from "react-router-dom";

const Report = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      title: "Stock Report",
      path: "/stock-report",
      purpose: "This provides the current stock of cocoa bags available within a designated period",
      // ... other details for the Inventory Status Report
    },
    {
      title: "All Transaction History Report",
      path: "/transaction-history",
      purpose: "To track all transactions to all batches in the warehouse",
      // ... other details for the Transaction History Report
    },
    {
      title: "All Procurement Report",
      path: "/procurement-report",
      purpose: "All procurements done on all batches within a period",
      // ... other details for the Supplier Performance Report
    },
    {
      title: "Stock Received Report",
      path: "/receive-report",
      purpose: "This gives a report of cocoabeans received within a period from a specified supplier into a specific Batch",
      // ... other details for the Quality Control Report
    },
    {
      title: "Batch Transaction History",
      path: "/batch-history",
      purpose: "This tells what has happened to a particular batch after it from creation",
      // ... other details for the Quality Control Report
    },
    {
      title: "Batch Procurement History",
      path: "/batch-procurement",
      purpose: "This tells the various procurements for a particular batch within a particular period",
      // ... other details for the Quality Control Report
    },
    {
      title: "All Evacuations Report",
      path: "/all-evacuation",
      purpose: "This gives a report of all batches of beans evacuated within a period",
      // ... other details for the Quality Control Report
    },
    {
      title: "Batch Evacuation Report",
      path: "/batch-evacuation",
      purpose: "This gives a report of specific batch of beans evacuated within a period",
      // ... other details for the Quality Control Report
    },
    {
      title: "View All Waybills",
      path: "/waybill-report",
      purpose: "This gives a report all waybills generated within a period",
      // ... other details for the Quality Control Report
    },
   
  
  
  ];

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">WareHouse Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reports.map((report, index) => (
          <Link to={report.path} key={index} className="no-underline">
            <div
              className="border p-4 cursor-pointer transition duration-300 ease-in-out transform hover:shadow-lg"
              onClick={() => setSelectedReport(report)}
            >
              <h2 className="text-xl font-semibold mb-2">{report.title}</h2>
              <p className="text-gray-600">{report.purpose}</p>
            </div>
          </Link>
        ))}
      </div>

      {selectedReport && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">{selectedReport.title}</h2>
          <p className="text-gray-600 mb-4">{selectedReport.purpose}</p>
          {/* Render the specific report content here based on the selectedReport */}
        </div>
      )}
    </div>
  );
};

export default Report;
