import React, { useState } from "react";
import { Link } from "react-router-dom";

const Report = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      title: "All Income Report",
      path: "/income-report",
      purpose: "This provides income generated (Completed Payment Made) within a period on all batches",
      // ... other details for the Inventory Status Report
    },
    {
      title: " Batch Income Report",
      path: "/batch-income",
      purpose: "This provides income generated (Completed Payment Made) within a period on a specific batch",
      // ... other details for the Transaction History Report
    },
    {
        title: " Pending Income Report",
        path: "/pending-payment",
        purpose: "This provides income(Yet To Pay) generated within a period on a all batches",
        // ... other details for the Transaction History Report
      },
      {
        title: " Pending Expenditure Report",
        path: "/pending-expenses",
        purpose: "This provides expenses pending payment for bags procured and other miscellenous expenses within a period on a all batches",
        // ... other details for the Transaction History Report
      },
    {
      title: "All Procurements Report",
      path: "/procurement-report",
      purpose: "This gives a report of cost of all batch of beans procured within a period(Treated As Expenditure)",
      // ... other details for the Quality Control Report
    },
    {
        title: "Batch Procurement Report",
        path: "/batch-procurement",
        purpose: "This gives a report of cost of a specific batch of beans procured within a period (Treated As Expenditure)",
        // ... other details for the Quality Control Report
      },
      {
        title: "Miscellaneous Report",
        path: "/misc-expense",
        purpose: "This gives a report of all miscellaneous expenses within a period (Treated As Expenditure)",
        // ... other details for the Quality Control Report
      },
      {
        title: "All Expenses Report",
        path: "/all-expense",
        purpose: "This gives a report of all expenses incured within a period (Treated As Expenditure)",
        // ... other details for the Quality Control Report
      },
      {
        title: "Batch Profit Report",
        path: "/batch-profit",
        purpose: "This gives a report of profit made on specific batch of beans within a period",
        // ... other details for the Quality Control Report
      },
      {
        title: "All Profit Report",
        path: "/profit-loss",
        purpose: "This gives a report of profit made on all batches of beans within a period",
        // ... other details for the Quality Control Report
      },
      {
        title: "All Profit Partners Allocation Report",
        path: "/partner-income-report",
        purpose: "This gives a report of profits made and allocated to partners within a period on all prices",
        // ... other details for the Quality Control Report
      },
  
  
  ];

  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28 px-4 my-8">
      <h1 className="text-3xl font-bold mb-4">Financial Reports</h1>
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
