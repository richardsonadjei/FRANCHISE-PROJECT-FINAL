import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [inventorySummary, setInventorySummary] = useState({
    totalQuantity: 0,
    totalWeight: 0,
  });

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
    const interval = setInterval(fetchInventorySummary, 60000); // Fetch every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-cover bg-center h-screen bg-gradient-to-b from-indigo-900 to-indigo-600 text-white font-body mx-auto overflow-y-auto max-h-screen mt-16 px-4">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-6 text-center mt-36">Welcome to Pador Farms, {currentUser ? currentUser.username : 'Guest'}!</h1>
        <p className="text-3xl mb-10 text-center">
  <span className="italic text-green-500">Your</span>{" "}
  <span className="italic text-blue-500">Source</span>{" "}
  <span className="italic text-yellow-500">for</span>{" "}
  <span className="italic text-purple-500">Premium</span>{" "}
  <span className="italic text-red-500">Cocoa</span>{" "}
  <span className="italic text-indigo-500">Beans</span>
</p>

<section className="bg-gray-800 bg-opacity-50 text-white p-8 rounded-lg shadow-lg mb-4 animate__animated animate__fadeIn text-center hover:shadow-2xl transition duration-300">
  <h2 className="text-2xl font-bold mb-4 text-indigo-400">Inventory Summary</h2>
  <p className="text-lg mb-2">
    Quantity:{" "}
    <span className="font-bold text-green-400 hover:translate-y-1 transition duration-300">
      {inventorySummary.totalQuantity} bags
    </span>
  </p>
  <p className="text-lg">
    Total Weight Of Bags Available:{" "}
    <span className="font-bold text-yellow-400 hover:translate-y-1 transition duration-300">
      {inventorySummary.totalWeight} kg
    </span>
  </p>
</section>



        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link to="/evacuation" className="quick-action-btn bg-green-500 text-white py-4 rounded-lg hover:bg-green-600 hover:translate-y-1 hover:shadow-lg transition duration-300 text-center font-bold">
            Perform Evacuation With Invoice
          </Link>
          <Link to="/modify-batch" className="quick-action-btn bg-indigo-500 text-white py-4 rounded-lg hover:bg-indigo-600 hover:translate-y-1 hover:shadow-lg transition duration-300 text-center font-bold">
            Modify An Existing Batch
          </Link>
          <Link to="/add-supplier" className="quick-action-btn bg-yellow-500 text-white py-4 rounded-lg hover:bg-yellow-600 hover:translate-y-1 hover:shadow-lg transition duration-300 text-center font-bold">
            Register A Supplier or Farmer
          </Link>
          <Link to="/register-cocoa" className="quick-action-btn bg-purple-500 text-white py-4 rounded-lg hover:bg-purple-600 hover:translate-y-1 hover:shadow-lg transition duration-300 text-center font-bold">
            Receive New Batch
          </Link>
          <Link to="/receive-stock" className="quick-action-btn bg-red-500 text-white py-4 rounded-lg hover:bg-red-600 hover:translate-y-1 hover:shadow-lg transition duration-300 text-center font-bold">
            Receive Beans To An Existing Batch
          </Link>
          <Link to="/batch-expense" className="quick-action-btn bg-black text-white py-4 rounded-lg hover:bg-blue-600 hover:translate-y-1 hover:shadow-lg transition duration-300 text-center font-bold">
            Perform Batch Expense
          </Link>
          <Link to="/qccerts" className="quick-action-btn bg-blue-600 text-white py-4 rounded-lg hover:bg-red-600 hover:translate-y-1 hover:shadow-lg transition duration-300 text-center font-bold">
            Upload QC Cert
          </Link>
          <Link to="/create-expense" className="quick-action-btn bg-blue-600 text-white py-4 rounded-lg hover:bg-red-600 hover:translate-y-1 hover:shadow-lg transition duration-300 text-center font-bold">
            Create Misc Expense
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default Home;
