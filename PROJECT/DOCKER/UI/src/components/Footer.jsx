import React from 'react'
import img1 from '../assets/Backgrounds/gallery/location.png'
import img2 from '../assets/Backgrounds/gallery/reservation.png'
import img3 from '../assets/Backgrounds/gallery/reserva.png'
const Footer = () => {
  return (
    <div className="footer">
    <div>
      <img className="img1" src={img1} alt="Address" />
      <h3>ADDRESS</h3>
      <p>Epicure Restaurant <br /> 40 Park Ave, Kochi, Ernakulam</p>
    </div>
    <div>
      <img className="img2" src={img2} alt="Reservation" />
      <h3>RESERVATION</h3>
      <p>0000 0000 00 <br /> contact@Epicure.com</p>
    </div>
    <div>
      <img className="img3" src={img3} alt="Open Hours" />
      <h3>OPEN HOURS</h3>
      <p>
        Monday - Friday: 10 AM - 11 PM <br /> Saturday - Sunday: 9 AM - 1 PM
      </p>
    </div>
  </div>
  )
}

export default Footer