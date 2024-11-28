import React, { useState, useEffect } from 'react';

import img1 from '../assets/Backgrounds/backgroundimg/slider.jpg'
import Navbar from '../components/Navbar';

const Viewreservation = () => {
  const [reservations, setReservations] = useState([]);


  useEffect(() => {
    const fetchReservations = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/allreservations', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies with the request
          });
      
          if (!response.ok) {
            throw new Error('Unauthorized access');
          }
      
          const reservations = await response.json();
          setReservations(reservations)
          console.log(reservations);
        } catch (error) {
          console.error('Error fetching reservations:', error);
        }
      };


    fetchReservations();
  }, []);

  return (
   
    <div className="container mx-auto p-6 mt-[-60px] bg-cover bg-fixed" style={{ backgroundImage: `url(${img1 })` }}>
       <Navbar />
      <h2 className="text-3xl mt-[50px] text-white p-6 font-bold text-center mb-6">All Reservations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reservations.map((reservation) => (
          <div
            key={reservation._id}
            className="bg-white shadow-md rounded-lg p-4 border border-red-200"
          >
            <h3 className="text-2xl text-center text-red-900 font-bold mb-2">{reservation.username}</h3>
           <strong className="text-red-900">Phone:</strong> <span className='ml-[50px] text-red-900'>{reservation.phoneno}</span>
           <br />
            <strong  className="text-red-900">Table ID:</strong> <span  className='ml-[35px] text-red-900'>{reservation.tableid}</span>
            <br />
            <strong  className="text-red-900">Date:</strong> <span  className='ml-[60px] text-red-900'>{reservation.date}</span>
            <br />
            <strong  className="text-red-900">Suggestion:</strong> <span  className='ml-[10px] text-red-900'>{reservation.suggestion}</span>
            <br />
            <strong  className="text-red-900">Count:</strong><span  className='ml-[50px] text-red-900'> {reservation.count}</span>
            <br />
           <strong  className="text-red-900">Time:</strong> <span  className='ml-[55px] text-red-900'>{reservation.time}</span>
           <br />
          <strong  className="text-red-900">Email:</strong> <span  className='ml-[50px] text-red-900'>{reservation.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Viewreservation;
