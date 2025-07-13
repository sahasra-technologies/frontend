import React, { useContext, useState, useEffect } from 'react';
import './VenueDetails.css';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { useGame } from '../../context/GameContext';
import { Navigation, ArrowLeft, Cookie } from 'lucide-react';
import gameImg from '../../assets/Venues/gamelogo.png';
//import {Orders, UpdateTrans, GetBookings} from '../../api/service';
import Cookies from 'js-cookie'; 
import axios from 'axios';
// import { notification } from 'antd';
import TournamentRules from './TournamentRules';
import { toast } from 'react-toastify';



const API_URL = 'https://playdatesport.com/api/Tournament/teams/';

const VenueDetails = ({setIsLoading}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const locate = useLocation();
  const { theme } = useContext(ThemeContext);
  const { ground, game } = useGame();
  const { status, id: tournamentId } = locate.state
  console.log("Venue status", status, id, tournamentId)

  const user = true;

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tournament: game?.ground?.[0]?.name || '',
    email: '',
    team: '',
    price: game?.ground?.[0]?.pricing?.flatMap(p => p.times?.map(t => t.price) || []) || [],
  });

  const [tournamentName, setTournamentName] = useState('');
  const [teams, setTeams] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fetchedGround, setFetchedGround] = useState(null);
  const ACCESS_TOKEN = Cookies.get('access');
  const userId = Cookies.get('userId');


  useEffect(() => {
  const fetchGroundById = async () => {
    if (!ground && id) {
      try {
        const response = await axios.get(`https://playdatesport.com/api/Grounds/ground_info/`, {
          params: { id },
        });

        if (response.data) {
          setFetchedGround(response.data); // Save in fallback state
        }
      } catch (error) {
        console.error('Error fetching ground by ID:', error);
      }
    }
  };

  fetchGroundById();
}, [ground, id]);

  
  useEffect(()=>{
    const useEmail = Cookies.get('email')
      if(useEmail){
        setFormData((prev) => ({ ...prev, email: useEmail }))
        setIsAuthenticated(true)
      }
    
  },[])

 useEffect(() => {
  const fetchTeams = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

   const token = Cookies.get('access');
   const userId = Cookies.get('userId')
  
    try {
      const response = await axios.get(API_URL, { 
        params: { id: userId },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      const data = response.data; 
      
      
      const teamsData = data.map(item => item.team);
      setTeams(teamsData);
      console.log("data", teamsData)
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  fetchTeams();
}, [user, navigate]);

 


  useEffect(() => {
    if (game?.id && game?.name) {
      setFormData(prev => ({ ...prev, tournament: game.name }));
      setTournamentName(game.name);
    }
  }, [game]);

  const handleBack = () => navigate(-1);
  console.log("formData",game, ground)
 
  const handleBooking = () => {
    
    if (user) {
        // setShowForm(true);
        navigate(`/venue/${id}/register`, {
          state: {
            tournamentId,
            tournamentName: formData.tournament,
            price: formData.price,
            status
          }
        });
      } else {
        alert('⚠️ Please log in to book a slot.');
        navigate('/login');
      }
  };

  setIsLoading(true)
  const activeGround = ground || fetchedGround;
  if (!activeGround) return <p className="error-msg">❌ No venue data found.</p>;
  setIsLoading(false)
  const location = activeGround.location || game?.address || 'N/A';
  const mainImage = game?.images?.[0]?.url || gameImg;   


const isGuest = !Cookies.get("access");


  //payment

// useEffect(() => {
//   const script = document.createElement("script");
//   script.src = "https://checkout.razorpay.com/v1/checkout.js";
//   script.async = true;
//   document.body.appendChild(script);

//   return () => {
//     document.body.removeChild(script); 
//   };
// }, []);

//payment
const updateTransactionStatus = async (paymentId, status, message, razorpayOrderId, signature) => {
  const user = Cookies.get("access");

  const payload = {
    payment_id: paymentId,
    status,
    message,
    order_id: razorpayOrderId, 
    signature,
  };

  

  try {
    const response = await fetch("https://playdatesport.com/api/payments/order/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": user,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
  

    if (!response.ok) {
      console.error("Failed to update transaction:", result);
    } else {
      console.log("Transaction updated successfully:", result);
    }
  } catch (err) {
    console.error("Error updating transaction:", err);
  }
};


console.log("kkkk", formData, formData.price)

const handlePayment = async () => {
  const user = Cookies.get("access");


  const payload = {
    tournamentId: game.id,
    amount: Number(formData.price),
    currency: "INR",
    user: formData.email,
    teamId: '',
    
  };
  

  try {
    const orderResponse = await fetch("https://playdatesport.com/api/payments/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": user,
      },
      body: JSON.stringify(payload),
    });

    const data = await orderResponse.json();
    
    if (orderResponse.ok){
      window.location.href = data.upi_link;
    }

    if (!orderResponse.ok) {
      console.error("Order creation failed:", data);
      // notification.error({
      //   message: "Order Failed",
      //   description: data?.error || "Unable to create order.",
      // });
      toast.error(data?.error || "Unable to create order.")
      return;
    }

     
    // const razorpayOrderId = data.order_id;
    console.log(data) 

    // notification.success({ message: "Success", description: "Payment initiated!" });
    toast.success("Payment initiated!")
    
    // initiatePayment(razorpayOrderId, data.amount, formData.email);
    
  } catch (error) {
    console.error("Error creating order:", error);
    // notification.error({
    //   message: "Order Failed",
    //   description: "Unable to create order.",
    // });
    toast.error("Unable to create order.")
  }
};

// const initiatePayment = (razorpayOrderId, amount, userEmail) => {
//   const user = Cookies.get("access");

//   const options = {
//     key: "rzp_test_JvXFkNCRf4a6j0",
//     name: "Test Company",
//     description: "Test Transaction",
//     order_id: razorpayOrderId,
//     amount: amount,
//     currency: "INR",
//     handler: async (response) => {
//       notification.success({
//         message: "Payment Successful",
//         description: "Your booking is confirmed!",
//       });

//       await updateTransactionStatus(
//         response.razorpay_payment_id,
//         "SUCCESS",
//         "Payment successful",
//         razorpayOrderId,
//         response.razorpay_signature
//       );
    
//     navigate('/')
//     },
//     prefill: { email: userEmail || "guest@example.com" },
//     theme: { color: "#F37254" },
//   };

//   const razorpay = new Razorpay(options);
//   razorpay.open();

//   razorpay.on("payment.failed", async (response) => {
//     notification.error({
//       message: "Payment Failed",
//       description: "Unable to process payment.",
//     });

//     await updateTransactionStatus(
//       response?.error?.metadata?.payment_id || '',
//       "FAILED",
//       response?.error?.description || "Payment failed",
//       razorpayOrderId || '',
//       response?.error?.metadata?.razorpay_signature || ''
//     );
//   });
// };


//modal pop code 








  return (
    <div className='venue-container'>
      {/* mobile responsive */}
      <div className={`mobile_venue-details-wrapper ${theme}`}>
      

      <div className="top-section">
        <img src={mainImage} alt="ground" className="main-img" />
        <div className="details-section">
          <div className="details-header">
            <div>
              <h1>{activeGround.ground_name}</h1>
              <p className="game-name">{activeGround.name || 'N/A'}</p>
            </div>
            {/*<a
              href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="get-directions"
            >
              Get Directions <Navigation size={14} />
            </a>*/}
          </div>
        </div>
      </div>

      <div className="section">
        <h2>About</h2>
        <p>{activeGround.description || 'No description available.'}</p>
      </div>

      <div className="section">
        <h2>Slot Time</h2>
        {activeGround.maintenanceSchedule?.map((slot, idx) => (
          <div key={idx} className="maintance-schedule">
            <p>Days: {slot.days.join(', ')}</p>
            <p>Start: {slot.startTime}</p>
            <p>End: {slot.endTime}</p>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Amenities</h2>
        <ul className="amenities-list">
          {activeGround.amenities?.map((a, i) => <li key={i}>{a},</li>)}
        </ul>
      </div>

      <div className="section"><h2>Location</h2><p>{activeGround.address || 'N/A'}</p></div>
      <div className="section"><h2>Ground Timings</h2><p>{activeGround.Created || 'N/A'}</p></div>

     
      

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-form" onClick={(e) => e.stopPropagation()}>
            <h2 className="form-title">Registration Form</h2>

            <div className="form-group">
              <label>Tournament</label>
              <input
                type="text"
                value={formData.tournament}
                readOnly
                placeholder="e.g. JAGGAHUNDA MARATHON"
                className='inout-form-payment'
                disabled
              />
            </div>

            <div className="form-group">
              <label>Mail ID</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter your mail ID"
                className={`inout-form-payments ${!isGuest ? 'disabled-input' : ''}`}
                disabled={!isGuest} 
              />
            </div>

            <div className="form-group">
              <label>Team</label>
              <select
                  value={formData.team}
                  onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                >
                  <option value="">Select Team</option>
                  {teams.map((team, index) => (
                    <option key={index} value={team}>{team}</option>
                  ))}
               </select>
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                value={formData.price}
                className='inout-form-payment'
                readOnly
              />
            </div>
           <div className="form-btn-wrap">
          <button className="submit-btn" onClick={(e) => {
                  e.preventDefault(); 
                  handlePayment();
                }}>
                  Book Slot
          </button>
            </div>
           
          </div>
        </div>
      )}
      </div>
      <br/>
      <div className='mobile_venue-details-wrapper'>
      <TournamentRules/>
      </div>
    {/* laptop responsive */}
    <div className='sub-container'>
    <div className={`venue-details-wrapper ${theme}`}>
      

      <div className="top-section">
        <img src={mainImage} alt="ground" className="main-img" />
        <div className="details-section">
          <div className="details-header">
            <div>
              <h1>{activeGround.ground_name}</h1>
              <p className="game-name">{activeGround.name || 'N/A'}</p>
            </div>
            {/* <a
              href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="get-directions"
            >
              Get Directions <Navigation size={14} />
            </a> */}
          </div>
        </div>
      </div>

      <div className="section">
        <h2>About</h2>
        <p>{activeGround.description || 'No description available.'}</p>
      </div>

      <div className="section">
        <h2>Slot Time</h2>
        {activeGround.maintenanceSchedule?.map((slot, idx) => (
          <div key={idx} className="maintance-schedule">
            <p>Days: {slot.days.join(', ')}</p>
            <p>Start: {slot.startTime}</p>
            <p>End: {slot.endTime}</p>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Amenities</h2>
        <ul className="amenities-list">
          {activeGround.amenities?.map((a, i) => <li key={i}>{a},</li>)}
        </ul>
      </div>

      <div className="section"><h2>Location</h2><p>{activeGround.address || 'N/A'}</p></div>
      <div className="section"><h2>Ground Timings</h2><p>{activeGround.Created || 'N/A'}</p></div>

     
      

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-form" onClick={(e) => e.stopPropagation()}>
            <h2 className="form-title">Registration Form</h2>

            <div className="form-group">
              <label>Tournament</label>
              <input
                type="text"
                value={formData.tournament}
                readOnly
                placeholder="e.g. JAGGAHUNDA MARATHON"
                className='inout-form-payment'
                disabled
              />
            </div>

            <div className="form-group">
              <label>Mail ID</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter your mail ID"
                className={`inout-form-payments ${!isGuest ? 'disabled-input' : ''}`}
                disabled={!isGuest} 
              />
            </div>

            <div className="form-group">
              <label>Team</label>
              <select
                  value={formData.team}
                  onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                >
                  <option value="">Select Team</option>
                  {teams.map((team, index) => (
                    <option key={index} value={team}>{team}</option>
                  ))}
               </select>
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                value={formData.price}
                className='inout-form-payment'
                readOnly
              />
            </div>
           <div className="form-btn-wrap">
          <button className="submit-btn" onClick={(e) => {
                  e.preventDefault(); 
                  handlePayment();
                }}>
                  Book Slot
          </button>
            </div>
           
          </div>
        </div>
      )}
    </div>
    <div className='venue-details-wrapper'>
    <TournamentRules/>
    </div>
    </div>
    <div className='btn-wrap'>
      <button className="book-button" onClick={handleBack}>
        <ArrowLeft size={10} /> Back
      </button>&nbsp;
       <button className="book-button" 
       onClick={handleBooking} 
       disabled={status === 'Completed' || status === 'Scheduled'}>
          Go to book slot
        </button>
</div>
    </div>
  );
};

export default VenueDetails;







