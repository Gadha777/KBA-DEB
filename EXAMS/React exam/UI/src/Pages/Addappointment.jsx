import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Addappointment = () => {
    const [tokenid, setTokenid] = useState('');
  const [patientname, setPatientname] = useState('');
  const [doctorname, setDoctorname] = useState('');
  const [appointmentdate, setAppointmentdate] = useState('');
  const [appointmenttime, setAppointmenttime] = useState('');
  const navigate = useNavigate();
  const Addappointment = async (e) => {
    e.preventDefault();
    const appointments = {
      tokenid,
      patientname,
      doctorname,
      appointmentdate,
      appointmenttime,
    };

    try {
        const res = await fetch('/api/appointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appointments),
          credentials: 'include',
        });
        if (res.ok) {
            alert('Appointment is successful!');
            console.log('Appointment is successful!');
            navigate('/home');
          } else {
            const errorData = await res.json();
            alert(errorData.message || 'Error in creating appointment!');
          }
        } catch (error) {
          alert('An unexpected error occurred!');
        }
      };
  return (
   <>
   <Navbar/>
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-black rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-800">
        Add Appointment
      </h2>
      <form onSubmit={Addappointment} className=" ">
        {/* Token ID */}
        <div>
          <label
            htmlFor="tokenid"
            className="block text-black font-medium mb-2"
          >
            Token ID:
          </label>
          <input
            type="number"
            id="tokenid"
            className="w-full border border-black rounded-lg p-2 "
            value={tokenid}
            onChange={(e) => setTokenid(e.target.value)}
            required
          />
        </div>

        {/* Patient Name */}
        <div>
          <label
            htmlFor="patientname"
            className="block text-black font-medium mb-2"
          >
            Patient Name:
          </label>
          <input
            type="text"
            id="patientname"
            className="w-full border border-black rounded-lg p-2"
            value={patientname}
            onChange={(e) => setPatientname(e.target.value)}
            required
          />
        </div>

        {/* Doctor Name */}
        <div>
          <label
            htmlFor="doctorname"
            className="block text-black font-medium mb-2"
          >
            Doctor Name:
          </label>
          <input
            type="text"
            id="doctorname"
            className="w-full border border-black rounded-lg p-2"
            value={doctorname}
            onChange={(e) => setDoctorname(e.target.value)}
            required
          />
        </div>

        {/* Appointment Date */}
        <div>
          <label
            htmlFor="appointmentdate"
            className="block text-black font-medium mb-2"
          >
            Appointment Date:
          </label>
          <input
            type="date"
            id="appointmentdate"
            className="w-full border border-black rounded-lg p-2"
            value={appointmentdate}
            onChange={(e) => setAppointmentdate(e.target.value)}
            required
          />
        </div>

        {/* Appointment Time */}
        <div>
          <label
            htmlFor="appointmenttime"
            className="block text-black font-medium mb-2"
          >
            Appointment Time:
          </label>
          <input
            type="time"
            id="appointmenttime"
            className="w-full border border-black rounded-lg p-2"
            value={appointmenttime}
            onChange={(e) => setAppointmenttime(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 mt-8 text-white py-2 rounded-lg font-medium hover:bg-green-600 "
        >
          Add Appointment
        </button>
      </form>
    </div>
   </>
  )
}

export default Addappointment