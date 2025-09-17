import './GroundVenueDetails.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from 'lucide-react';
import gameImg from '../../assets/Venues/gamelogo.png';

const GroundVenueDetails = ({ setIsLoading }) => {
  const { id } = useParams(); // Assuming dynamic route like /venue/:id
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://playdatesport.com/api/Tournament/tournaments/');
        const data = await response.json();
        const selectedVenue = data.find((item) => item.id.toString() === id);
        setVenue(selectedVenue);
      } catch (error) {
        console.error('Error fetching venue details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenueDetails();
  }, [id]);

  if (!venue) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading venue details...</p>;
  }

  return (
    <div className="match-schedule-container">
      <div className="top-section">
        <img src={gameImg} alt="Game Logo" />
        <div className="details-section">
          <div className="details-header">
            <div>
              <h1>{venue.organizer || 'Unknown Organizer'}</h1>
              <p className="game-name">{venue.sport_name || 'Sport'}</p>
            </div>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.venue || '')}`} target="_blank" rel="noreferrer" className="get-directions">
              Get Directions <span className="nav-icon-bg"><Navigation size={14} /></span>
            </a>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>About</h2>
        <p>{venue.description || 'No description available.'}</p>
      </div>

      <div className="section">
        <h2>Slot Time</h2>
        <p>{venue.slot_time || 'Not specified'}</p>
      </div>

      <div className="section">
        <h2>Amenities</h2>
        <p>{venue.amenities || 'General amenities available.'}</p>
      </div>

      <div className="section">
        <h2>Location</h2>
        <p>{venue.venue || 'Venue not available'}</p>
      </div>

      <div className="section">
        <h2>Ground Timings</h2>
        <p>{venue.ground_timings || '6:00 AM - 10:00 PM Daily'}</p>
      </div>

    </div>
  );
};

export default GroundVenueDetails;
