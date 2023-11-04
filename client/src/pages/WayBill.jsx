import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const Waybill = () => {
  const [customerName, setCustomerName] = useState('');
  const [portAgentName, setPortAgentName] = useState('');
  const [portAgentAddress, setPortAgentAddress] = useState('');
  const [portAgentContact, setPortAgentContact] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [evacuatedQuantity, setEvacuatedQuantity] = useState('');
  const [evacuatedWeight, setEvacuatedWeight] = useState(''); // New state for evacuatedWeight
  const [drivers, setDrivers] = useState([]); // Define drivers state variable
  const [trucks, setTrucks] = useState([]); // Define trucks state variable
  const [issueDate, setIssueDate] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState('Shipped');

  useEffect(() => {
    // Extract parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const customerNameParam = params.get('customerName');
    const batchNumberParam = params.get('batchNumber');
    const evacuatedQuantityParam = params.get('evacuatedQuantity');
    const evacuatedWeightParam = params.get('evacuatedWeight'); // Extract evacuatedWeight from URL parameters
    const issueDateParam = params.get('issueDate');

    // Set state variables with extracted parameters
    setCustomerName(customerNameParam);
    setBatchNumber(batchNumberParam);
    setEvacuatedQuantity(evacuatedQuantityParam);
    setEvacuatedWeight(evacuatedWeightParam); // Set evacuatedWeight state variable
    setIssueDate(issueDateParam);
  }, []);
  
  const handleWaybillSubmit = (e) => {
    e.preventDefault();
    const waybillData = {
      customerName,
      portAgentName,
      portAgentAddress,
      portAgentContact,
      drivers,
      trucks,
      batchNumber,
      evacuatedQuantity,
      evacuatedWeight, // Include evacuatedWeight in the waybill data
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
        // Redirect to /distribute page with batchNumber as a URL parameter
        window.location.href = `/distribute-profit?batchNumber=${waybillData.batchNumber}`;
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error cases here
        // ...
      });
  };
  const handleDriverChange = (index, e) => {
    const updatedDrivers = [...drivers];
    updatedDrivers[index] = { ...updatedDrivers[index], [e.target.name]: e.target.value };
    setDrivers(updatedDrivers);
  };
  
  const handleTruckChange = (index, e) => {
    const updatedTrucks = [...trucks];
    updatedTrucks[index] = { ...updatedTrucks[index], [e.target.name]: e.target.value };
    setTrucks(updatedTrucks);
  };
  
  const addDriver = () => {
    setDrivers([...drivers, { name: '', address: '', licenseNumber: '' }]);
  };
  const removeDriver = (index) => {
    const updatedDrivers = [...drivers];
    updatedDrivers.splice(index, 1);
    setDrivers(updatedDrivers);
  };
  const addTruck = () => {
    setTrucks([...trucks, { registrationNumber: '', make: '' }]);
  };
  const removeTruck = (index) => {
    const updatedTrucks = [...trucks];
    updatedTrucks.splice(index, 1);
    setTrucks(updatedTrucks);
  };
  const generatePDFReport = (waybillData) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Pador Farms Waybill', 14, 20);
    const tableData = [];
    const tableHeaders = ['Field', 'Value'];
    tableData.push(['Waybill Number', waybillData.wayBillNumber]);
    tableData.push(['Customer Name', waybillData.customerName]);
    tableData.push(['Port Agent Name', waybillData.portAgentName]);
    tableData.push(['Port Agent Address', waybillData.portAgentAddress]);
    tableData.push(['Port Agent Contact', waybillData.portAgentContact]);
    tableData.push(['Batch Number', waybillData.batchNumber]);
    tableData.push(['Evacuated Quantity', waybillData.evacuatedQuantity]);
    tableData.push(['Evacuated Weight(Kg)', waybillData.evacuatedWeight]); // Add Evacuated Weight
    waybillData.drivers.forEach((driver) => {
      tableData.push(['Driver Name', driver.name]);
      tableData.push(['Driver Address', driver.address]);
      tableData.push(['Driver License Number', driver.licenseNumber]);
    });
    waybillData.trucks.forEach((truck) => {
      tableData.push(['Truck Registration Number', truck.registrationNumber]);
      tableData.push(['Truck Make', truck.make]);
    });
    tableData.push(['Issue Date', waybillData.issueDate]);
    tableData.push(['Delivery Status', waybillData.deliveryStatus]);
  
    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 30,
      styles: { fontSize: 12 },
    });
    doc.save('waybill_report.pdf');
  };
  
  
  
  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28 p-8 bg-white shadow-lg rounded-lg">
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
  <label htmlFor="portAgentName" className="block text-sm font-medium text-gray-600">
    Port Agent Name
  </label>
  <input
    type="text"
    id="portAgentName"
    name="portAgentName"
    value={portAgentName}
    onChange={(e) => setPortAgentName(e.target.value)} // Update the state on change
    className="mt-1 p-2 border rounded-md w-full"
  />
</div>
<div className="mb-4">
  <label htmlFor="portAgentAddress" className="block text-sm font-medium text-gray-600">
    Port Agent Address
  </label>
  <input
    type="text"
    id="portAgentAddress"
    name="portAgentAddress"
    value={portAgentAddress}
    onChange={(e) => setPortAgentAddress(e.target.value)} // Update the state on change
    className="mt-1 p-2 border rounded-md w-full"
  />
</div>
<div className="mb-4">
  <label htmlFor="portAgentContact" className="block text-sm font-medium text-gray-600">
    Port Agent Contact
  </label>
  <input
    type="text"
    id="portAgentContact"
    name="portAgentContact"
    value={portAgentContact}
    onChange={(e) => setPortAgentContact(e.target.value)} // Update the state on change
    className="mt-1 p-2 border rounded-md w-full"
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
        <label htmlFor="evacuatedWeight" className="block text-sm font-medium text-gray-600">
          Evacuated Weight (kg)
        </label>
        <input
          type="number"
          id="evacuatedWeight"
          name="evacuatedWeight"
          value={evacuatedWeight}
          onChange={(e) => setEvacuatedWeight(e.target.value)} // Update evacuatedWeight state variable
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>
      {/* Drivers */}

{drivers.map((driver, index) => (
  <div key={index}>
    <h2 className="text-lg font-semibold mb-2">Driver {index + 1}</h2>
    <div className="mb-4">
      <label htmlFor={`driverName-${index}`} className="block text-sm font-medium text-gray-600">
        Driver Name
      </label>
      <input
        type="text"
        id={`driverName-${index}`}
        name={`name`} // Use the name property instead of `driverName-${index}`
        value={driver.name}
        onChange={(e) => handleDriverChange(index, e)}
        className="mt-1 p-2 border rounded-md w-full"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor={`driverAddress-${index}`} className="block text-sm font-medium text-gray-600">
        Driver Address
      </label>
      <input
        type="text"
        id={`driverAddress-${index}`}
        name={`address`} // Use the name property instead of `driverAddress-${index}`
        value={driver.address}
        onChange={(e) => handleDriverChange(index, e)}
        className="mt-1 p-2 border rounded-md w-full"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor={`driverLicenseNumber-${index}`} className="block text-sm font-medium text-gray-600">
        Driver License Number
      </label>
      <input
        type="text"
        id={`driverLicenseNumber-${index}`}
        name={`licenseNumber`} // Use the name property instead of `driverLicenseNumber-${index}`
        value={driver.licenseNumber}
        onChange={(e) => handleDriverChange(index, e)}
        className="mt-1 p-2 border rounded-md w-full"
        required
      />
    </div>
        {index > 0 && (
      <div className="flex items-center mb-2">
        <button
          type="button"
          onClick={() => removeDriver(index)}
          className="text-red-500 hover:text-red-700 mr-2"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <hr className="flex-grow border-t-2 border-gray-300" />
      </div>
    )}

  </div>
))}
<button
  type="button"
  onClick={addDriver}
  className="mb-4 px-1 py-1 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300"
>
  <FontAwesomeIcon icon={faPlus} className="mr-2" />
  Add Driver
</button>



{trucks.map((truck, index) => (
  <div key={index}>
    <h2 className="text-lg font-semibold mb-2">Truck {index + 1}</h2>
    <div className="mb-4">
      <label htmlFor={`truckRegistrationNumber-${index}`} className="block text-sm font-medium text-gray-600">
        Truck Registration Number
      </label>
      <input
        type="text"
        id={`truckRegistrationNumber-${index}`}
        name={`registrationNumber`} // Use the name property instead of `truckRegistrationNumber-${index}`
        value={truck.registrationNumber}
        onChange={(e) => handleTruckChange(index, e)}
        className="mt-1 p-2 border rounded-md w-full"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor={`truckMake-${index}`} className="block text-sm font-medium text-gray-600">
        Truck Make
      </label>
      <input
        type="text"
        id={`truckMake-${index}`}
        name={`make`} // Use the name property instead of `truckMake-${index}`
        value={truck.make}
        onChange={(e) => handleTruckChange(index, e)}
        className="mt-1 p-2 border rounded-md w-full"
        required
      />
    </div>
        {index > 0 && (
      <div className="flex items-center mb-2">
        <button
          type="button"
          onClick={() => removeTruck(index)}
          className="text-red-500 hover:text-red-700 mr-2"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <hr className="flex-grow border-t-2 border-gray-300" />
      </div>
    )}

  </div>
))}
<button
  type="button"
  onClick={addTruck}
  className="mb-4 px-1 py-1 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300"
>
  <FontAwesomeIcon icon={faPlus} className="mr-2" />
  Add Truck
</button>

      {/* Other waybill fields */}
      {/* ... */}
<div className="mb-4">
  <label htmlFor="issueDate" className="block text-sm font-medium text-gray-600">
    Issue Date
  </label>
  <input
    type="date"
    id="issueDate"
    name="issueDate"
    value={issueDate}
    onChange={(e) => setIssueDate(e.target.value)}
    className="mt-1 p-2 border rounded-md w-full"
    required
  />
</div>
<div className="mb-4">
  <label htmlFor="deliveryStatus" className="block text-sm font-medium text-gray-600">
    Delivery Status
  </label>
  <select
    id="deliveryStatus"
    name="deliveryStatus"
    value={deliveryStatus}
    onChange={(e) => setDeliveryStatus(e.target.value)}
    className="mt-1 p-2 border rounded-md w-full"
    required
  >
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
    <option value="In Transit">In Transit</option>
  </select>
</div>
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