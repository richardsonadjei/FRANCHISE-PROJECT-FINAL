import React, { useState } from 'react';

const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    registrationNumber: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    bankingDetails: {
      accountNumber: '',
      bankName: '',
      bankBranch: '',
    },
    mobileMoneyDetails: {
      phoneNumber: '',
      provider: '',
    },
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Customer created successfully.');
        setMessageType('success');
        setFormData({
          companyName: '',
          registrationNumber: '',
          website: '',
          email: '',
          phone: '',
          address: '',
          bankingDetails: {
            accountNumber: '',
            bankName: '',
            bankBranch: '',
          },
          mobileMoneyDetails: {
            phoneNumber: '',
            provider: '',
          },
        });
        console.log(data);
      } else {
        setMessage('Error creating customer. Please try again.');
        setMessageType('error');
        console.error(data);
      }
    } catch (error) {
      setMessage('Internal Server Error. Please try again later.');
      setMessageType('error');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      {message && (
        <p className={`text-${messageType} mb-4`}>{message}</p>
      )}
      <h2 className="text-2xl font-bold mb-4">Create Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="companyName" className="block font-bold mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="registrationNumber" className="block font-bold mb-2">
            Registration Number
          </label>
          <input
            type="text"
            id="registrationNumber"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="website" className="block font-bold mb-2">
            Website
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block font-bold mb-2">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block font-bold mb-2">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="accountNumber" className="block font-bold mb-2">
            Account Number
          </label>
          <input
            type="text"
            id="accountNumber"
            name="bankingDetails.accountNumber"
            value={formData.bankingDetails.accountNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bankName" className="block font-bold mb-2">
            Bank Name
          </label>
          <input
            type="text"
            id="bankName"
            name="bankingDetails.bankName"
            value={formData.bankingDetails.bankName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bankBranch" className="block font-bold mb-2">
            Bank Branch
          </label>
          <input
            type="text"
            id="bankBranch"
            name="bankingDetails.bankBranch"
            value={formData.bankingDetails.bankBranch}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block font-bold mb-2">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="mobileMoneyDetails.phoneNumber"
            value={formData.mobileMoneyDetails.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="provider" className="block font-bold mb-2">
            Provider
          </label>
          <input
            type="text"
            id="provider"
            name="mobileMoneyDetails.provider"
            value={formData.mobileMoneyDetails.provider}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCustomer;