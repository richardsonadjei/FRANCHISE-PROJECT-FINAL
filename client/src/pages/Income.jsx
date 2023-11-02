import React, { useState, useEffect } from 'react';

const Income = () => {
  const [source, setSource] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [evacuatedQuantity, setEvacuatedQuantity] = useState('');
  const [evacuatedWeight, setEvacuatedWeight] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bankTransactionDetails, setBankTransactionDetails] = useState({
    bankName: '',
    paidInBy: '',
    accountNumber: '',
    transactionId: '',
  });
  const [customerName, setCustomerName] = useState('');
  const [description, setDescription] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Extract batchNumber, evacuatedQuantity, and evacuatedWeight from URL parameters
    const params = new URLSearchParams(window.location.search);
    const batchNumberParam = params.get('batchNumber');
    const evacuatedQuantityParam = params.get('evacuatedQuantity');
    const evacuatedWeightParam = params.get('evacuatedWeight');
    const customerNameParam = params.get('customerName');

    if (batchNumberParam && evacuatedQuantityParam && customerNameParam && evacuatedWeightParam) {
      setBatchNumber(batchNumberParam);
      setEvacuatedQuantity(evacuatedQuantityParam);
      setEvacuatedWeight(evacuatedWeightParam);
      setCustomerName(customerNameParam);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'bankName' || name === 'paidInBy' || name === 'accountNumber' || name === 'transactionId') {
      setBankTransactionDetails({ ...bankTransactionDetails, [name]: value });
    } else {
      switch (name) {
        case 'source':
          setSource(value);
          break;
        case 'batchNumber':
          setBatchNumber(value);
          break;
        case 'evacuatedQuantity':
          setEvacuatedQuantity(value);
          break;
        case 'evacuatedWeight':
          setEvacuatedWeight(value);
          break;
        case 'paymentMethod':
          setPaymentMethod(value);
          break;
        case 'customerName':
          setCustomerName(value);
          break;
        case 'description':
          setDescription(value);
          break;
        default:
          break;
      }
    }
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const incomeData = {
      source,
      batchNumber,
      evacuatedQuantity: parseInt(evacuatedQuantity),
      evacuatedWeight: parseFloat(evacuatedWeight),
      paymentMethod,
      bankTransactionDetails,
      customerName,
      description,
      paymentStatus,
    };

    // Perform income logic here using incomeData state
    fetch('/api/income', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(incomeData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        // Assume the income is successful
        alert('Income recorded successfully');
        // Reset form fields
        setSource('');
        setBatchNumber('');
        setEvacuatedQuantity('');
        setEvacuatedWeight('');
        setPaymentMethod('');
        setBankTransactionDetails({
          bankName: '',
          paidInBy: '',
          accountNumber: '',
          transactionId: '',
        });
        setCustomerName('');
        setDescription('');
        setPaymentStatus('Pending');
        // Redirect to waybill page with batchNumber, evacuatedQuantity, and evacuatedWeight as URL parameters
        window.location.href = `/waybill?batchNumber=${batchNumber}&evacuatedQuantity=${evacuatedQuantity}&evacuatedWeight=${evacuatedWeight}&customerName=${customerName}`;
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error:', error);
        // Handle error cases here
        // ...
      });
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6">Income Form</h1>
      <form onSubmit={handleIncomeSubmit}>
        <div className="mb-4">
          <label htmlFor="source" className="block text-sm font-medium text-gray-600">
            Source
          </label>
          <input
            type="text"
            id="source"
            name="source"
            value={source}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
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
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
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
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
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
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-600">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          >
            <option value="" disabled>Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transaction">Bank Transaction</option>
          </select>
        </div>
        {paymentMethod === 'Bank Transaction' && (
          <div>
            <div className="mb-4">
              <label htmlFor="bankName" className="block text-sm font-medium text-gray-600">
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={bankTransactionDetails.bankName}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="paidInBy" className="block text-sm font-medium text-gray-600">
                Paid In By
              </label>
              <input
                type="text"
                id="paidInBy"
                name="paidInBy"
                value={bankTransactionDetails.paidInBy}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-600">
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={bankTransactionDetails.accountNumber}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="transactionId" className="block text-sm font-medium text-gray-600">
                Transaction ID
              </label>
              <input
                type="text"
                id="transactionId"
                name="transactionId"
                value={bankTransactionDetails.transactionId}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-600">
            Customer Name
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={customerName}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-600">
            Payment Status
          </label>
          <select
            id="paymentStatus"
            name="paymentStatus"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)} 
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Income;
