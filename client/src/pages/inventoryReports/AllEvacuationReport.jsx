
import React, { useState } from 'react';

const AllEvacuationReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [evacuations, setEvacuations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/evacuation/period?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setEvacuations(data.evacuations);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28 px-4">
      <h1 className="text-2xl font-bold mb-4">All Evacuation Report</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="startDate" className="block font-bold mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block font-bold mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate Report
        </button>
      </form>
      {evacuations.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Evacuations:</h2>
          <table className="border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">Batch Number</th>
                <th className="border border-gray-400 px-4 py-2">Evacuated Quantity</th>
                <th className="border border-gray-400 px-4 py-2">Customer Name</th>
                <th className="border border-gray-400 px-4 py-2">Shipping Location</th>
                <th className="border border-gray-400 px-4 py-2">Shipping Method</th>
                <th className="border border-gray-400 px-4 py-2">Evacuation Status</th>
                <th className="border border-gray-400 px-4 py-2">Evacuation Date</th>
              </tr>
            </thead>
            <tbody>
              {evacuations.map((evacuation) => (
                <tr key={evacuation._id}>
                  <td className="border border-gray-400 px-4 py-2">{evacuation.batchNumber}</td>
                  <td className="border border-gray-400 px-4 py-2">{evacuation.evacuatedQuantity}</td>
                  <td className="border border-gray-400 px-4 py-2">{evacuation.customerName}</td>
                  <td className="border border-gray-400 px-4 py-2">{evacuation.shippingLocation}</td>
                  <td className="border border-gray-400 px-4 py-2">{evacuation.shippingMethod}</td>
                  <td className="border border-gray-400 px-4 py-2">{evacuation.evacuationStatus}</td>
                  <td className="border border-gray-400 px-4 py-2">{new Date(evacuation.evacuationDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllEvacuationReport;