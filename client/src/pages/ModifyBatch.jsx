import React, { useState, useEffect } from 'react';

const ModifyBatch = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatchNumber, setSelectedBatchNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [userId, setUserId] = useState('');
  const [initialQuantities, setInitialQuantities] = useState({});

  useEffect(() => {
    const fetchBatchesData = async () => {
      try {
        const response = await fetch('/api/cocoabags');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const initialQuantitiesObject = data.reduce((acc, batch) => {
          acc[batch.batchNumber] = batch.quantity;
          return acc;
        }, {});
        setBatches(data);
        setInitialQuantities(initialQuantitiesObject);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };
    fetchBatchesData();
  }, []);

  const existingQuantity = initialQuantities[selectedBatchNumber] || '';

  const handleModifyCocoa = async (e) => {
    e.preventDefault();

    if (quantity === null || isNaN(quantity)) {
      alert('Invalid quantity');
      return;
    }

    if (isNaN(quantity) || quantity === '') {
      alert('Invalid quantity');
      return;
    }

    try {
      const response = await fetch(`/api/cocoabags/modify/${selectedBatchNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: parseFloat(quantity), // Include the quantity field in the request body
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Cocoa modified successfully');
      window.location.reload();
      
    } catch (error) {
      console.error('Error modifying cocoa:', error);
      alert('An error occurred while modifying cocoa');
    }
  };

  return (
    <div className="container mx-auto p-4 shadow-lg rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Modify Cocoa</h1>
      <form onSubmit={handleModifyCocoa} className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Batch Number</label>
          <select
            value={selectedBatchNumber}
            onChange={(e) => setSelectedBatchNumber(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select Batch</option>
            {batches.map((batch, index) => (
              <option key={index} value={batch.batchNumber}>
                {batch.batchNumber}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Existing Quantity</label>
          <input
            type="text"
            value={existingQuantity}
            readOnly
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">New Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Modify Cocoa
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifyBatch;