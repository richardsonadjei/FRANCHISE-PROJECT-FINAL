
import React, { useState, useEffect } from 'react';

const CreateCocoa = () => {
  const [userId, setUserId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplier, setSupplier] = useState('');
  const [harvestYear, setHarvestYear] = useState('');
  const [qcCertifications, setQcCertifications] = useState('');
  const [packingDate, setPackingDate] = useState('');
  const [averageNetWeightPerBag, setAverageNetWeightPerBag] = useState('');
  const [averageGrossWeightPerBag, setAverageGrossWeightPerBag] = useState('');
  const [comments, setComments] = useState('');
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
      console.log('Retrieved Token:', token);
      const response = await fetch('/api/cocoabags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({
          quantity,
          supplier,
          harvestYear,
          qcCertifications,
          packingDate,
          averageNetWeightPerBag,
          averageGrossWeightPerBag,
          comments,
          userId: userId,
          transactionType: 'Creation',
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setResponseMessage('Cocoa Bag created successfully!');
        setQuantity('');
        setSupplier('');
        setHarvestYear('');
        setQcCertifications('');
        setPackingDate('');
        setAverageNetWeightPerBag('');
        setAverageGrossWeightPerBag('');
        setComments('');
        setTimeout(() => {
          setResponseMessage('');
          // Redirect to home page after successful submission
          window.location.href = '/home';
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
    <div className="container mx-auto">
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
          <label htmlFor="harvestYear" className="block text-gray-700 font-medium mb-2">
            Harvest Year
          </label>
          <input
            type="number"
            id="harvestYear"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={harvestYear}
            onChange={(e) => setHarvestYear(e.target.value)}
            required
          />
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
            <option value="Certified">Certified</option>
            <option value="Yet To Certify">Yet To Certify</option>
            <option value="Not Certified">Not Certified</option>
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
          <label htmlFor="averageNetWeightPerBag" className="block text-gray-700 font-medium mb-2">
            Average Net Weight Per Bag
          </label>
          <input
            type="number"
            id="averageNetWeightPerBag"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={averageNetWeightPerBag}
            onChange={(e) => setAverageNetWeightPerBag(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="averageGrossWeightPerBag" className="block text-gray-700 font-medium mb-2">
            Average Gross Weight Per Bag
          </label>
          <input
            type="number"
            id="averageGrossWeightPerBag"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={averageGrossWeightPerBag}
            onChange={(e) => setAverageGrossWeightPerBag(e.target.value)}
            required
          />
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