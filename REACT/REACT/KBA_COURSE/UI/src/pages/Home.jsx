import React from 'react'
import Hero from '../components/Hero'
import TopCourses from '../components/TopCourse.jsx'
import CourseGrid from '../components/CourseGrid'
import ViewAllCourseButton from '../components/ViewAllCourseButton'
import MainLayout from '../layouts/MainLayout.jsx'

const Home = () => {
  return (
    <div>
 
      <Hero/>
      <TopCourses/> 
      <CourseGrid isHome={true}/> 
      <ViewAllCourseButton/>
   

    </div>
  )
}

export default Home