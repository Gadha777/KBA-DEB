import React from 'react'
import{
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Signup from './pages/Signup'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Contact from './pages/Contact'
import Addcourses from './pages/Addcourses'
import Editcourse from './pages/Editcourse'
import Coursepage, { courseLoader } from './pages/Coursepage'
import Notfound from './pages/Notfound'

const App = () => {
  const router=createBrowserRouter(createRoutesFromElements(
    <>
    {/* public Routes */}
    <Route path="/"element={<LoginPage/>}/>
    <Route path="/signup"element={<Signup/>}/>
    {/* protected Routes */}
    <Route element={<AuthLayout/>}>
    <Route element={<MainLayout/>}>

    <Route path="/home"element={<Home/>}/>
    <Route path="/courses"element={<Courses/>}/>
    <Route path="/contact"element={<Contact/>}/>
    <Route path="/addcourse"element={<Addcourses/>}/>
    <Route path="/editcourse/:id"element={<Editcourse/>} loader={courseLoader}/>
    <Route path="/course/:id"element={<Coursepage/>} loader={courseLoader}/>
    </Route>
    </Route>
    {/* not found page */}
    <Route path='' element={<Notfound/>}/>
    </>
  ))
  return (
  <RouterProvider router={router}/>
  )
}

export default App