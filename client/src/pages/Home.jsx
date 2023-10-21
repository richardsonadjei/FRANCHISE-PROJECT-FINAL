
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex h-screen bg-black pt-16 mt-2">
      {/* Content */}
      <div className="flex flex-wrap flex-grow p-8">
        {/* Welcome Section */}
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 w-96 md:w-1/2 mb-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Welcome to Cocoa Warehouse, {currentUser ? currentUser.username : 'Guest'}!
          </h2>
          <p className="text-lg">
            Greet the user and provide a brief overview of the business and its mission. The mission of Pador Farms is to grow to be a major cocoa buying company at the district, regional, national, and global stages. We aim to provide high-quality cocoa products and contribute to the sustainable growth of the cocoa industry.
          </p>
        </section>
        {/* Quick Actions */}
        <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-8 w-full md:w-1/2 mb-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/receive-beans" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Receive Beans Into Warehouse
            </Link>
            <Link to="/evacuation-invoice" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
              Perform Evacuation With Invoice
            </Link>
            <Link to="/update-batch" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Update Existing Batch
            </Link>
            <Link to="/add-supplier" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Add A New Supplier/Farmer
            </Link>
            <Link to="/view-batches" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700">
              View All Batches In Stock
            </Link>
            <Link to="/register-cocoa" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Receive New Batch
            </Link>
          </div>
        </section>
        {/* Statistics Overview */}
        <section className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 w-full md:w-1/3 mb-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Statistics Overview</h2>
          {/* Display key statistics such as total cocoa bags, total sales, current revenue, recent transactions, etc. */}
          {/* Example: */}
          <p>Total Cocoa Bags: 1000</p>
          <p>Total Sales: $5000</p>
          {/* Add more statistics here */}
        </section>
        {/* Inventory Summary */}
        <section className="bg-gradient-to-r from-pink-400 to-red-500 text-white p-8 w-full md:w-1/3 mb-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Inventory Summary</h2>
          {/* Show a summary of current inventory status including quantity, quality, and expiration dates. */}
          {/* Example: */}
          <p>Quantity: 500 bags</p>
          <p>Quality: Premium Grade</p>
          {/* Add more inventory details here */}
        </section>
        {/* Recent Transactions */}
        <section className="bg-gradient-to-r from-purple-400 to-pink-500 text-white p-8 w-full md:w-1/3 mb-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
          {/* Display a list of recent transactions including new inventory received and customer orders fulfilled. */}
          {/* Example: */}
          <ul>
            <li>New Inventory Received - 50 bags</li>
            <li>Order Fulfilled - Customer Name, Date</li>
            {/* Add more transaction details here */}
          </ul>
        </section>
        {/* Financial Snapshot */}
        <section className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white p-8 w-full md:w-1/2 mb-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Financial Snapshot</h2>
          {/* Present an overview of the financial status including income, expenditures, and overall profit/loss. */}
          {/* Example: */}
          <p>Income: $7000</p>
          <p>Expenditures: $2000</p>
          <p>Profit/Loss: $5000</p>
          {/* Add more financial details here */}
        </section>
        {/* Upcoming Tasks */}
        <section className="bg-gradient-to-r from-yellow-500 to-green-500 text-white p-8 w-full md:w-1/2 mb-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Upcoming Tasks</h2>
          {/* Highlight upcoming tasks such as scheduled deliveries, pending invoices, or low inventory alerts. */}
          {/* Example: */}
          <ul>
            <li>Scheduled Deliveries: Tomorrow, Customer Name</li>
            <li>Pending Invoices: 2 invoices to be sent</li>
            {/* Add more upcoming tasks here */}
          </ul>
        </section>
        {/* Graphs and Charts */}
        <section className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white p-8 w-full mb-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Graphs and Charts</h2>
          {/* Display graphs and charts to visualize data (e.g., sales trends, inventory levels over time, financial performance). */}
          {/* Example: */}
          {/* You can use charting libraries like Chart.js or D3.js to create interactive graphs */}
        </section>
      </div>
    </div>
  );
};

export default HomePage;