import React from "react";
import Aboutvideo from "../assets/Backgrounds/backgroundimg/1.mp4"
import H from '../assets/Backgrounds/backgroundimg/about.jpg'
import W from '../assets/Backgrounds/gallery/gallery-5.jpg'
import A from '../assets/Backgrounds/gallery/gallery-3.jpg'
import F from '../assets/Backgrounds/backgroundimg/fruit.png'
import I from '../assets/Backgrounds/backgroundimg/ice-cream.png'
import D from '../assets/Backgrounds/backgroundimg/delivery-man.png'
import WA from '../assets/Backgrounds/backgroundimg/waiter.png'

import backgroundImage from'../assets/Backgrounds/backgroundimg/aboutusbg.webp'
import { Link } from "react-router-dom";
import "../css/Aboutus.css"; // Adjust the path based on your project structure
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="first">
      <video autoPlay muted loop className="absolute top-[30%] left-[50%] min-w-full min-h-full w-auto h-full -z-10 transform -translate-x-2/4 -translate-y-2/4 object-cover pointer-events-none" id="bg-video">
        <source src={Aboutvideo} type="video/mp4" />
      </video>

     <Navbar/>
      <div className="font-sans text-[110px] text-white font-black text-center mt-2">
        ABOUT US
        <p className="text-black font-caveat text-[30px] text-center mt-[-30px] not-italic">We're passionate about cooking</p>
      </div>

      <div className="flex mt-[150px] ml-[50px]">
        <div >
          <img src={H} className="h-[250px] w-[900px]" alt="About Us" />
        </div>
        <div className="ml-[100px] mr-[50px]">
          <h3 className="text-black font-caveat font-normal text-[70px] text-center ">Our History</h3>
          <p className="text-black font-caveat text-[25px] text-center mt-[10px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, non, voluptatibus modi mollitia ad vitae quidem officiis tenetur, error
            quis fuga harum temporibus earum nisi laborum aliquam molestiae dicta voluptatem?
          </p>
        </div>
      </div>

      <div className="flex mt-[90px] ml-[50px]">
        <div className="mr-[120px]" >
          <h3 className="text-black no-underline font-caveat font-normal text-[70px] text-center mt-[-20px]">What We Value</h3>
          <p className="text-black font-caveat text-[25px] text-center mt-[10px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, non, voluptatibus modi mollitia ad vitae quidem officiis tenetur, error
            quis fuga harum temporibus earum nisi laborum aliquam molestiae dicta voluptatem?
          </p>
        </div>
        <div >
          <img src={W} className="h-[250px] w-[900px] ml-[-50px] " alt="What We Value" />
        </div>
      </div>

      <div className="flex mt-[90px] ml-[50px]">
        <div >
          <img className="h-[250px] w-[900px] ml-[50px]" src={A} alt="About Us" />
        </div>
        <div className="set3a">
          <h3 className="text-black no-underline font-caveat font-normal text-[70px] text-center pb-[50px]">About Us</h3>
          <p className="text-black font-[Caveat] text-[25px] text-center mt-[-160px]">
            Welcome to Epicure, a modern restaurant with a focus on premium food tastes. We invite you to celebrate our restaurant's delicious
            recipes whether you are here for a business lunch or dinner. Discover new tastes and inspired recipes from all over the world.
          </p>
        </div>
      </div>

      <h1>Services</h1>

      <div className="bg-no-repeat bg-cover h-[700px] w-full"style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="pt-[80px] flex mb-[60px]">
          <div className="ml-[150px] mt-[-20px] bg-transparent backdrop-blur-[3px] rounded-[25px]">
            <img src={F} className='h-[80px] w-[80px] ml-[150px]' alt="Fresh Ingredients" />
            <h3 className="text-white font-[Kalam] text-[40px] mt-6 text-center font-normal">Fresh Ingredients</h3>
            <p className="w-[400px] font-[Kalam] font-thin text-center text-[20px] mt-[20px] text-white">Duo at tibique conclusionemque, nam modo ancillae tacimates et, cu vim omnes phaedrum</p>
          </div>
          <div className="ml-[150px] mt-[-20px] bg-transparent backdrop-blur-[3px] rounded-[25px]">
            <img src={D} className="h-[80px] w-[80px] ml-[150px]" alt="Food Delivery" />
            <h3 className="text-white font-[Kalam] text-[40px] mt-6 text-center font-normal">Food Delivery</h3>
            <p className="w-[400px] font-[Kalam] font-thin text-center text-[20px] mt-[20px] text-white">Duo at tibique conclusionemque, nam modo ancillae tacimates et, cu vim omnes phaedrum</p>
          </div>
        </div>

        <div className="pt-[80px] flex mb-[60px]">
          <div className="ml-[150px] mt-[-20px] bg-transparent backdrop-blur-[3px] rounded-[25px]">
            <img src={I} className="h-[80px] w-[80px] ml-[150px]" alt="Special Desserts" />
            <h3 className="text-white font-[Kalam] text-[40px] mt-6 text-center font-normal">Special Desserts</h3>
            <p className="w-[400px] font-[Kalam] font-thin text-center text-[20px] mt-[20px] text-white">Duo at tibique conclusionemque, nam modo ancillae tacimates et, cu vim omnes phaedrum</p>
          </div>
          <div className="ml-[150px] mt-[-20px] bg-transparent backdrop-blur-[3px] rounded-[25px]">
            <img src={WA} className="h-[80px] w-[80px] ml-[150px]" alt="Private Events" />
            <h3 className="text-white font-[Kalam] text-[40px] mt-6 text-center font-normal">Private Events</h3>
            <p className="w-[400px] font-[Kalam] font-thin text-center pb-[30px] text-[20px] mt-[20px] text-white">Duo at tibique conclusionemque, nam modo ancillae tacimates et, cu vim omnes phaedrum</p>
          </div>
        </div>
      </div >
<br />
      <Footer/>
    </div>
  );
};

export default AboutUs;
