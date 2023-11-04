
import React, { useState, useEffect } from 'react';

const BatchEvacuationReport = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [evacuations, setEvacuations] = useState([]);
  const [batchNumbers, setBatchNumbers] = useState([]);

  useEffect(() => {
    fetch('/api/cocoabags')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const batchNumbers = data.map((batch) => batch.batchNumber);
          setBatchNumbers(batchNumbers);
        } else {
          console.error('Unexpected response structure:', data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/evacuation/batch-evacuations?batchNumber=${batchNumber}&startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setEvacuations(data.evacuations);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28 px-4">
      <h1 className="text-2xl font-bold mb-4">Batch Evacuation Report</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="batchNumber" className="block font-bold mb-1">
            Batch Number
          </label>
          <select
            id="batchNumber"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Select Batch Number</option>
            {batchNumbers.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
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
          <ul>
            {evacuations.map((evacuation) => (
              <li key={evacuation._id}>
                <ul>
                  <li>Batch Number: {evacuation.batchNumber}</li>
                  <li>Evacuated Quantity: {evacuation.evacuatedQuantity}</li>
                  <li>Customer Name: {evacuation.customerName}</li>
                  <li>Shipping Location: {evacuation.shippingLocation}</li>
                  <li>Shipping Method: {evacuation.shippingMethod}</li>
                  <li>Evacuation Status: {evacuation.evacuationStatus}</li>
                  <li>Evacuation Date: {new Date(evacuation.evacuationDate).toLocaleString()}</li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BatchEvacuationReport;