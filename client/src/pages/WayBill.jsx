
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Waybill = () => {
  const [customerName, setCustomerName] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [evacuatedQuantity, setEvacuatedQuantity] = useState('');
  const [waybillNumber, setWaybillNumber] = useState('');
  const [totalWeight, setTotalWeight] = useState('');
  const [issueDate, setIssueDate] = useState('');

  useEffect(() => {
    // Extract batchNumber, evacuatedQuantity, customerName, waybillNumber, totalWeight, and issueDate from URL parameters
    const params = new URLSearchParams(window.location.search);
    const batchNumberParam = params.get('batchNumber');
    const evacuatedQuantityParam = params.get('evacuatedQuantity');
    const customerNameParam = params.get('customerName');
    const waybillNumberParam = params.get('waybillNumber');
    const totalWeightParam = params.get('totalWeight');
    const issueDateParam = params.get('issueDate');

    if (batchNumberParam && evacuatedQuantityParam && customerNameParam) {
      setBatchNumber(batchNumberParam);
      setEvacuatedQuantity(evacuatedQuantityParam);
      setCustomerName(customerNameParam);
      setWaybillNumber(waybillNumberParam);
      setTotalWeight(totalWeightParam);
      setIssueDate(issueDateParam);
    }
  }, []);

  const handleWaybillSubmit = (e) => {
    e.preventDefault();
    const waybillData = {
      customerName,
      batchNumber,
      evacuatedQuantity,
      recipientName: e.target.recipientName.value,
      recipientAddress: e.target.recipientAddress.value,
      driversName: e.target.driversName.value,
      driversAddress: e.target.driversAddress.value,
    };

    fetch('/api/waybill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(waybillData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Show success alert
        alert('Waybill created successfully');
        // Generate and download PDF report
        generatePDFReport(data.waybill);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error cases here
        // ...
      });
  };

  const generatePDFReport = (waybillData) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Pador Farms Waybill', 14, 20);
    const tableData = [];
    const tableHeaders = ['Field', 'Value'];
    tableData.push(['Customer Name', waybillData.customerName]);
    tableData.push(['Batch Number', waybillData.batchNumber]);
    tableData.push(['Evacuated Quantity', waybillData.evacuatedQuantity]);
    tableData.push(['Recipient Name', waybillData.recipientName]);
    tableData.push(['Recipient Address', waybillData.recipientAddress]);
    tableData.push(['Driver\'s Name', waybillData.driversName]);
    tableData.push(['Driver\'s Address', waybillData.driversAddress]);
    tableData.push(['Waybill Number', waybillData.wayBillNumber]);
    tableData.push(['Total Weight(Tonnes)', waybillData.totalWeight]);
    tableData.push(['Issue Date', waybillData.issueDate]);
    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 30,
      styles: { fontSize: 12 },
    });
    doc.save('waybill_report.pdf');
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6">Waybill</h1>
      <form onSubmit={handleWaybillSubmit}>
        <div className="mb-4">
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-600">
            Customer Name
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={customerName}
            className="mt-1 p-2 border rounded-md w-full"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="batchNumber" className="block text-sm font-medium text-gray-600">
            Batch Number
          </label>
          <input
            type="text"
            id="batchNumber"
            name="batchNumber"
            value={batchNumber}
            className="mt-1 p-2 border rounded-md w-full"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="evacuatedQuantity" className="block text-sm font-medium text-gray-600">
            Evacuated Quantity
          </label>
          <input
            type="number"
            id="evacuatedQuantity"
            name="evacuatedQuantity"
            value={evacuatedQuantity}
            className="mt-1 p-2 border rounded-md w-full"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="recipientName" className="block text-sm font-medium text-gray-600">
            Recipient Name
          </label>
          <input
            type="text"
            id="recipientName"
            name="recipientName"
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-600">
            Recipient Address
          </label>
          <input
            type="text"
            id="recipientAddress"
            name="recipientAddress"
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="driversName" className="block text-sm font-medium text-gray-600">
            Driver's Name
          </label>
          <input
            type="text"
            id="driversName"
            name="driversName"
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="driversAddress" className="block text-sm font-medium text-gray-600">
            Driver's Address
          </label>
          <input
            type="text"
            id="driversAddress"
            name="driversAddress"
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        {/* Add other waybill fields here */}
        {/* ... */}
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Submit Waybill
        </button>
      </form>
    </div>
  );
};

export default Waybill;