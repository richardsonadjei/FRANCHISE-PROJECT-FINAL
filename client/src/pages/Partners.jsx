
import React, { useState } from 'react';

const Partners = () => {
  const [formData, setFormData] = useState({
    name: '',
    contribution: '',
    email: '',
    phoneNumber: '',
    ghanaCardNumber: '',
    nextofKing: {
      name: '',
      email: '',
      ghanaCardNumber: '',
      phoneNumber: '',
    },
    address: {
      houseNumber: '',
      city: '',
    },
    dateOfBirth: '',
    Comment: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
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
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccessMessage('Partner created successfully!');
        setFormData({
          name: '',
          contribution: '',
          email: '',
          phoneNumber: '',
          ghanaCardNumber: '',
          nextofKing: {
            name: '',
            email: '',
            ghanaCardNumber: '',
            phoneNumber: '',
          },
          address: {
            houseNumber: '',
            city: '',
          },
          dateOfBirth: '',
          Comment: '',
        });
      } else {
        throw new Error('Failed to create partner');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-8">Create a New Partner</h2>
      {successMessage && (
        <div className="bg-green-200 text-green-800 p-4 mb-4 rounded">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contribution" className="block font-semibold mb-1">
            Contribution
          </label>
          <input
            type="text"
            id="contribution"
            name="contribution"
            value={formData.contribution}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block font-semibold mb-1">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ghanaCardNumber" className="block font-semibold mb-1">
            Ghana Card Number
          </label>
          <input
            type="text"
            id="ghanaCardNumber"
            name="ghanaCardNumber"
            value={formData.ghanaCardNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nextofKingName" className="block font-semibold mb-1">
            Next of Kin Name
          </label>
          <input
            type="text"
            id="nextofKingName"
            name="nextofKingName"
            value={formData.nextofKingName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nextofKingEmail" className="block font-semibold mb-1">
            Next of Kin Email
          </label>
          <input
            type="email"
            id="nextofKingEmail"
            name="nextofKingEmail"
            value={formData.nextofKingEmail}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nextofKingGhanaCardNumber" className="block font-semibold mb-1">
            Next of Kin Ghana Card Number
          </label>
          <input
            type="text"
            id="nextofKingGhanaCardNumber"
            name="nextofKingGhanaCardNumber"
            value={formData.nextofKingGhanaCardNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nextofKingPhoneNumber" className="block font-semibold mb-1">
            Next of Kin Phone Number
          </label>
          <input
            type="text"
            id="nextofKingPhoneNumber"
            name="nextofKingPhoneNumber"
            value={formData.nextofKingPhoneNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="houseNumber" className="block font-semibold mb-1">
            House Number
          </label>
          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block font-semibold mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block font-semibold mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Comment" className="block font-semibold mb-1">
            Comment
          </label>
          <textarea
            id="Comment"
            name="Comment"
            value={formData.Comment}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Partner
          </button>
        </div>
      </form>
    </div>
  );
};

export default Partners;