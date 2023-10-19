import React, { useEffect, useState } from 'react';

const ViewSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Suppliers</h1>
      {suppliers.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Contact Person</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Address</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id} className="bg-gray-100 hover:bg-gray-200">
                <td className="px-6 py-4">{supplier.name}</td>
                <td className="px-6 py-4">{supplier.contactPerson}</td>
                <td className="px-6 py-4">{supplier.email}</td>
                <td className="px-6 py-4">{supplier.phone}</td>
                <td className="px-6 py-4">{supplier.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-4 text-gray-600">No suppliers found.</p>
      )}
    </div>
  );
};

export default ViewSuppliers;
