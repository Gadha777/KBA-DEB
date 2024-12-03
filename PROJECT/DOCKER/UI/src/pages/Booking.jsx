import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/Backgrounds/backgroundimg/rt4.jpg';


const ViewReservations = () => {
  const [reservations, setReservations] = useState([]); // Ensure it's an array to handle multiple reservations
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      const loggedInUsername = localStorage.getItem('username');
      if (!loggedInUsername) {
        alert('Please login to view your reservations');
        navigate('/login'); // Redirect to login page if not logged in
        return;
      }
      try {
        const response = await fetch(`/api/viewreservations?username=${loggedInUsername}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setReservations(data); // Set reservations array
        } else {
          setReservations([]); // Handle cases when no data returned
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
        alert('An unexpected error occurred!');
        setReservations([]);
      }
    };

    fetchReservations();
  }, [navigate]);

  return (
    <div
      className="bg-cover bg-fixed bg-center bg-no-repeat min-h-screen pt-[30px]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
      <h2 className="text-3xl text-white py-[30px] font-bold text-center mb-8">
        Your Reservation Details
      </h2>
      {/* grid-cols-1 sm:grid-cols-2 */}
      <div className="grid md:grid-cols-2 gap-10  px-8">
  {reservations.length > 0 ? (
    reservations.map((reservation) => (
      <div
        key={reservation._id}
        className="shadow-lg bg-[#f5f5f5] from-white via-gray-100 to-white rounded-md p-6 border border-gray-300 hover:shadow-2xl transition-shadow duration-300 h-[450px] w-[400px]  flex flex-col "
      >
        <div className="bg-gray-200 py-1 text-center mb-[30px]">
          <h3 className="text-2xl font-semibold m-[20px] text-red-900">
            Table No {reservation.tableid}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-y-4 ml-[30px] text-black font-medium text-lg ">
          <span className="text-gray-500">Username</span>
          <span>{reservation.username}</span>

          <span className="text-gray-500">Phone</span>
          <span>{reservation.phoneno}</span>

          <span className="text-gray-500">No of People</span>
          <span>{reservation.count}</span>

          <span className="text-gray-500">Date</span>
          <span>{new Date(reservation.date).toLocaleDateString()}</span>

          <span className="text-gray-500">Time</span>
          <span>{reservation.time}</span>

          <span className="text-gray-500">Email</span>
          <span>{reservation.email}</span>
        </div>
        {/* <style jsx>{`
          div.grid-cols-2 span:nth-child(2n) {
            border-right: 2px solid #e5e7eb;
            border-bottom: 2px solid #e5e7eb;
            padding: 0.5rem;
          }
        `}</style> */}
       
      </div>
    ))
  ) : (
    <p className="text-center text-lg text-white">
      No reservations found.
    </p>
  )}
</div>
<br /><br />

    </div>
  );
};

export default ViewReservations;
