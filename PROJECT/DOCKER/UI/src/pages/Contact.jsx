import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import con from '../assets/Backgrounds/backgroundimg/con.mp4'
import first from '../assets/Backgrounds/backgroundimg/9.jpg'
import second from '../assets/Backgrounds/gallery/gallery-9.jpg'
import third from '../assets/Backgrounds/gallery/gallery-1.jpg'

// import "../css/contact.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const Contact = async (e) => {
        e.preventDefault();
        const messages = {
            name, 
            email, 
            subject,
            message
        };
        try {
            const res = await fetch('/api/message', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(messages),
              credentials: 'include',
            });
            if (res.ok) {
                alert('Your message has been sent successfully!');
                console.log('Your message has been sent successfully!');
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
<>
<div class="first">
        <video autoPlay  muted loop id="bg-video" className='absolute top-[30%] left-[50%] min-w-full min-h-full w-auto h-full -z-10 transform -translate-x-2/4 -translate-y-2/4 object-cover pointer-events-none'>
            <source src={con} de type="video/mp4"/>
            {/* <!-- Your br/owser does not support the video tag. --> */}
        </video>
        <Navbar/>
    <div class="font-[Franklin_Gothic_Medium, Arial_Narrow, Arial, sans-serif] text-[110px] text-white font-bold text-center mt-16">
            CONTACT US
            <p className='text-white font-[Caveat] text-[40px] text-center mt-[-20px] font-normal'>We love to hear from you</p>
    </div>
<div class="flex mt-28 h-[400px] ">
    <div id="Find" class="mx-[30px] mt-[100px] bg-transparent backdrop-blur-sm h-[100px]">
        <a href="https://www.google.com/maps/place/Kochi,+Kerala/@9.9823946,75.9712536,10z/data=!3m1!4b1!4m6!3m5!1s0x3b080d514abec6bf:0xbd582caa5844192!8m2!3d9.9312328!4d76.2673041!16zL20vMGZsMnM?entry=ttu&g_ep=EgoyMDI0MTAwNy4xIKXMDSoASAFQAw%3D%3D">
        <p class="font-bold mt-[-10px] text-center text-[30px] text-black font-[Kalam] font-light" >Address:40 Park Ave, Kochi,Ernakulam</p></a>
        <p className="font-bold mt-[-10px] text-center text-[30px] text-black font-[Kalam] font-light"> Phone: 000-111-2222</p>
        <p className=" font-bold mt-[-10px] text-center text-[30px] text-black font-[Kalam] font-light">Email: contact@Epicure.com</p>
    </div>
    <div >
        <img src={first}class="h-[350px] w-[600px] ml-20" alt=""/>
    </div>
</div>
<h3 id="Get"  className='text-7xl text-black no-underline font-[Caveat] text-[90px] text-center mt-[3 0px] mb-[50px] font-normal'>Get In Touch</h3>
        <p class=" font-[Satisfy] text-2xl ml-[160px]" >You have a piece of advice or a suggestion that you would like to share with us? Feel free to contact us.</p>
            <div class="flex" >
                <div class="h-[150px] w-[500px] ml-28 mt-[70px]">
                    <img src={second}  alt=""/>
                    <img src={third} alt=""/>
                </div>
            <form action="" onSubmit={Contact}>
            <div id="table" class=" ml-24 mt-28">
                    <label className='text-[20px] font-[Architects_Daughter] font-normal' for="">Name</label>
                    <input  className="ml-[70px] border-b-2 border-black p-[5px]"  type="text"id='name' value={name} onChange={(e) => setName(e.target.value)}/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <label className='text-[20px] font-[Architects_Daughter] font-normal' for="">Email</label>
                    <input className="ml-[75px] border-b-2 border-black p-[5px]" type="email"id='email'value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <label className='text-[20px] font-[Architects_Daughter] font-normal' for="">Subject</label>
                    <input className="ml-[50px] border-b-2 border-black p-[5px]" type="text" id='subject'value={subject} onChange={(e) => setSubject(e.target.value)}/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <label className='text-[20px] font-[Architects_Daughter] font-normal' for="">Message</label>
                    <input className="ml-[40px] border-b-2 border-black p-[5px]" rows="2" type="textarea" id='message'value={message} onChange={(e) => setMessage(e.target.value)}/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <button  className='bg-transparent border-4 border-black px-[25px] py-[8px] ml-[150px] mt-[20px] text-black hover:bg-[#bc8d4b] hover:border-[#bc8d4b] hover:text-white font-extrabold' id="send">SEND MESSAGE</button>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </form>
            </div>
     <div className='mb-[-400]'>
     <Footer/>
     </div>
</div>
</>
)
}

export default Contact