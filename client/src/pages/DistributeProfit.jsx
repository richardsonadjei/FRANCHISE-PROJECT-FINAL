import React, { useState, useEffect } from 'react';

const DistributeProfit = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Extract batchNumber from the URL parameter
    const params = new URLSearchParams(window.location.search);
    const batchNumberParam = params.get('batchNumber');

    // Set batchNumber state variable with the extracted value
    setBatchNumber(batchNumberParam);
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  const handleBatchNumberChange = (e) => {
    setBatchNumber(e.target.value);
  };

  const distributeProfit = async () => {
    try {
      const response = await fetch(`/api/partner-income/${batchNumber}`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
         // Wait for 3 seconds before redirecting to the home page
      setTimeout(() => {
        window.location.href = '/home';
      }, 3000); // 3000 milliseconds = 3 seconds
      } else {
        setMessage('Failed to distribute profit. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to distribute profit. Please try again.');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Distribute Profit for Batch</h1>
      <div className="flex items-center mb-4">
        <label className="mr-2">Batch Number:</label>
        <input
          type="text"
          value={batchNumber}
          onChange={handleBatchNumberChange}
          className="border rounded px-2 py-1"
        />
      </div>
      <button onClick={distributeProfit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Distribute Profit
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default DistributeProfit;
