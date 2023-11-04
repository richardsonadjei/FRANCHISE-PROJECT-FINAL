import React, { useState } from 'react';

const UpdateCustomer = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({
    companyName: '',
    registrationNumber: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    bankingDetails: '',
    mobileMoneyDetails: '',
  });

  const handleSearch = async () => {
    try {
        const fetchURL = `/api/customer/${customerName}`;
        console.log('Fetch URL:', fetchURL); // Log the URL
        const response = await fetch(fetchURL);
      
      if (response.ok) {
        const data = await response.json();
        setCustomerData(data.data);
        // Populate the form fields with customer data
        setUpdatedFields(data.data);
      } else {
        setCustomerData(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFields({ ...updatedFields, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/customer/${customerName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message to the user
        console.log('Customer updated successfully!');
      } else {
        // Handle error, e.g., show an error message to the user
        console.error('Failed to update customer');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28 px-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Customer Name:</label>
        <input
          type="text"
          className="mt-1 p-2 border rounded"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={handleSearch}>
          Search Customer
        </button>
      </div>

      {customerData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Customer Details</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(updatedFields).map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-600">{field}</label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded"
                  name={field}
                  value={updatedFields[field]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
          <button className="mt-4 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded" onClick={handleUpdate}>
            Update Customer
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateCustomer;
