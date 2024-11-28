import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = { email, password };

    const res = await fetch('/api/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDetails),
      credentials: 'include',
    });

    if (res.ok) {
      const data = await res.json();
    alert(`Logged in as: ${data.userType}`);
      navigate('/home');
    } else {
     alert('Please check your credentials');
    }
  };

  return (
      <div className="bg-white p-6 ml-[450px] mt-[100px]  rounded-lg  w-[400px] border border-black">
        <h2 className="text-3xl font-bold text-green-900 mb-4 text-center">Login</h2>
        <form onSubmit={loginSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className=" text-black font-bold mb-2">Email:</label>
            <input type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded   "
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-black font-bold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded  "
            />
          </div>
          <div className="flex   mb-6">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ">
              Login
            </button>
            <Link to="#" className=" ml-[130px] mt-[10px] text-green-700 hover:underline">Forgot Password?</Link>
          </div>
          <p className="text-center">
            Don't have an account? 
            <Link to="signup" className="text-green-900 hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
  );
};

export default Login;
