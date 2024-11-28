import React from 'react'
import AppointmentCard from '../components/Appointmentcard'
import {useEffect,useState}from 'react'
    
 export const Appointmentgird = ({isHome}) => {
    const[appointments,setAppointments]=useState([]);
    const appointmentList= isHome?appointments.slice(0,3):appointments;
  useEffect(()=>{
    const fetchApppointments=async()=>{
      try{
        const res=await fetch ('/api/viewappointment');

        const data=await res.json();
        setAppointments(data);

      }
      catch(error){
        console.log('error fetching appointment : ',error)
      }
      
    }
    fetchApppointments();

  },[]);
 
  return (
    <div>
        <h1 className='flex flex-col item-center font-bold text-2xl md:text-4xl
     text-red -800 pt-10'> {isHome?'Top Appointments':'all  Appointments'}</h1>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10'>
        {appointmentList.map((appointment)=>(
                       <AppointmentCard key={appointment.tokenid} appointment={appointment}/>
        ))}
    </div>

    </div>
  )
}

export default Appointmentgird