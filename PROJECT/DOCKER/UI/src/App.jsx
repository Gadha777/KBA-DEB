import React from 'react'
import{
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'
import Login from './pages/Login'; // Adjust the path as needed
import Signup from './pages/Signup';
import Home from './pages/Home'; // Adjust the path as needed
import About from './pages/About'; // Adjust the path as needed
import Menu from './pages/Menu'; // Adjust the path as 
import Reservation from './pages/Reservation';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Addmenu from './pages/Addmenu';
import Amenu from './pages/Amenu';
import Updatemenu from './pages/Updatemenu';
import Viewreservation from './pages/Viewreservation';
import Viewmessage from './pages/Viewmessage';
import Logout from './pages/Logout';

const App = () => {
  const router=createBrowserRouter(createRoutesFromElements(
    <>
    <Route path="/"element={<Login/>}/>
    <Route path="/signup"element={<Signup/>}/>
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/addmenu" element={<Addmenu />} />
        <Route path="/adminmenu" element={<Amenu />} />
        <Route path="/updatemenu/:dishname" element={<Updatemenu/>} />
        <Route path="/viewreservations" element={<Viewreservation />} />
        <Route path="/viewmessages" element={<Viewmessage />} />
        <Route path="/logout" element={<Logout />} />
        </>
  ))
  return (
  <RouterProvider router={router}/>
  )

};

export default App;










// import React from 'react'
// import Navbar from './components/Navbar'
// import Body from './components/Body'

// const App = () => {
//   return (
// <>

//       <Navbar />
//       <Body/>

// </>
//   )
// }

// export default App