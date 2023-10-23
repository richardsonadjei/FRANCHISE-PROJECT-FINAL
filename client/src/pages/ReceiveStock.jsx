
import React, { useState, useEffect } from 'react';

const ReceiveStock = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [availableBatches, setAvailableBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [receivedQuantity, setReceivedQuantity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(false);

  useEffect(() => {
    // Fetch available batches from the server
    const fetchBatches = async () => {
      try {
        const response = await fetch('/api/cocoabags');
        const data = await response.json();
        setAvailableBatches(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBatches();
  }, []);

  const handleBatchNumberChange = (event) => {
    const selectedBatchNumber = event.target.value;
    setBatchNumber(selectedBatchNumber);

    // Find the selected batch from availableBatches
    const selectedBatch = availableBatches.find(
      (batch) => batch.batchNumber === selectedBatchNumber
    );

    setSelectedBatch(selectedBatch);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make the transaction request to the server
    try {
      const response = await fetch(`/api/cocoabags/${batchNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receivedQuantity }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsTransactionSuccessful(true);
        setAlertMessage('Transaction successful');
        // Additional logic or state updates on success
      } else {
        setIsTransactionSuccessful(false);
        setAlertMessage('Transaction failed');
        // Additional logic or state updates on failure
      }
      // Clear input fields
      setBatchNumber('');
      setSelectedBatch(null);
      setReceivedQuantity('');
    } catch (error) {
      console.error(error);
      setIsTransactionSuccessful(false);
      setAlertMessage('Internal Server Error');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Receive Stock</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="batchNumber" className="block font-bold mb-1">
            Batch Number
          </label>
          <select
            id="batchNumber"
            className="w-full border border-gray-300 rounded py-2 px-3"
            value={batchNumber}
            onChange={handleBatchNumberChange}
            required
          >
            <option value="">Select a batch</option>
            {availableBatches.map((batch) => (
              <option key={batch.batchNumber} value={batch.batchNumber}>
                {batch.batchNumber}
              </option>
            ))}
          </select>
        </div>
        {selectedBatch && (
          <div className="mb-4">
            <label htmlFor="availableQuantity" className="block font-bold mb-1">
              Available Quantity
            </label>
            <input
              id="availableQuantity"
              type="text"
              className="w-full border border-gray-300 rounded py-2 px-3"
              value={selectedBatch.quantity}
              readOnly
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="receivedQuantity" className="block font-bold mb-1">
            Received Quantity
          </label>
          <input
            id="receivedQuantity"
            type="text"
            className="w-full border border-gray-300 rounded py-2 px-3"
            value={receivedQuantity}
            onChange={(event) => setReceivedQuantity(event.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      {alertMessage && (
        <div
          className={`mt-4 p-4 rounded ${
            isTransactionSuccessful ? 'bg-green-200' : 'bg-red-200'
          }`}
        >
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default ReceiveStock;