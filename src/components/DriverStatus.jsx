import React from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const DriverStatus = ({ tripId }) => {
  const markAsDone = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const tripRef = doc(db, 'tripsheets', tripId);
        await updateDoc(tripRef, {
          status: 'Done',
          completedAt: new Date().toISOString(),
          location: { lat: latitude, lng: longitude }
        });
        alert('Delivery marked as done!');
      }, (error) => {
        alert('Error getting location: ' + error.message);
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <button 
      onClick={markAsDone}
      className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700"
    >
      Done
    </button>
  );
};

export default DriverStatus;
