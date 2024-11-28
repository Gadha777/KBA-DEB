import React from 'react'
import {Link}  from 'react-router-dom';
import getUserType from '../Utils/Auth';
const Navbar = () => {
    const userType=getUserType();
  return (
    <div className='bg-green-300 text-black h-[50px]'>
    <div className='flex items-center'>        
    </div>
    <div className='flex justify-end  mt-4  mr-10'>
        <Link to="/home" className='ml-20'>Home</Link>
        <Link to="/Appointments" className='ml-20'>View appointments</Link>
        <Link to="/Doctors" className='ml-20'>view Doctors</Link>
        {userType==='admin'&&<Link to="/addappointment" className='ml-20'>Add appointments</Link>}      
     
</div>
</div>
  )
}

export default Navbar