import React from 'react';
import Appointmentgrid from '../components/Appointmentgird';
import Navbar from '../components/Navbar';

const Appointments = () => {
  return (
    <>
    <Navbar/>
      <h1 className='text-center text-2xl font-bold mt-10'>All Appointments</h1>
      <Appointmentgrid isHome={false} />
    </>
  );
};

export default Appointments;
