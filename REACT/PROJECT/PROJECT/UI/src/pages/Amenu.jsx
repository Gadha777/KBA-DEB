import React from 'react';
import Dishgird from '../components/Dishgird';
import Navbar from '../components/Navbar';
import img1 from '../assets/Backgrounds/backgroundimg/slider.jpg'
const Amenu = () => {
  return (
    <div className='bg-cover mt-[-70px] h-[690px]'  style={{ backgroundImage: `url(${img1 })` }}>
      <br />
      <br />
    <Navbar/>
  
    <Dishgird />
    </div>
  );
};

export default Amenu;
