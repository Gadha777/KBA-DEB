import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Coursepage from "./pages/Coursepage"
import Addcourses from './pages/Addcourses'
import Contact from './pages/Contact'
import Editcourse from './pages/Editcourse'
import Courses from './pages/Courses'
import Notfound from './pages/Notfound'


const App = () => {
  return (
   <Router>
    <Routes>
      {/*Home pages*/}
        <Route path='/' element={<Home/>}/>
         {/*Courses pages*/}
        {/* <Route path='/courses' element={<Coursepage />}/> */}
        <Route path='/addcourse' element={<Addcourses />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/editpage/:id' element={<Editcourse />}/>
        <Route path='/course/:id' element={<Coursepage />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='*' element={<Notfound/>}/>

    </Routes> 
    </Router>
 
  )
}

export default App