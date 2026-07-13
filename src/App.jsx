// Inside App.jsx or your Dashboard component
import TripQueue from './components/TripQueue';
import DriverStatus from './components/DriverStatus';

// When mapping through your trips:
{trips.map(trip => (
  <div key={trip.id}>
    <p>{trip.waybill}</p>
    <DriverStatus tripId={trip.id} />
  </div>
))}
