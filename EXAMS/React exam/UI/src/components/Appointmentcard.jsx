import React from 'react'
import { Link } from 'react-router-dom';


const Appointmentcard = ({appointment}) => {
  return (
    <div className='border-black border rounded-md flex flex-col  justify-center mx-5 my-5 py-10'>
      <h2 className='font-bold text-lg  mb-4 text-center text-black'>Patient Name : {appointment.patientname}</h2>
      <p className='  ml-[60px] text-black'>Token Id : { appointment.tokenid}</p>
      <p className='  ml-[60px] text-black'>Doctor Nme : {appointment.doctorname}</p>
      <p className=' ml-[60px] text-black'>Appointment Date : {appointment.appointmentdate}</p>
      <p className=' ml-[60px] text-black'>Appointment Time : {appointment.appointmenttime}</p>
        {/* <div className=' mt-8 ml-[50px]'>
      <Link  to={`/viewappointment/${appointment.tokenid}`} className="bg-green-500  justify-center text-white px-4 py-2 mt-4 rounded hover:bg-green-600  mx-5">Update Appointment</Link>
        </div> */}
        
    </div>
  )
}

export default Appointmentcard