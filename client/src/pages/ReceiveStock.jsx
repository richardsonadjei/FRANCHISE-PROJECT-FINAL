import React, { useState, useEffect } from 'react';

const ReceiveStock = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [quantity, setQuantity] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [receivedQuantity, setReceivedQuantity] = useState('');

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

    // Fetch available suppliers from the server
    fetch('/api/supplier/all')
      .then((response) => response.json())
      .then((data) => {
        setSuppliers(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // Function to fetch batch details when batch is selected
  const handleBatchSelect = (batchNumber) => {
    // Find the selected batch from the batches list
    const selectedBatch = batches.find(batch => batch.batchNumber === batchNumber);
    // Set the selected batch and its quantity
    setSelectedBatch(selectedBatch.batchNumber);
    setQuantity(selectedBatch.quantity);
  };

  const handleReceiveStock = () => {
    // Validate selectedBatch, selectedSupplier, and receivedQuantity before updating
    if (!selectedBatch || !selectedSupplier || !receivedQuantity) {
      alert('Please fill out all fields.');
      return;
    }
  
    // Calculate new quantity by adding received quantity to the existing quantity
    const newQuantity = parseInt(quantity) + parseInt(receivedQuantity);
  
    // Send a PUT request to update the received quantity for the selected batch
    fetch(`/api/cocoabags/${selectedBatch}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: newQuantity, // Send the new quantity after adding received quantity
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // If response is successful, parse the JSON data
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then((updatedBatch) => {
        // Show success message in a green alert box
        alert('Stock received successfully!');
        console.log('Stock received successfully:', updatedBatch);
        // Clear input fields after successful update
        setSelectedBatch('');
        setQuantity('');
        setSelectedSupplier('');
        setReceivedQuantity('');
      })
      .catch((error) => {
        // Show error message in a red alert box
        alert('Error receiving stock. Please try again.');
        console.error('Error receiving stock:', error);
        // Handle error scenarios here
      });
  };
  
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Receive Cocoa Bean Stock</h1>
      <div className="flex mb-4">
        <select
          className="border p-2 mr-2"
          value={selectedBatch}
          onChange={(e) => {
            setSelectedBatch(e.target.value);
            handleBatchSelect(e.target.value);
          }}
        >
          <option value="">Select Batch</option>
          {batches.map((batch) => (
            <option key={batch.batchNumber} value={batch.batchNumber}>
              Batch Number: {batch.batchNumber}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Quantity"
          value={quantity}
          readOnly
        />
        <select
          className="border p-2 mr-2"
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value)}
        >
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier.name}>
              {supplier.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Enter Received Quantity"
          value={receivedQuantity}
          onChange={(e) => setReceivedQuantity(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded" onClick={handleReceiveStock}>
          Receive Stock
        </button>
      </div>
    </div>
  );
};

export default ReceiveStock;
