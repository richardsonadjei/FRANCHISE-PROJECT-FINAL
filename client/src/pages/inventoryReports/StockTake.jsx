import React, { useState, useEffect } from 'react';


const StockTake = () => {
  const [batches, setBatches] = useState([]); // State for storing batches from the API
  const [initialQuantities, setInitialQuantities] = useState({}); // State for storing initial quantities from the API
  const [physicalQuantities, setPhysicalQuantities] = useState({}); // State for physical quantities entered by the user
  const [batchDifferences, setBatchDifferences] = useState([]); // State for storing calculated stock differences

  // Fetch batches from the API when the component mounts
  useEffect(() => {
    // Replace the URL with your API endpoint for fetching batches
    fetch('/api/cocoabags')
      .then((response) => response.json())
      .then((data) => {
        // Organize the API response into an object with batchNumber as key and quantity as value
        const initialQuantitiesObject = data.reduce((acc, batch) => {
          acc[batch.batchNumber] = batch.quantity;
          return acc;
        }, {});
        setBatches(data); // Set batches for rendering
        setInitialQuantities(initialQuantitiesObject); // Set initial quantities from the API
      })
      .catch((error) => console.error('Error fetching batches:', error));
  }, []);

  const handlePhysicalQuantityChange = (batchNumber, value) => {
    setPhysicalQuantities({
      ...physicalQuantities,
      [batchNumber]: parseInt(value, 10),
    });
  };

  const handleStockTake = () => {
    // Calculate stock differences based on initial quantities and physical quantities entered by the user
    const differences = Object.keys(physicalQuantities).map((batchNumber) => {
      const initialQuantity = initialQuantities[batchNumber] || 0;
      const physicalQuantity = physicalQuantities[batchNumber] || 0;
      return {
        batchNumber,
        stockDifference: physicalQuantity - initialQuantity, 
      };
    });
    setBatchDifferences(differences);
  };

  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Stock Take</h1>
      {/* Batches form in a centered and styled table */}
      <table className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2">Batch Number</th>
            <th className="py-2">Product Quantity</th>
            <th className="py-2">Physical Quantity</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => (
            <tr key={batch.batchNumber} className="border-b">
              <td className="py-2 px-4">{batch.batchNumber}</td>
              <td className="py-2 px-4">{initialQuantities[batch.batchNumber] || 0}</td>
              <td className="py-2 px-4">
                <input
                  type="number"
                  className="w-16 py-1 px-2 rounded border"
                  value={physicalQuantities[batch.batchNumber] || ''}
                  onChange={(e) => handlePhysicalQuantityChange(batch.batchNumber, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Button to perform stock take */}
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 mb-8" onClick={handleStockTake}>
        Perform Stock Take
      </button>
      {/* Display stock differences */}
      {batchDifferences.length > 0 && (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <h2 className="bg-green-500 text-white text-lg font-bold py-2 px-4">Stock Differences</h2>
          <ul>
            {batchDifferences.map((difference) => (
              <li
                key={difference.batchNumber}
                className={`py-2 px-4 ${
                  difference.stockDifference < 0 ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {`Batch Number: ${difference.batchNumber} - Stock Difference: ${difference.stockDifference}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StockTake;
