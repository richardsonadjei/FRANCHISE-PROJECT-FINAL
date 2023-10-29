
import React, { useState, useEffect } from 'react';

const UpdatePayment = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const batchNumberParam = params.get('batchNumber');
    if (batchNumberParam) {
      setBatchNumber(batchNumberParam);
    }
  }, []);
  
  const handlePaymentStatusChange = (e) => {
    setPaymentStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the update payment status logic here
    const updateData = {
      batchNumber,
      paymentStatus,
    };

    fetch('/api/income/update-payment-status', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Payment status updated successfully');
        // Reset the form fields
        setPaymentStatus('');
        // Navigate to the home page
        window.location.href = '/home';
      })
      .catch((error) => {
        alert('Error updating payment status');
        console.error('Error:', error);
        // Handle error cases
      });
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6">Update Payment Status</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="batchNumber" className="block text-sm font-medium text-gray-600">
            Batch Number
          </label>
          <input
            type="text"
            id="batchNumber"
            name="batchNumber"
            value={batchNumber}
            className="mt-1 p-2 border rounded-md w-full"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-600">
            Payment Status
          </label>
          <select
            id="paymentStatus"
            name="paymentStatus"
            value={paymentStatus}
            onChange={handlePaymentStatusChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          >
            <option value="">Select Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Update Payment Status
        </button>
      </form>
    </div>
  );
};

export default UpdatePayment;