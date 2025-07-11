import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/image.png';
// import {useUser} from './UserContext'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Login.css';
import { toast } from 'react-toastify';

const apiClient = axios.create({
  baseURL: 'https://playdatesport.com/api',
  headers: { 'Content-Type': 'application/json' },
});

const forgetPassword = async (username) => {
  try {
    await apiClient.put('/User/signup/', { username });
    toast.success('Reset mail sent successfully!');
    return true;
  } catch (error) {
    console.log('Forgot password error:', error);
    toast.error('Failed to send reset mail. Try again.');
    return false;
  }
};

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // const {setUser} = useUser()
  
  const navigate = useNavigate();

  const isPasswordValid = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    return regex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isPasswordValid(password)) {
      toast.error("Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.");
      return;
    }

    try {
      const res = await apiClient.post('/Auth/token/', {
        username,
        password,
      });

      const { access, refresh } = res.data;

      Cookies.set('access', access, { expires: 1 / 24 });
      Cookies.set('refresh', refresh, { expires: 7 });

      // Get user info using access token
      const userRes = await apiClient.get(`/User/user/?username=${username}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      toast.success(`Welcome back, 👋`); // ${firstName}!

      const firstName = userRes.data.first_name;
      const userId = userRes.data.id
      const userEmail = userRes.data.email

      Cookies.set('userId', userId);

      Cookies.set('email', userEmail)
      Cookies.set('user', JSON.stringify(userRes.data))
      
      // setUser(firstName);

      
      Cookies.set('first_name', firstName);

      navigate('/');
    } catch (err) {
      // console.error('Login error:', err);
      // alert('Invalid credentials');
      toast.error('Invalid credentials');
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) return toast.error('Please enter your email');
    const success = await forgetPassword(forgotEmail);
    if (success) {
      setTimeout(() => {
        setShowForgot(false);
        setForgotEmail('');
      }, 1000);
    }
  };

  const togglePasswordVisibility = () =>{
    setShowPassword(prev => !prev);
  }

  const handleBack = () =>{
    // navigate('/login', {state: {fromLogin: true}})
    setShowForgot(false)
  }

  return (
    <div className='login-container'>
      <div className="login-box">
        {/* <div className="logo">
          <img src={logo} alt="Logo" />
        </div> */}
        <form onSubmit={handleLogin}>
          {!showForgot ? (
            <>
              <h2 className="login-title">
                <img src={logo} alt="Logo" /><br/>
                Login</h2>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setUsername(e.target.value)}
                required
                className="input-field"
              />
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
                <span onClick={togglePasswordVisibility} className="eye-icon">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="forgot-password" onClick={() => setShowForgot(true)}>
                Forgot Password?
              </div>
              <button type="submit" className="sign-in-button">Sign In</button>
              <div className="register-text">
                Don’t have an account? <span onClick={() => navigate('/register')}>Register for free</span>
              </div>
            </>
          ) : (
            <div className='forgot-password-section'>
              <h2 className="login-title">
                  <img src={logo} alt="Logo" /><br/>
                  Forget Password</h2>
              <input
                type='email'
                placeholder='Enter your email'
                className='input-field'
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <button type='button' className='sign-in-button' onClick={handleForgotPassword}>
                Send Reset Link
              </button>
              <div className="forgot-password" onClick={handleBack}>
                Back to Login
              </div>
              <div className="register-text">
                Don’t have an account? <span onClick={() => navigate('/register')}>Register for free</span>
              </div>
            </div>
          )}
        </form>

        {/* <div className="divider">
          <hr /><span>or continue with</span><hr />
        </div> */}

        {/* <div className="social-login">
          <div className='icon-logo'>
            <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" className='image-logo' />
          </div>
          <div className='icon-logo'>
            <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" className='image-logo' />
          </div>
          <div className='icon-logo'>
            <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt='Twitter' className='image-logo' />
          </div>
        </div> */}

        {/* <div className="register-text">
          Don’t have an account? <span onClick={() => navigate('/register')}>Register for free</span>
        </div> */}
      </div>
    </div>
  );
};

export default LoginForm;


