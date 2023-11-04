import React, { useState } from 'react';

const QCCerts = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('certificate', selectedFile);

      fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Certificate uploaded successfully:', data);
          // Handle successful upload, e.g., show a success message to the user
        })
        .catch((error) => {
          console.error('Error uploading certificate:', error);
          // Handle error cases, e.g., show an error message to the user
        });
    } else {
      // Handle the case where no file is selected
      console.error('No file selected for upload');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Upload QC Certificates</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Certificate:</label>
        <input type="file" onChange={handleFileChange} className="mt-1" />
      </div>

      <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Upload Certificate
      </button>
    </div>
  );
};

export default QCCerts;
