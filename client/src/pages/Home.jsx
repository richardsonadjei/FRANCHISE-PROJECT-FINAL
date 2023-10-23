
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  
const [inventorySummary, setInventorySummary] = useState({ totalQuantity: 0, totalValue: 0 });

  useEffect(() => {
    const fetchInventorySummary = async () => {
      try {
        const response = await fetch('/api/cocoabags/summary');
        const data = await response.json();
        setInventorySummary(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInventorySummary();
    const interval = setInterval(fetchInventorySummary, 1800000); // Fetch every 30 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-lg shadow-lg mb-4 text-center">
        <h2 className="text-2xl font-bold mb-4 animate__animated animate__fadeIn">
          Welcome to Pador Farms, {currentUser ? currentUser.username : 'Guest'}!
        </h2>
        <p className="text-lg">
          The mission of Pador Farms is to grow to be a major cocoa buying company at the district, regional, national, and global stages. We aim to provide high-quality cocoa products and contribute to the sustainable growth of the cocoa industry.
        </p>
      </section>
      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-center">
        <Link to="/evacuation-invoice" className="quick-action-btn bg-green-500 text-white py-4 rounded-lg hover:bg-green-700">
          Perform Evacuation With Invoice
        </Link>
        <Link to="/update-batch" className="quick-action-btn bg-indigo-500 text-white py-4 rounded-lg hover:bg-indigo-700">
          Update Existing Batch
        </Link>
        <Link to="/add-supplier" className="quick-action-btn bg-indigo-500 text-white py-4 rounded-lg hover:bg-indigo-700">
          Add A New Supplier/Farmer
        </Link>
        <Link to="/register-cocoa" className="quick-action-btn bg-indigo-500 text-white py-4 rounded-lg hover:bg-indigo-700">
          Receive New Batch
        </Link>
        <Link to="/receive-stock" className="quick-action-btn bg-indigo-500 text-white py-4 rounded-lg hover:bg-indigo-700">
          Receive Beans To An Existing Batch
        </Link>
      </section>
      {/* Inventory Summary */}
      <section className="bg-gradient-to-r from-pink-400 to-red-500 text-white p-8 rounded-lg shadow-lg mb-4 animate__animated animate__fadeIn text-center">
        <h2 className="text-2xl font-bold mb-4 ">Inventory Summary</h2>
        <p>Quantity: {inventorySummary.totalQuantity} bags</p>
        <p>Total Value Of Available Bags: Ghc{inventorySummary.totalValue}</p>
      </section>
      {/* Recent Transactions */}
      <section className="bg-gradient-to-r from-purple-400 to-pink-500 text-white p-8 rounded-lg shadow-lg mb-4 animate__animated animate__fadeIn text-center">
        <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
        <ul>
          <li className="mb-2">New Inventory Received - 50 bags</li>
          <li>Order Fulfilled - Customer Name, Date</li>
        </ul>
      </section>
      {/* Financial Snapshot */}
      <section className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white p-8 rounded-lg shadow-lg mb-4 animate__animated animate__fadeIn text-center">
        <h2 className="text-2xl font-bold mb-4">Financial Snapshot</h2>
        <p>Income: $7000</p>
        <p>Expenditures: $2000</p>
        <p>Profit/Loss: $5000</p>
      </section>
      {/* Upcoming Tasks */}
      <section className="bg-gradient-to-r from-yellow-500 to-green-500 text-white p-8 rounded-lg shadow-lg mb-4 animate__animated animate__fadeIn">
        <h2 className="text-2xl font-bold mb-4">Upcoming Tasks</h2>
        <ul>
          <li className="mb-2">Scheduled Deliveries: Tomorrow, Customer Name</li>
          <li>Pending Invoices: 2 invoices to be sent</li>
        </ul>
      </section>
      {/* Graphs and Charts */}
      <section className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white p-8 rounded-lg shadow-lg animate__animated animate__fadeIn">
        <h2 className="text-2xl font-bold mb-4">Graphs and Charts</h2>
        {/* Add your chart component here */}
      </section>
    </div>
  );
};

export default HomePage;