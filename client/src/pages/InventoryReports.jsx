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
      title: "Transaction History Report",
      path: "/transaction-history",
      purpose: "To track all transactions related to cocoa beans, including...",
      // ... other details for the Transaction History Report
    },
    {
      title: "Supplier Performance Report",
      path: "/supplier-performance",
      purpose: "To evaluate the performance of different suppliers based on...",
      // ... other details for the Supplier Performance Report
    },
    {
      title: "Quality Control Report",
      path: "/quality-control",
      purpose: "To assess the quality of cocoa beans received from different suppliers...",
      // ... other details for the Quality Control Report
    },
    {
      title: "Batch Update History Report",
      path: "/batch-update-history",
      purpose: "To track all changes made to existing batches, including updates...",
      // ... other details for the Batch Update History Report
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
