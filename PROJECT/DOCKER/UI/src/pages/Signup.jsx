import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import imagePath from '../assets/Backgrounds/backgroundimg/rt8.jpg';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('admin');
  const navigate = useNavigate();

  const signupSubmit = async (userDetails) => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });

      if (res.ok) {
        toast.success("User registered successfully!");
        console.log("User registered successfully!");
        
        navigate('/');
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Error in creating user!');
      }
    } catch (error) {
      toast.error('An unexpected error occurred!');
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const userDetails = { username, password, email, userType };
    signupSubmit(userDetails);
  };
  
  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center"
      // style={{ backgroundImage: `url(${imagePath})` }}
    >
      {/* Background Overlay */}
      <div className="flex drop-shadow-2xl">
          {/* Signup Form */}
      <div className="relative z-10 bg-white p-10 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-3xl font-bold text-orange-900 mb-6 text-center">Sign Up</h2>
        <form onSubmit={submitForm}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-orange-900 font-bold mb-2">Name:</label>
            <input
              type="text"
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-orange-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-orange-900 font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-orange-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-orange-900 font-bold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-orange-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          {/* User Type Field
          <div className="mb-6">
            <label htmlFor="userType" className="block text-orange-900 font-bold mb-2">User Type:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-4 py-2 border border-orange-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div> */}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-900 text-white py-2 rounded-lg hover:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-900 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        {/* Login Link */}
        <p className="text-center mt-6 text-orange-900">
          Already have an account?{' '}
          <Link to="/" className="text-orange-900 hover:underline">
            Login
          </Link>
        </p>
      </div>
      <div className='bg-cover  rounded h-[500px]  w-[400px]'  style={{ backgroundImage: `url(${imagePath})` }}>

      </div>
      </div>
      
    
    </div>
  );
};

export default Signup;
