import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/Backgrounds/backgroundimg/reservation-image.jpg';
import Footer from '../components/Footer';

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
      className="min-h-screen bg-gray-100 bg-cover pt-[30px]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
      <h2 className="text-3xl text-white py-[30px] font-bold text-center mb-8">
        Your Reservation Details
      </h2>
      {/* grid-cols-1 sm:grid-cols-2 */}
      <div className="grid  md:grid-cols-2 gap-10 mt-[40px] ml-[30px] mr-[30px]">
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <div
              key={reservation._id}
              className="shadow-md backdrop-blur-sm bg-white/10 rounded-lg p-4 border h-[450px] border-gray-200"
            >
              <h3 className="text-center text-3xl text-white p-2 underline underline-offset-8 my-2">
                <strong className='p-2 '>Table No  :</strong> {reservation.tableid}
              </h3>
              <div className="grid grid-cols-2 font-serif gap-y-[15px] text-white ml-[60px] mt-[20px] font-bold  text-xl">
                <strong >Username :</strong>
                <span>{reservation.username}</span>

                <strong>Phone :</strong>
                <span>{reservation.phoneno}</span>

                <strong>No of People :</strong>
                <span>{reservation.count}</span>

                <strong>Date :</strong>
                <span>{new Date(reservation.date).toLocaleDateString()}</span>

                <strong>Time :</strong>
                <span>{reservation.time}</span>

                <strong>Email :</strong>
                <span>{reservation.email}</span>

                <strong>Suggestion :</strong>
                <span>{reservation.suggestion}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-500">
            No reservations found.
          </p>
        )}
      </div>
    <Footer/>
    </div>
  );
};

export default ViewReservations;
