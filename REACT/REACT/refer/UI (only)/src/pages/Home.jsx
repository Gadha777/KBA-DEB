import React from 'react'
import Hero from '../components/Hero'
import TopCourses from '../components/TopCourse.jsx'
import CourseGrid from '../components/CourseGrid'
import coursesData from '../data/courses.json'
import ViewAllCourseButton from '../components/ViewAllCourseButton'
import MainLayout from '../layouts/MainLayout.jsx'

const Home = () => {
  const TopCourse=coursesData.slice(0,3);
  return (
    <div>
    <MainLayout/>
    <Hero/>
    <TopCourses/> 
    <CourseGrid courses={TopCourse}/> 
    <ViewAllCourseButton/>
    </div>
  )
}

export default Home