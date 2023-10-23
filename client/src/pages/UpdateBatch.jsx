import React, { useState, useEffect } from 'react';

const UpdateBatch = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch available batches from the server
    fetch('/api/cocoabags')
      .then((response) => response.json())
      .then((data) => {
        setBatches(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    // Update the quantity state when a batch is selected
    if (selectedBatch) {
      const selectedBatchData = batches.find(batch => batch.batchNumber === selectedBatch);
      if (selectedBatchData) {
        setQuantity(selectedBatchData.quantity.toString());
      }
    } else {
      setQuantity('');
    }
  }, [selectedBatch, batches]);

  const handleUpdateBatch = () => {
    // Validate selectedBatch and quantity before updating
    if (!selectedBatch || !quantity) {
      setMessage('Please select a batch and enter a valid quantity.');
      return;
    }

    // Create a new Date object to get the current date and time
    const updatedAt = new Date();
    // Prepare the request body with quantity, transactionType, and updatedAt
    const requestBody = {
      quantity: parseInt(quantity, 10), // Convert quantity to integer before sending
      transactionType: 'Update',
      updatedAt, // Include the updatedAt field in the request body
    };

    // Send a PUT request to update the selected batch with the new quantity
    fetch(`/api/cocoabags/${selectedBatch}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((updatedBatch) => {
        setMessage('Batch updated successfully.');
        // Clear input fields after successful update
        setSelectedBatch('');
        setQuantity('');
      })
      .catch((error) => {
        setMessage('Error updating batch. Please try again.');
        console.error('Error updating batch:', error);
        // Handle error scenarios here
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Cocoa Bean Batch</h1>
      <div className="flex mb-4">
        <select
          className="border p-2 mr-2"
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          <option value="">Select Batch</option>
          {batches.map((batch) => (
            <option key={batch.batchNumber} value={batch.batchNumber}>
              Batch Number: {batch.batchNumber}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="border p-2"
          placeholder="Enter Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded" onClick={handleUpdateBatch}>
          Update Batch
        </button>
      </div>
      {message && (
        <p className={`text-center py-2 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default UpdateBatch;
