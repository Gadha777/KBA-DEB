import React from 'react'
import MainLayout from '../layouts/MainLayout'
import CourseGrid from '../components/CourseGrid'
import coursesData from'../data/courses.json'

const Courses = () => {
  return (
    <MainLayout>
    <h1 className='text-center text-2xl font-bold mt-10'>All Course</h1>
    <CourseGrid courses={coursesData}/>
    </MainLayout>  
)
}

export default Courses