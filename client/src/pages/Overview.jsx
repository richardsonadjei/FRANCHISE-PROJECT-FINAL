import React from 'react';

const OverviewPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-500 to-indigo-600 text-white p-4 mt-28 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">
        <span className="text-pink-500">Pador</span> 
        <span className="text-blue-400">Farms &nbsp;</span> 
        <span className="text-orange-500">Warehouse</span>
      </h1>
      
      <div className="flex flex-col gap-4">
        <div className="p-4 md:p-8 bg-white rounded-lg shadow-lg text-center transform transition duration-300 hover:shadow-xl hover:scale-105">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">View Gallery Of Activities</h2>
          <p className="text-gray-600 mb-4 md:mb-6">Get to know what has been done within the period in pictures.</p>
          <a href="/buy" className="bg-indigo-600 text-white py-2 px-4 md:py-2 md:px-6 rounded-full hover:bg-indigo-700 transition duration-300 inline-block">Explore</a>
        </div>
        
        <div className="p-4 md:p-8 bg-white rounded-lg shadow-lg text-center transform transition duration-300 hover:shadow-xl hover:scale-105">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">To-Do-List</h2>
          <p className="text-gray-600 mb-4 md:mb-6">View pending list of activities for the year.</p>
          <a href="/tasks" className="bg-indigo-600 text-white py-2 px-4 md:py-2 md:px-6 rounded-full hover:bg-indigo-700 transition duration-300 inline-block">Pending Activities</a>
        </div>
      </div>
      
      <footer className="mt-8 md:mt-20 text-gray-400 text-center py-2 md:py-4">
        <p>&copy; {new Date().getFullYear()} Pador Farms Warehouse. All rights reserved. Built By..@Ajar.</p>
      </footer>
    </div>
  );
};

export default OverviewPage;
