import React, { useState, useEffect } from 'react';
import img1 from '../assets/Backgrounds/backgroundimg/rt11.jpg'
import Navbar from '../components/Navbar';

const Viewmessage = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
              const response = await fetch('/api/allmessages', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies with the request
              });
          
              if (!response.ok) {
                throw new Error('Unauthorized access');
              }
          
              const messages = await response.json();
              setMessages(messages)
              console.log(messages);
            } catch (error) {
              console.error('Error fetching reservations:', error);
            }
          };
    
    
          fetchMessages();
      },);
    
  return (
    <div className="container mx-auto p-6  bg-cover bg-center bg-no-repeat min-h-screen m-[-50px] h-[700px]"  style={{ backgroundImage: `url(${img1 })` }}>
      <Navbar/>
      <h2 className="text-4xl text-white font-bold text-center my-8">All Messages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {messages.map((message) => (
          <div
            key={message._id}
            className="bg-white/80 shadow-md rounded-lg p-4  border border-red-200"
          >
            <h3 className="text-xl text-center text-red-900  font-semibold mb-2">{message.name}</h3>
            <p className="text-red-900"><strong>Email : </strong> {message.email}</p>
            <p className="text-red-900"><strong>Subject :</strong> {message.subject}</p>
            <p className="text-red-900"><strong>Message:</strong> {message.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Viewmessage