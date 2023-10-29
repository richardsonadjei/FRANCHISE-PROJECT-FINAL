
import React from 'react';
import { Link } from 'react-router-dom';

const Aside = () => {
  return (
    <aside className="aside-menu bg-gradient-to-b from-blue-500 to-blue-700 text-white w-96 h-screen mb-8 pb-4 overflow-y-auto pl-4 ml-4 pt-16">
      <h2 className="text-2xl font-bold mb-8">Cocoa Business</h2>
      <ul className="space-y-4">
        {/* Dashboard Section */}
        <li>
          <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
          <ul className="ml-4 space-y-2">
            <li>
              <Link to="/overview" className="text-white hover:underline">
                Overview
              </Link>
            </li>
          </ul>
        </li>
        {/* Inventory Management Section */}
        <li>
          <h3 className="text-lg font-semibold mb-1">Inventory Management</h3>
          <ul className="ml-4 space-y-1">
            <li>
              <Link to="/register-cocoa" className="text-white hover:underline">
                Receive New Batch 
              </Link>
            </li>
            <li>
              <Link to="/modify-batch" className="text-white hover:underline">
                Modify Existing Batch
              </Link>
            </li>
            
            <li>
              <Link to="/evacuation" className="text-white hover:underline">
                Perform Evacuation With Invoice
              </Link>
              <br />
              <Link to="/take-stock" className="text-white hover:underline">
                Take Stock
              </Link>
             
            </li>
          </ul>
        </li>
        {/* Sales Management Section */}
        <li>
          <h3 className="text-lg font-semibold mb-2">Sales Management</h3>
          <ul className="ml-4 space-y-2">
            <li>
            <Link to="/create-customer" className="text-white hover:underline">
                Register A Customer
              </Link>
            </li>
            <li>
              <Link to="/manage-orders" className="text-white hover:underline">
                Manage Orders
              </Link>
            </li>
          </ul>
        </li>
        {/* Financial Management Section */}
        <li>
          <h3 className="text-lg font-semibold mb-2">Financial Management</h3>
          <ul className="ml-4 space-y-2">
            <li>
              <Link to="/income" className="text-white hover:underline">
                Income
              </Link>
            </li>
            <li>
              <Link to="/create-expense" className="text-white hover:underline">
                Expenditures
              </Link>
              <li>
              <Link to="/profit-loss" className="text-white hover:underline">
               Profit And Loss
              </Link>
            </li>
            </li>
          </ul>
        </li>
        {/* Reports & Analytics Section */}
        <li>
          <h3 className="text-lg font-semibold mb-2">Reports & Analytics</h3>
          <ul className="ml-4 space-y-2">
            <li>
              <Link to="/partners" className="text-white hover:underline">
                Create A Partner
              </Link>
            </li>
            <li>
              <Link to="/financial-reports" className="text-white hover:underline">
                Financial Reports
              </Link>
            </li>
            <li>
              <Link to="/inventory-reports" className="text-white hover:underline">
                Inventory Reports
              </Link>
            </li>
          </ul>
        </li>
        {/* Settings Section */}
        <li>
          <h3 className="text-lg font-semibold mb-2">Settings</h3>
          <ul className="ml-4 space-y-2">
          <li>
              <Link to="/update-Customer" className="text-white hover:underline">
                Update A Customer
              </Link>
            </li>
            <li>
              <Link to="/expense-category" className="text-white hover:underline">
                Create An Expense Category
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <h3 className="text-lg font-semibold mb-2">Suppliers And Customers</h3>
      <ul className="ml-4 space-y-2">
        <li>
          <Link to="/add-supplier" className="text-white hover:underline">
            Register A Supplier
          </Link>
        </li>
        <li>
          <Link to="/find-supplier" className="text-white hover:underline">
            Search And Update Supplier
          </Link>
        </li>
        <li>
          <Link to="/view-suppliers" className="text-white hover:underline">
            View All Suppliers 
          </Link>
        </li>
        <li>
          <Link to="/create-customer" className="text-white hover:underline">
            Register A Customer
          </Link>
        </li>
        <li>
          <Link to="/partners" className="text-white hover:underline">
            Create A Partner
          </Link>
        </li>
      </ul>
      </li>
      </ul>
    </aside>
  );
};

export default Aside;
