import React, { useState, useEffect } from 'react';

const QCCerts = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [batchNumbers, setBatchNumbers] = useState([]); // Initialize batchNumbers state
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/cocoabags')
      .then((response) => response.json())
      .then((data) => {
        
        if (Array.isArray(data)) {
          const fetchedBatchNumbers = data.map((batch) => batch.batchNumber);
          setBatchNumbers(fetchedBatchNumbers);
        } else {
          console.error('Unexpected response structure:', data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  

  const handleBatchNumberChange = (e) => {
    setBatchNumber(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (batchNumber && selectedFile) {
      const formData = new FormData();
      formData.append('batchNumber', batchNumber);
      formData.append('certificate', selectedFile);

      fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Certificate uploaded successfully:', data);
          setMessage('Certificate uploaded successfully!');
          setTimeout(() => {
            window.location.replace('/home');
          }, 2000);
        })
        .catch((error) => {
          console.error('Error uploading certificate:', error);
          setMessage('Error uploading certificate. Please try again.');
        });
    } else {
      setMessage('Please provide both batch number and select a file for upload.');
    }
  };

  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28 p-8 text-center">
      {message && <p className="mt-4 text-green-600">{message}</p>}
      <h1 className="text-2xl font-bold mb-4">Upload QC Certificate </h1>

      <div className="mb-4 mx-auto max-w-xs">
        <label htmlFor="batchNumber" className="block text-sm font-medium text-gray-700 mb-2">
          Batch Number:
        </label>
        <select
          id="batchNumber"
          value={batchNumber}
          onChange={handleBatchNumberChange}
          className="mt-1 p-2 border rounded w-full"
        >
          <option value="" disabled>Select Batch Number</option>
          {batchNumbers.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>

        <label htmlFor="certificate" className="block text-sm font-medium text-gray-700 mt-4 mb-2">
          Select Certificate:
        </label>
        <input type="file" id="certificate" onChange={handleFileChange} className="mt-1 p-2 border rounded w-full" />
      </div>

      <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Upload Certificate
      </button>
    </div>
  );
};

export default QCCerts;
