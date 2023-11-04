
import React, { useState } from 'react';

const WaybillReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [waybills, setWaybills] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/waybill/waybills?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setWaybills(data.waybills);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28 px-4">
      <h1 className="text-3xl font-bold mb-6">Waybill Report</h1>
      <form onSubmit={handleSearch} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
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
        </div>
        <div>
          <label htmlFor="endDate" className="text-lg font-semibold mb-2">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            className="border p-2 rounded focus:outline-none focus:border-blue-500 transition duration-300"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Search
          </button>
        </div>
      </form>
      {waybills.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">Waybill Number</th>
                <th className="py-2 px-4">Customer Name</th>
                <th className="py-2 px-4">Port Agent Name</th>
                <th className="py-2 px-4">Port Agent Address</th>
                <th className="py-2 px-4">Port Agent Contact</th>
                <th className="py-2 px-4">Evacuated Quantity</th>
                <th className="py-2 px-4">Delivery Status</th>
                <th className="py-2 px-4">Total Weight</th>
                <th className="py-2 px-4">Issue Date</th>
              </tr>
            </thead>
            <tbody>
              {waybills.map((waybill) => (
                <tr key={waybill._id}>
                  <td className="py-2 px-4">{waybill.wayBillNumber}</td>
                  <td className="py-2 px-4">{waybill.customerName}</td>
                  <td className="py-2 px-4">{waybill.portAgentName}</td>
                  <td className="py-2 px-4">{waybill.portAgentAddress}</td>
                  <td className="py-2 px-4">{waybill.portAgentContact}</td>
                  <td className="py-2 px-4">{waybill.evacuatedQuantity}</td>
                  <td className="py-2 px-4">{waybill.deliveryStatus}</td>
                  <td className="py-2 px-4">{waybill.totalWeight}</td>
                  <td className="py-2 px-4">{new Date(waybill.issueDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No waybills found for the specified period.</p>
      )}
    </div>
  );
};

export default WaybillReport;