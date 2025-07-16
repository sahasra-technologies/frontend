import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ThemeContext } from '../../context/ThemeContext';
import './TournamentsPage.css';
import axios from 'axios';
import Header from "@/components/Header";

const TournamentPage = ({ setIsLoading }) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const [tournamentData, setTournamentData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [webSocketLoading, setWebSocketLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setWebSocketLoading(true);
        setIsLoading(false);
        const response = await axios.get("https://playdatesport.com/api/Tournament/tournaments/");
        console.log("Response data:", response.data);
        setTournamentData(response.data)
        setWebSocketLoading(false);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching tournaments:", err);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

    

  let ws;

//   useEffect(() => {
//   connectWebSocket();
// }, []);


  // const connectWebSocket = () => {
  //   setWebSocketLoading(true);
  //   setIsLoading(true);

  //   ws = new WebSocket('ws://157.173.195.249:8000/tournaments');

  //   ws.onopen = () => {
      
  //     setWebSocketLoading(false);
  //   };

  //   ws.onmessage = (event) => {
  //     setIsLoading(true);
  //     try {
  //       const payload = JSON.parse(event.data);
       
  //       handleWebSocketAction(payload);
  //     } catch (error) {
  //       console.error('❌ Failed to parse WebSocket data:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   ws.onerror = (error) => {
  //     console.error('❌ WebSocket error:', error);
  //     setWebSocketLoading(false);
  //     setIsLoading(false);
  //   };

  //   ws.onclose = (e) => {
      
  //     setTimeout(connectWebSocket, 3000);
  //   };
  // };

  // const handleWebSocketAction = (message) => {
  //   switch (message.action) {
  //     case 'initial':
  //       if (Array.isArray(message.data)) {
  //         setTournamentData(message.data);
  //       }
  //       break;

  //     case 'create':
  //       setTournamentData((prev) => [...prev, message.data]);
  //       break;

  //     case 'update':
  //       setTournamentData((prev) =>
  //         prev.map((item) =>
  //           item.id === message.data.id ? { ...item, ...message.data } : item
  //         )
  //       );
  //       break;

  //     case 'delete':
  //       setTournamentData((prev) =>
  //         prev.filter((item) => item.id !== message.data.id)
  //       );
  //       break;

  //     default:
  //       console.warn('⚠️ Unhandled WebSocket action:', message.action);
  //   }
  // };

  const handleCardClick = (gameId, status) => {
    navigate(`/tournaments/${gameId}`, { state: { status } });
  };

  const handleAddPlayer = () => {
    navigate("/add-team");
  };

 useEffect(() => {
  const token = Cookies.get('access');
  setIsAuthenticated(!!token);
}, []);



  return (
    <div className={`main-container ${theme}`}>
      <div className="header-container">
        <h1 className="main-heading">
          Released <span>Tournaments</span>
        </h1>
        {isAuthenticated && (
        <button className="add-team-button" onClick={handleAddPlayer}>
          Your Team
        </button>
)}
      </div>

      <div className="tournament-container">
        <h1 className="sub-heading">PICK YOUR GAME</h1>
        {/* <p className="sub-title">PICK YOUR GAME</p> */}

        {webSocketLoading && <p>Connecting to server...</p>}

        <div className="game-grid">
          {tournamentData.length > 0 ? (
            tournamentData.map((game) => (
              <div
                key={game.id}
                className="game-card"
                onClick={() => handleCardClick(game.id, game.status)}
              >
                <img
                  src={game.images?.main_image || '/default.jpg'}
                  alt={game.name}
                />
                <div className="overlay-text">{game.name}</div>
              </div>
            ))
          ) : (
            <p>No tournaments available right now.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentPage;
