
import React, { useState, useEffect } from 'react';

const Evacuation = () => {
  const [batchNumbers, setBatchNumbers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [evacuationData, setEvacuationData] = useState({
    batchNumber: '',
    evacuatedQuantity: '',
    customerName: '',
    shippingLocation: '',
    shippingMethod: '',
  });

  useEffect(() => {
    // Fetch batch numbers from the API endpoint
    fetch('/api/cocoabags')
      .then((response) => response.json())
      .then((data) => {
        // Check if data is an array and not empty
        if (Array.isArray(data) && data.length > 0) {
          // Extract batch numbers from the batch objects and set in state
          const extractedBatchNumbers = data.map(batch => batch.batchNumber);
          setBatchNumbers(extractedBatchNumbers);
        } else {
          console.error('Invalid batch numbers data:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching batch numbers:', error);
      });

    // Fetch customers from the API endpoint
    fetch('/api/customer/getall')
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvacuationData({ ...evacuationData, [name]: value });
  };

  const handleEvacuationSubmit = (e) => {
    e.preventDefault();
    // Perform evacuation logic here using evacuationData state
    fetch('/api/evacuation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evacuationData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Assume the evacuation is successful
        alert('Evacuation successful');
        // Redirect to the income page with batchNumber and evacuatedQuantity in the URL
        const { batchNumber, evacuatedQuantity } = evacuationData;
        window.location.href = `/income?batchNumber=${batchNumber}&evacuatedQuantity=${evacuatedQuantity}`;
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error cases here
        // ...
      });
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6">Evacuation Form</h1>
      <form onSubmit={handleEvacuationSubmit}>
        <div className="mb-4">
          <label htmlFor="batchNumber" className="block text-sm font-medium text-gray-600">
            Batch Number
          </label>
          <select
            id="batchNumber"
            name="batchNumber"
            value={evacuationData.batchNumber}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          >
            <option value="" disabled>Select Batch Number</option>
            {/* Map through batchNumbers array and render options */}
            {batchNumbers.map((batchNumber) => (
              <option key={batchNumber} value={batchNumber}>
                {batchNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="evacuatedQuantity" className="block text-sm font-medium text-gray-600">
            Evacuated Quantity
          </label>
          <input
            type="number"
            id="evacuatedQuantity"
            name="evacuatedQuantity"
            value={evacuationData.evacuatedQuantity}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-600">
            Customer Name
          </label>
          <select
            id="customerName"
            name="customerName"
            value={evacuationData.customerName}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          >
            <option value="" disabled>Select Customer</option>
            {Array.isArray(customers) &&
              customers.map((customer) => (
                <option key={customer._id} value={customer.companyName}>
                  {customer.companyName}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="shippingLocation" className="block text-sm font-medium text-gray-600">
            Shipping Location
          </label>
          <input
            type="text"
            id="shippingLocation"
            name="shippingLocation"
            value={evacuationData.shippingLocation}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="shippingMethod" className="block text-sm font-medium text-gray-600">
            Shipping Method
          </label>
          <input
            type="text"
            id="shippingMethod"
            name="shippingMethod"
            value={evacuationData.shippingMethod}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Evacuate
        </button>
      </form>
    </div>
  );
};

export default Evacuation;