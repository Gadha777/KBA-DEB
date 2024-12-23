import React from 'react';
import { Link } from 'react-router-dom';
import "../css/home.css"; // Adjust the path based on your project structure
import getUserType from '../Utils/Auth';
const Navbar = () => {
  const userType=getUserType();
  console.log(userType)
  return (
  <>
    <div className="mt-[70px] font-josefin font-bold not-italic">
      <h1  id='heading'className="text-center text-2xl mt-[70px] text-white font-extrabold">EPICURE RESTAURANT</h1>
    </div>
   {userType==='user'&&<div>
   <nav>
      <Link to="/home">HOME</Link>
      <Link to="/menu">MENU</Link>
      <Link to="/reservation">RESERVATION</Link>
      <Link to="/booking">BOOKING</Link>
      <Link to="/gallery">GALLERY</Link>
      <Link to="/contact">CONTACT</Link>
      <Link to="/about">ABOUT US</Link>
    </nav>
   </div>}
   {userType==='admin'&&<div>
   <nav>
      <Link to="/">HOME</Link>
      <Link to="/addmenu">ADD MENU</Link>
      <Link to="/adminmenu">VIEW MENU</Link>
      <Link to="/viewreservations">VIEW RESERVATION</Link>
      <Link to="/viewmessages">VIEW MESSAGES</Link>
    </nav>
   </div>}
  </>
  );
};

export default Navbar;


















// import React from 'react'
// import { Link } from 'react-router-dom'
// // import "../css/home.css"
// const Navbar = () => {
//     // console.log("Navbar is rendering");
//   return (
//     <nav className='text-center mt-[70px]' id='navbar' >
//     <Link className='no-underline text-white font-gowun font-extrabold font-normal text-xl pl-15' to="">HOME</Link>
//     <Link to="" className='no-underline text-black font-gowun font-extrabold font-normal text-xl pl-15'>MENU</Link>
//     <Link to="" className='no-underline text-white font-gowun font-extrabold font-normal text-xl pl-15'>RESERVATION</Link>
//     <Link to="" className='no-underline text-white font-gowun font-extrabold font-normal text-xl pl-15'>GLLERY</Link>
//     <Link to="" className='no-underline text-white font-gowun font-extrabold font-normal text-xl pl-15'>CONTACT</Link>
//     <Link to="" className='no-underline text-white font-gowun font-extrabold font-normal text-xl pl-15' >ABOUT US</Link>
//     </nav>
//   )
// }

// export default Navbar