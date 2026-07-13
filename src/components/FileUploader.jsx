import React, { useState } from 'react';
import Papa from 'papaparse';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const FileUploader = () => {
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    Papa.parse(uploadedFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const data = results.data;
        for (const row of data) {
          await addDoc(collection(db, 'tripsheets'), {
            waybill: row.Waybill,
            consignee: row.Receiver,
            address: row.DestAdd1,
            suburb: row.DestAdd2,
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
