# I will create a template for the FileUploader.jsx component
# This component will handle CSV parsing and uploading to Firebase Firestore.

uploader_component = """
import React, { useState } from 'react';
import Papa from 'papaparse';
import { db } from '../firebase'; // Ensure you have firebase.js configured
import { collection, addDoc } from 'firebase/firestore';

const FileUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    Papa.parse(uploadedFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const data = results.data;
        // Upload each row to Firestore 'tripsheets' collection
        for (const row of data) {
          await addDoc(collection(db, 'tripsheets'), {
            waybill: row.Waybill,
            consignee: row.Receiver,
            address: row.DestAdd1,
            status: 'Pending',
            createdAt: new Date()
          });
        }
        alert('Trip sheet uploaded successfully!');
      },
    });
  };

  return (
    <div className="p-4 border-2 border-dashed rounded-lg">
      <h2 className="text-xl font-bold mb-4">Upload Daily Trip Sheet</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUploader;
"""

print(uploader_component)
