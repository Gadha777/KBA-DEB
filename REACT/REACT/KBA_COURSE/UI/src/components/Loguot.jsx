import React from 'react'
import { useNavigate } from 'react-router-dom'

const Loguot = () => {
    const navigate=useNavigate(); 
    const handlelogout =async()=>{
        await fetch('/logout',{
            method:'GET',
            credentials:'include'
        });
        document.cookie='Authtoken=; Max-Age=0';
        navigate('/');
    }
  return (
    <button onClick={handlelogout} className='text-purple-700 hover:underline'>Logout</button>    
)
}

export default Loguot