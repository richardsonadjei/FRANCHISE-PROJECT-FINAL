import React, { useState } from 'react';

const PartnerIncome = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [partnerIncomes, setPartnerIncomes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const fetchPartnerIncomes = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(`/api/partner-income-report?startDate=${startDate}&endDate=${endDate}`);
      if (response.ok) {
        const data = await response.json();
        setPartnerIncomes(data.partnerIncomes);
      } else {
        throw new Error('Failed to fetch partner incomes');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const generateSummaryReport = () => {
    const partnerSummary = {};
    partnerIncomes.forEach((income) => {
      if (!partnerSummary[income.partnerName]) {
        partnerSummary[income.partnerName] = 0;
      }
      partnerSummary[income.partnerName] += income.incomeAmount;
    });

    return (
      <div className="mx-auto overflow-y-auto max-h-screen mt-28 px-4">
        <h2 className="text-2xl font-semibold mb-4">Summary Report</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="bg-gray-200 border px-4 py-2">Partner Name</th>
              <th className="bg-gray-200 border px-4 py-2">Total Income</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(partnerSummary).map(([partnerName, totalIncome]) => (
              <tr key={partnerName}>
                <td className="border px-4 py-2">{partnerName}</td>
                <td className="border px-4 py-2">{totalIncome.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-8">Partner Income Report</h1>
      <div className="flex space-x-4 mb-4">
        <input
          type="date"
          className="border rounded py-2 px-4"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <input
          type="date"
          className="border rounded py-2 px-4"
          value={endDate}
          onChange={handleEndDateChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchPartnerIncomes}
        >
          Fetch Partner Incomes
        </button>
      </div>
      {isFetching && <p className="text-xl font-semibold mb-4">Fetching data...</p>}
      {partnerIncomes.length > 0 && (
        <>
          <table className="min-w-full border-collapse border border-gray-300 mb-8">
            <thead>
              <tr>
                <th className="bg-gray-200 border px-4 py-2">Partner Name</th>
                <th className="bg-gray-200 border px-4 py-2">Batch Number</th>
                <th className="bg-gray-200 border px-4 py-2">Income Amount</th>
                <th className="bg-gray-200 border px-4 py-2">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {partnerIncomes.map((income) => (
                <tr key={income._id}>
                  <td className="border px-4 py-2">{income.partnerName}</td>
                  <td className="border px-4 py-2">{income.batchNumber}</td>
                  <td className="border px-4 py-2">{income.incomeAmount.toFixed(2)}</td>
                  <td className="border px-4 py-2">{income.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {generateSummaryReport()}
        </>
      )}
      {!isFetching && partnerIncomes.length === 0 && <p className="text-xl font-semibold">No data available</p>}
    </div>
  );
};

export default PartnerIncome;
