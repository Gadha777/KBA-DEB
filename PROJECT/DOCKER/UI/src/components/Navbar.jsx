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
      <h1  id='heading'className="text-center text-4xl mt-[30px] text-white font-extrabold">EPICURE RESTAURANT</h1>
    </div>
   {userType==='user'&&<div>
   <nav>
      <Link to="/home" className='text-xl mt-[-150px] '>HOME</Link>
      <Link to="/menu" className='text-xl mt-[-150px]  '>MENU</Link>
      <Link to="/reservation" className='text-xl mt-[-150px]  '>RESERVATION</Link>
      <Link to="/booking" className='text-xl  mt-[-150px] '>BOOKING</Link>
      <Link to="/contact" className='text-xl  mt-[-150px] '>CONTACT</Link>
      <Link to="/about" className='text-xl mt-[-150px] '>ABOUT US</Link>
      <Link to="/logout" className='text-xl mt-[-150px] '>LOGOUT</Link>



    </nav>
   </div>}
   {userType==='admin'&&<div>
   <nav>
      <Link to="/home" className='text-xl mt-[-150px]'>HOME</Link>
      <Link to="/addmenu" className='text-xl mt-[-150px]'>ADD MENU</Link>
      <Link to="/adminmenu"  className='text-xl mt-[-150px]'>VIEW MENU</Link>
      <Link to="/viewreservations"  className='text-xl mt-[-150px]'>VIEW RESERVATION</Link>
      <Link to="/viewmessages"  className='text-xl mt-[-150px]'>VIEW MESSAGES</Link>
      <Link to="/logout" className='text-xl mt-[-150px] '>LOGOUT</Link>

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