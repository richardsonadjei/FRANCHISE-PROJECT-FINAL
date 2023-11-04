import React, { useState, useEffect } from 'react';

const CreateCocoa = () => {
  const [userId, setUserId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplier, setSupplier] = useState('');
  const [qcCertifications, setQcCertifications] = useState('');
  const [packingDate, setPackingDate] = useState('');
  const [totalWeightPerBatch, setTotalWeightPerBatch] = useState('');
  const [comments, setComments] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Paid');
  const [suppliers, setSuppliers] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/profile', {
          method: 'GET',
          credentials: 'include',
        });
        const userData = await response.json();
        setUserId(userData._id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('/api/supplier/all');
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = document.cookie
        .split(';')
        .map((cookie) => cookie.trim())
        .find((row) => row.startsWith('access_token='))
        ?.split('=')[1];
      
      const response = await fetch('/api/cocoabags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity,
          supplier,
          qcCertifications,
          packingDate,
          totalWeightPerBatch,
          comments,
          userId,
          transactionType: 'Creation',
          paymentStatus,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage('Cocoa Bag created successfully!');
        // Reset all input fields
        setQuantity('');
        setSupplier('');
        setQcCertifications('');
        setPackingDate('');
        setComments('');
        setTotalWeightPerBatch('');
        setTimeout(() => {
          setResponseMessage('');
          window.location.href = '/home'; // Redirect to home page after successful submission
        }, 2000);
      } else {
        setResponseMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      setResponseMessage('Error: Something went wrong');
    }
  };

  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28 px-4">
        <h1 className="text-3xl font-bold mb-4">Receive New Stock</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="supplier" className="block text-gray-700 font-medium mb-2">
            Supplier
          </label>
          <select
            id="supplier"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
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
        <div className="mb-4">
          <label htmlFor="qcCertifications" className="block text-gray-700 font-medium mb-2">
            QC Certifications
          </label>
          <select
            id="qcCertifications"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={qcCertifications}
            onChange={(e) => setQcCertifications(e.target.value)}
            required
          >
            <option value="">Select Certification</option>
            <option value="Graded And Sealed">Graded And Sealed</option>
            <option value="Not Graded And Sealed">Not Graded And Sealed</option>
            
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="packingDate" className="block text-gray-700 font-medium mb-2">
            Packing Date
          </label>
          <input
            type="date"
            id="packingDate"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={packingDate}
            onChange={(e) => setPackingDate(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="totalWeightPerBatch" className="block text-gray-700 font-medium mb-2">
            Total Weight Per Batch
          </label>
          <input
            type="number"
            id="totalWeightPerBatch"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={totalWeightPerBatch}
            onChange={(e) => setTotalWeightPerBatch(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="paymentStatus" className="block text-gray-700 font-medium mb-2">
            Payment Status
          </label>
          <select
            id="paymentStatus"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            required
          >
            <option value="Paid">Paid</option>
            <option value="Credit">Credit</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="comments" className="block text-gray-700 font-medium mb-2">
            Comments
          </label>
          <textarea
            id="comments"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </form>
      {responseMessage && (
        <div className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default CreateCocoa;
