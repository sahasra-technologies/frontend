import React, {useState,useEffect} from 'react'; 
import {useSearchParams, useNavigate} from 'react-router-dom';
import axios from 'axios' 
import '../Login/Login.css'  
import { toast } from 'react-toastify';
import logo from '../../assets/images/image.png';

const apiClient = axios.create({
    baseURL: 'https://playdatesport.com/api',
    headers: { 'Content-Type': 'application/json' },
  }); 

const ResetPassword = () =>{  
   const [searchParams] = useSearchParams(); 
   const token = searchParams.get('token'); 

   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const navigate = useNavigate(); 

   useEffect(()=>{
    if(!token){
      toast.error("Invalid or Credentials")
      navigate('/')
    }
   },[token, navigate]) 

   if (!token) {
    return <navigate to="/" replace />;
  }

   const handleReset = async () => {
    if (!password || !confirmPassword) {
      toast.error('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await apiClient.patch('/User/signup/', {
        token,
        password,
        confirm_password: confirmPassword,
      });

      toast.success('Password reset successful!');
      navigate('/');
    } catch (error) {
      console.error('Reset password error:', error.response?.data || error.message);
      toast.error('Failed to reset password. Please try again.');
    }
  };

    return(
        <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">
          <img src={logo} alt="Logo" /><br />
          Reset Password
        </h2>
        {/* <h2 className="login-title">Reset Password</h2> */}
        <input
          type="password"
          placeholder="New Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <ul className="reg_password-hint-list">
          <li>Minimum 8 characters</li>
          <li>At least 1 uppercase letter (A-Z)</li>
          <li>At least 1 lowercase letter (a-z)</li>
          <li>At least 1 number (0-9)</li>
          <li>At least 1 special character (@$!%*?#&)</li>
          <li>New Password and Conform Passwrod should be same</li>
        </ul>
        <button type="button" className="sign-in-button" onClick={handleReset}>
          Update Password
        </button>
      </div>
    </div>
    )
}
export default ResetPassword;