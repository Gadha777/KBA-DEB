import React from 'react'
import{
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Addappointment from './Pages/Addappointment'
import Appointments from './Pages/Appointments'



const App = () => {
  const router=createBrowserRouter(createRoutesFromElements(
    <>
    {/* public Routes */}
    <Route path="/"element={<Login/>}/>
    <Route path="/signup"element={<Signup/>}/>
  
    <Route path="/home"element={<Home/>}/>
    <Route path="/addappointment"element={<Addappointment/>}/>
    <Route path="/Appointments"element={<Appointments/>}/>
   


    {/* <Route path="/viewappointment"element={<Viewappointment/>}/> */}

   
    </>
  ))
  return (
  <RouterProvider router={router}/>
  )
}

export default App