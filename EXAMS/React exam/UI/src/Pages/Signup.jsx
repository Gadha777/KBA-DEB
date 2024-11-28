import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [userName, setUserName] = useState('');
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
    const userDetails = { userName, password, email, userType };
    signupSubmit(userDetails);
  };

  return (
    <div className=" flex  min-h-screen">
      <div className=" ml-[450px] border border-black p-8 m-6 rounded-lg w-[400px]">
        <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">Sign Up</h2>
        <form onSubmit={submitForm}>
       
         {/* name */}
            <label htmlFor="name" className="block x text-black font-bold mb-2">Name:</label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border rounded border-black "
              required
            />
       
      {/* Email */}
            <label htmlFor="email" className="block text-black font-bold mt-4 mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded border-black "
              required
            />
         
            <label htmlFor="password" className="block text-black font-bold mt-4 mb-2">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded border-black mb-4 "
              required
            />
         
         
            <label htmlFor="userType" className=" text-black font-bold mt-8 mb-8">User Type:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-3 py-2  border rounded border-black  mt-2"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
        
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 mt-4 rounded hover:bg-green-600 ">
            Sign Up
          </button>
        </form>
        {/* Login Link */}
        <p className="text-center mt-6">
          Already have an account? 
          <Link to="/" className="text-green-700 hover:underline"> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
