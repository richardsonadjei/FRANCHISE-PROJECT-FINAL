import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const CreateSupplier = () => {
  const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: ''
    });
    const [responseMessage, setResponseMessage] = useState('');
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('/api/supplier', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (response.ok) {
          const data = await response.json();
          setResponseMessage(`Supplier created successfully with ID: ${data._id}`);
        } else {
          const errorData = await response.json();
          setResponseMessage(`Error: ${errorData.message}`);
        }
      } catch (error) {
        setResponseMessage(`Network error: ${error.message}`);
      }
    };

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create New Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Supplier Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Contact Person</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Created By</label>
          <input
            type="text"
            defaultValue={currentUser.username}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            readOnly
            required
          />
        </div>

        <div className="flex items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
          >
            Create Supplier
          </button>
          <Link to="/main-page" className="text-blue-500 hover:underline">
            Cancel
          </Link>
        </div>
        {responseMessage && (
          <p className={`text-sm ${responseMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {responseMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateSupplier;
