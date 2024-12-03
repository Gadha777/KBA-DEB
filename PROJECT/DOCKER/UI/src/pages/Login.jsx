import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import imagePath from '../assets/Backgrounds/backgroundimg/rt10.jpg';
// import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = {username, password };

    const res = await fetch('/api/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDetails),
      credentials: 'include',
    });
    const data = await res.json();
    console.log(data)
    if (res.ok) {
      localStorage.setItem('username', username); 
    alert(`Logged in as: ${data.userType}`);
      navigate('/home');
    } else {
     alert('Please check your credentials');
    }
  };

  return (
    <div
  className="relative  bg-cover bg-center min-h-screen flex items-center justify-center" >
  {/* Blur Effect */}
  <div className="flex rounded-md drop-shadow-2xl ">
  <div className="relative  p-8 sm:p-12 rounded-lg  shadow-2xl w-full max-w-md">
    <h2 className="text-4xl font-bold text-orange-900 mb-6 text-center">Welcome Back!</h2>
    <form onSubmit={loginSubmit}>
      <div className="mb-6">
        <label htmlFor="username" className="block text-lg font-semibold text-orange-900 mb-2">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 border-2 border-orange-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-900 transition"
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-lg font-semibold text-orange-900 mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border-2 border-orange-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-900 transition"
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="flex items-center justify-between mb-6">
        <button
          type="submit"
          className="bg-orange-900 text-white px-6 py-2 rounded-lg hover:bg-orange-900 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-orange-900 focus:ring-offset-1"
        >
          Login
        </button>
        <Link to="#" className="text-orange-900 hover:underline">
          Forgot Password?
        </Link>
      </div>
      <p className="text-center text-orange-900">
        Don't have an account?{' '}
        <Link to="/signup" className="text-orange-900 font-semibold hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  </div>
<div className='rounded-lg bg-cover w-[450px]' style={{ backgroundImage: `url(${imagePath})` }}>

  </div>
  </div>

  {/* Login Form */}
  
</div>

  );
};

export default Login;
