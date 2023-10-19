
import React, { useState } from 'react';

export default function FindSupplier() {
  const [supplier, setSupplier] = useState({
    id: '',
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
  });
  const [name, setName] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/supplier?name=${name}`);
      const data = await response.json();
      setSearchResult(data);
      setSupplier(data);
      setIsEditing(true); // Enable editing mode
    } catch (error) {
      console.error(error);
      setSearchResult(null);
      setIsEditing(false);
      setSupplier({
        id: '',
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
      });
    }
  };

  const handleClear = () => {
    setName('');
    setSearchResult(null);
    setIsEditing(false);
    setSupplier({
      id: '',
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prevSupplier) => ({ ...prevSupplier, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/supplier/${supplier.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplier),
      });
      if (response.ok) {
        // Supplier updated successfully
        // You can show a success message or handle it according to your use case
      } else {
        // Handle update failure, e.g., show an error message
      }
    } catch (error) {
      console.error(error);
      // Handle update failure, e.g., show an error message
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Find Supplier</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="border border-gray-300 px-4 py-2 mr-2"
          placeholder="Enter Supplier's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      {searchResult ? (
        <div className="border border-gray-300 rounded p-4">
          <h2 className="text-lg font-bold mb-2">Supplier Details</h2>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Contact Person</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={supplier.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    searchResult.name
                  )}
                </td>
                <td className="border px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="contactPerson"
                      value={supplier.contactPerson}
                      onChange={handleInputChange}
                    />
                  ) : (
                    searchResult.contactPerson
                  )}
                </td>
                <td className="border px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="email"
                      value={supplier.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    searchResult.email
                  )}
                </td>
                <td className="border px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={supplier.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    searchResult.phone
                  )}
                </td>
                <td className="border px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={supplier.address}
                      onChange={handleInputChange}
                    />
                  ) : (
                    searchResult.address
                  )}
                </td>
                <td className="border px-4 py-2">
                  {isEditing ? (
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}