import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ReceiveStock = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [batchNumber, setBatchNumber] = useState('');
  const [availableBatches, setAvailableBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [receivedQuantity, setReceivedQuantity] = useState('');
  const [receivedWeight, setReceivedWeight] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('Paid');
  const [suppliers, setSuppliers] = useState([]); // New state for suppliers
  const [supplier, setSupplier] = useState(''); // Declare supplier state

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch('/api/cocoabags');
        const data = await response.json();
        setAvailableBatches(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await fetch('/api/supplier/all');
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBatches();
    fetchSuppliers();
  }, []);

  const handleBatchNumberChange = (event) => {
    const selectedBatchNumber = event.target.value;
    setBatchNumber(selectedBatchNumber);
    const selectedBatch = availableBatches.find(
      (batch) => batch.batchNumber === selectedBatchNumber
    );
    setSelectedBatch(selectedBatch);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/cocoabags/${batchNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receivedQuantity, paymentStatus, receivedWeight, supplier, }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsTransactionSuccessful(true);
        setAlertMessage('Transaction successful');
        setTimeout(() => {
          window.location.href = '/home';
        }, 3000);
      } else {
        setIsTransactionSuccessful(false);
        setAlertMessage('Transaction failed');
      }
      setBatchNumber('');
      setSelectedBatch(null);
      setReceivedQuantity('');
      setReceivedWeight('');
    } catch (error) {
      console.error(error);
      setIsTransactionSuccessful(false);
      setAlertMessage('Internal Server Error');
    }
  };


  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28 px-4">
      {isTransactionSuccessful && (
        <div className={`mt-4 p-4 rounded bg-green-200 text-center`}>
          {alertMessage} Redirecting to <Link to="/home">Homepage</Link>...
        </div>
      )}
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
        <div className="mb-4">
          <label htmlFor="receivedWeight" className="block font-bold mb-1">
            Received Weight (in kilograms)
          </label>
          <input
            id="receivedWeight"
            type="number"
            className="w-full border border-gray-300 rounded py-2 px-3"
            value={receivedWeight}
            onChange={(event) => setReceivedWeight(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block font-bold mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full border border-gray-300 rounded py-2 px-3"
            defaultValue={currentUser.username}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="paymentStatus" className="block font-bold mb-1">
            Payment Status
          </label>
          <select
            id="paymentStatus"
            className="w-full border border-gray-300 rounded py-2 px-3"
            value={paymentStatus}
            onChange={(event) => setPaymentStatus(event.target.value)}
            required
          >
            <option value="Paid">Paid</option>
            <option value="Credit">Credit</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="supplier" className="block font-bold mb-1">
            Supplier
          </label>
          <select
            id="supplier"
            className="w-full border border-gray-300 rounded py-2 px-3"
            value={supplier}
            onChange={(event) => setSupplier(event.target.value)}
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier.name}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      
    </div>
  );
};

export default ReceiveStock;