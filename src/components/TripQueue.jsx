import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import DriverStatus from './DriverStatus';

const TripQueue = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'tripsheets'), where('status', '==', 'Pending'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTrips(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Deliveries</h2>
      {trips.map(trip => {
        // Construct the full address string for Maps and Copy
        const fullAddress = `${trip.address}, ${trip.suburb}, ${trip.city || ''}`;
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

        return (
          <div key={trip.id} className="p-4 mb-4 border rounded shadow-md bg-white">
            <p><strong>Waybill:</strong> {trip.waybill}</p>
            <p><strong>Consignee:</strong> {trip.consignee}</p>
            <p className="mb-4"><strong>Address:</strong> {trip.address}, {trip.suburb}</p>
            
            <div className="flex gap-2 mb-4">
              {/* Copy Address Button */}
              <button 
                onClick={() => navigator.clipboard.writeText(fullAddress)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition"
              >
                Copy
              </button>

              {/* Open in Maps Link */}
              <a 
                href={mapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
              >
                Go to Maps
              </a>
            </div>

            <div className="mt-2 border-t pt-2">
              <DriverStatus tripId={trip.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TripQueue;
