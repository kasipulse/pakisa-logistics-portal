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
      {trips.map(trip => (
        <div key={trip.id} className="p-4 mb-2 border rounded shadow-sm bg-white">
          <p><strong>Waybill:</strong> {trip.waybill}</p>
          <p><strong>Consignee:</strong> {trip.consignee}</p>
          <p><strong>Address:</strong> {trip.address}, {trip.suburb}</p>
          <div className="mt-2">
            <DriverStatus tripId={trip.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripQueue;
