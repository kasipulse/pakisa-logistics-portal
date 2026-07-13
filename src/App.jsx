import React from 'react';
import FileUploader from './components/FileUploader';
import TripQueue from './components/TripQueue';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Pakisa Logistics Portal</h1>
      
      {/* Admin Section: Use this to upload your daily CSV */}
      <FileUploader />
      
      {/* Driver Section: Shows the queue of waybills */}
      <div className="mt-8">
        <TripQueue />
      </div>
    </div>
  );
}

export default App;
