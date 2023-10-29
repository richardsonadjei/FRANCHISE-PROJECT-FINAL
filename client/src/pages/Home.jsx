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
    const interval = setInterval(fetchInventorySummary, 60000); // Fetch every 60 seconds

    return () => clearInterval(interval);
  }, []);

  
  const [financialData, setFinancialData] = useState({
    totalIncome: 0,
    totalExpenditures: 0,
    profitLoss: 0,
  });

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const response = await fetch('/api/financial-snapshot');
        const data = await response.json();
        setFinancialData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFinancialData();
    const interval = setInterval(fetchFinancialData, 1000); // Fetch every second

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <section className="bg-blue-500 text-white p-8 rounded-lg shadow-lg mb-4 text-center hover:shadow-2xl transition duration-300">
        <h2 className="text-3xl font-bold mb-4 animate__animated animate__fadeIn">
          Welcome to Pador Farms, {currentUser ? currentUser.username : 'Guest'}!
        </h2>
        <p className="text-lg">
          The mission of Pador Farms is to grow to be a major cocoa buying company at the district, regional, national, and global stages. We aim to provide high-quality cocoa products and contribute to the sustainable growth of the cocoa industry.
        </p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        <Link
          to="/evacuation"
          className="quick-action-btn bg-green-500 text-white py-4 rounded-lg hover:bg-green-600 transition duration-300 flex justify-center items-center"
        >
          Perform Evacuation With Invoice
        </Link>
        <Link
          to="/modify-batch"
          className="quick-action-btn bg-indigo-500 text-white py-4 rounded-lg hover:bg-indigo-600 transition duration-300 flex justify-center items-center"
        >
          Modify An Existing Batch
        </Link>
        <Link
          to="/add-supplier"
          className="quick-action-btn bg-yellow-500 text-white py-4 rounded-lg hover:bg-yellow-600 transition duration-300 flex justify-center items-center"
        >
          Add A New Supplier/Farmer
        </Link>
        <Link
          to="/register-cocoa"
          className="quick-action-btn bg-purple-500 text-white py-4 rounded-lg hover:bg-purple-600 transition duration-300 flex justify-center items-center"
        >
          Receive New Batch
        </Link>
        <Link
          to="/receive-stock"
          className="quick-action-btn bg-red-500 text-white py-4 rounded-lg hover:bg-red-600 transition duration-300 flex justify-center items-center"
        >
          Receive Beans To An Existing Batch
        </Link>
        <Link
          to="/upcoming-task"
          className="quick-action-btn bg-black text-white py-4 rounded-lg hover:bg-blue-600 transition duration-300 flex justify-center items-center"
        >
          Add A New Upcoming Tasks
        </Link>
        <Link
          to="/pending-payment"
          className="quick-action-btn bg-blue-600 text-white py-4 rounded-lg hover:bg-red-600 transition duration-300 flex justify-center items-center"
        >
          Pending Payments
        </Link>
        <Link
          to="/create-expense"
          className="quick-action-btn bg-blue-600 text-white py-4 rounded-lg hover:bg-red-600 transition duration-300 flex justify-center items-center"
        >
          Create Expense
        </Link>

      </section>
      <section className="bg-teal-500 text-white p-8 rounded-lg shadow-lg mb-4 animate__animated animate__fadeIn text-center hover:shadow-2xl transition duration-300">
        <h2 className="text-2xl font-bold mb-4 ">Inventory Summary</h2>
        <p>Quantity: {inventorySummary.totalQuantity} bags</p>
        <p>Total Cost Of Beans Bought: Ghc{inventorySummary.totalValue}</p>
      </section>
      <section className="bg-green-500 text-white p-8 rounded-lg shadow-lg mb-4 animate__animated animate__fadeIn text-center hover:shadow-2xl transition duration-300">
      <h2 className="text-2xl font-bold mb-4">Financial Snapshot</h2>
      <p>Income: Ghc{financialData.totalIncome}</p>
      <p>Expenditures: Ghc{financialData.totalCombinedExpenses}</p>

      <p>Profit/Loss: Ghc{financialData.profitLoss}</p>
    </section>
      <section className="bg-yellow-500 text-white p-8 rounded-lg shadow-lg mb-4 animate__animated animate__fadeIn text-center hover:shadow-2xl transition duration-300">
        <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
        <ul>
          <li className="mb-2">New Inventory Received - 50 bags</li>
          <li>Order Fulfilled - Customer Name, Date</li>
        </ul>
      </section>
      
      <section className="bg-red-500 text-white p-8 rounded-lg shadow-lg animate__animated animate__fadeIn hover:shadow-2xl transition duration-300">
        <h2 className="text-2xl font-bold mb-4">Upcoming Tasks</h2>
        <ul>
          <li className="mb-2">Scheduled Deliveries: Tomorrow, Customer Name</li>
          <li>Pending Invoices: 2 invoices to be sent</li>
        </ul>
      </section>
      
    </div>
  );
};

export default HomePage;