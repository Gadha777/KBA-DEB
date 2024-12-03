import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the path as needed
import "../css/home.css"; // Adjust the path based on your project structure
import { Link } from 'react-router-dom';
import getUserType from '../Utils/Auth';

const Home = () => {
  const userType=getUserType();

  return (
    
      <div className='homepage'>
        {/* Use the Navbar component */}
        <Navbar />
        <div className="font-sans text-[130px] text-white font-black text-center mt-12">WELCOME</div>
        <p className='font-serif text-white text-lg text-center mt-5   font-bold'>You should come and taste for yourself</p>
        {userType==='user'  && <button type="button" id="book" className='bg-transparent border-4 border-white p-1 px-5 ml-[540px] mt-5 text-white'>
        <Link to="/reservation">BOOK A TABLE</Link>
        </button>
        }
        <br />
      <br />
      <br />
      <p className="mt-[px] text-white  text-[15px] text-center">
        @Epicure Restaurant
      </p>
  
      </div>
  );
};

export default Home;
