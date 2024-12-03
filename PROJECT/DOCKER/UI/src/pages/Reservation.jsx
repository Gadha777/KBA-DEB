import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imagePath from '../assets/Backgrounds/backgroundimg/rt1.jpg';
import Navbar from '../components/Navbar';

const Reservation = () => {
  const [username, setUsername] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [count, setCount] = useState('');
  const [tableid, setTableid] = useState('');
  const [date, setDate] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [availableTables, setAvailableTables] = useState([]); 
  const navigate = useNavigate();
  const fetchAvailableTables = async () => {
    try {
      const response = await fetch('/api/available-tables');
      if (response.ok) {
        const data = await response.json();
        setAvailableTables(data);
      } else {
        alert('Failed to fetch available tables');
      }
    } catch (error) {
      alert('Error fetching tables');
    }
  };
  const Reservation = async (e) => {
    e.preventDefault();
    const reservations = {
      username, 
      phoneno,
      count,
      tableid,
      date,
      suggestion,
      time,
      email
    };
    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservations),
        credentials: 'include',
      });

      if (res.ok) {
        alert('reservation is successful!');
        console.log('reservation is successful!');
        navigate('/home');
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Error in creating reservation!');
      }
    } catch (error) {
      alert('An unexpected error occurred!');
    }
  };
  return (
    <div
      className="bg-cover bg-no-repeat bg-fixed min-h-screen bg-cover" style={{ backgroundImage: `url(${imagePath})` }}>
     <div className='pt-[10px]'>
     <Navbar />
     </div>
      <div className="text-white text-7xl font-bold text-center mt-16">
        We Create
        <br/>
        Delicious Memories
      </div>
      <div>
        <button
          type="button"className="hover:bg-green-900 bg-white text-black px-4 py-2 mt-10 ml-[550px] rounded-full " value="BOOK">
          <a href="#book" className='text-black hover:text-white '   onClick={fetchAvailableTables}>   View Available Tables</a>
        </button>
              {/* Display Available Tables */}
      <div className="mt-6 ">
        {availableTables.length > 0 ? (
          <ul className="text-black rounded bg-white w-[300px] ml-[510px] p-4 text-center">
            {availableTables.map((table) => (
              <li key={table.tableId} className='mt-2' >
                Table ID: {table.tableId} : Available Seats: {table.availableSeats}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white text-center ml-[40px]">SEE HERE</p>
        )}
      </div>
      </div>
      <div  >
<br/>
<div className="mt-32 h-[100px] w-10/12 mx-24 px-8">
<div class="flex  border-4 border-white">
            <div class="bg-[url('/backgroundimg/11.jpg')] bg-cover bg-no-repeat  w-[500px] h-[750px]">
         <div class="backdrop-blur-sm outline outline-white  outline-offset-[-20px]  h-[750px]">
            <p class="text-white text-center text-3xl py-10 font-['Satisfy']">Check Availability</p>
            <h1 class=" text-center text-white text-6xl font-['Satisfy']">Opening Times</h1>
            <div class="flex px-4 overflow-hidden ml-6 mr-6 pb-4 border-b-2  mt-8 border-dashed  text-white text-xl mt-8 ">
                <p class="ml-10 ">Week days</p>
                <p class=" ml-40">09.00 - 24:00</p>
            </div>
            <div class="flex px-4 pb-4 border-b-2 border-dashed ml-6 mr-6 text-white text-xl mt-8 ">
                <p class="ml-10 ">Saturday</p>
                <p class=" ml-44">08.00 - 10:00</p>
            </div>
            <div class="flex px-4 pb-4 text-white text-xl ml-6 mr-6 mt-8 border-b-2 border-dashed ">
                <p class="ml-10 ">Sunday</p>
                <p class=" ml-48">10.00 - 24:00</p>
            </div>
            <p class="text-4xl text-center text-white mt-10 font-['Satisfy']">Call Us Now</p>
            <p class="text-6xl text-center text-white mt-8 font-['Satisfy']">22000 22290</p>
         </div>
        </div>
{/* <!-- form --> */}
<form action="" onSubmit={Reservation} >
<div className="bg-white outline outline-orange-300 outline-offset-[-20px] w-[500px] h-[750px] p-10"> 
<div>
<p className="mb-[10px] text-center font-['Satisfy'] text-xl">You can book your table online easily in just a couple of minutes. We take reservations for lunch, just check the availability of your table.</p>

{/* Name  */}
<label className="" htmlFor="">Username</label>
<br/>
<input type="text"
       id='username'
       value={username}
       onChange={(e) => setUsername(e.target.value)}
       className="mt-4 border-2 border-orange-400 h-8 w-full"
       placeholder=" enter your name" 
       required/>
<br/><br/>
<div className="flex">
<div>

  {/* phone number */}
<label className=" " htmlFor="">Phone No</label>
<br/>
<input type="text"
       id='phoneno'
       value={phoneno}
       onChange={(e) => setPhoneno(e.target.value)}
      className="mt-4 border-2 border-orange-400 h-8 w-48" 
      placeholder=" enter your phone no" 
      required/>
<br/><br/>
</div>

{/* table Id */}
<div>
<label className=" ml-10" htmlFor="">Table Id</label>
<br/>
<input type="text"
      id='tableid'
      value={tableid}
      onChange={(e) => setTableid(e.target.value)}
      className="mt-4 border-2 ml-10 border-orange-400 h-8 w-48" 
      placeholder=" enter your Table id"
      required/>
<br/><br/>
</div>
</div>

<div className="flex">
<div> 
<label className="" htmlFor="">No of people</label>
<br/><br/>
<select className="border-2 border-orange-400 h-8 w-48 "
        name="" 
        id='count'
        value={count}
        onChange={(e) => setCount(e.target.value)}
        required>
<option className="bg-orange-600 text-white hover:text-white" value="1">1</option>
<option className="bg-orange-500 text-white hover:text-white" value="2">2</option>
<option className="bg-orange-600 text-white hover:text-white" value="3">3</option>
<option className="bg-orange-500 text-white hover:text-white" value="4">4</option>
</select>
</div>

{/* date */}
<div>
<label className=" ml-10" htmlFor="">Date</label>
<br/><br/>
<input className="border-2 border-orange-400 h-8 w-48 ml-10"
        id='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
       type="date"
       required/>
<br/><br/>
</div>
</div>
{/* Suggestions */}
<div className="flex">
<div>
<label className="" htmlFor="">Suggestions</label>
<br/><br/>
<input className="border-2 border-orange-400 h-8 w-48 "
      id='suggestion'
      value={suggestion}
      onChange={(e) => setSuggestion(e.target.value)}
        type="text"
        placeholder=" Suggestions"/>
<br/><br/>
</div>

{/* Time */}
<div>
<label className=" ml-10" htmlFor="">Time</label>
<br/><br/>
<input className="border-2 border-orange-400 h-8 w-48 ml-10"
      type="time" 
      id='time'
      value={time}
      onChange={(e) => setTime(e.target.value)}
      required/>
<br/><br/>
</div>
</div>
<label className="" htmlFor="">Email</label>
<br/><br/>
<input className="border-2 border-orange-400 h-8 w-full" 
        placeholder=" enter your email id" 
        type="email"
        id='email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
        required/>
</div>
<br/>
<a href="booked.html"><button type="submit" className="ml-24 bg-orange-500 text-white px-24 py-2 hover:bg-orange-700 rounded">Book</button></a>
</div>
</form>
</div>

</div>

<p className=" mt-[700px] text-white text-center">@Epicure Restaurant</p> 
</div>

    </div>
    
  );
};

export default Reservation;
