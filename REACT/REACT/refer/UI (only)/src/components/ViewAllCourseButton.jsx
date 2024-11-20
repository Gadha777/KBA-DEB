import React from 'react'
import { Link } from 'react-router-dom'

const ViewAllCourseButton = () => {
  return (
    <div className='flex justify-center mb-40'>
        <Link to='/courses' className='w-80 h-10 py-2 text-center rounded-full bg-purple-500 text-white font-medium  hover:bg-purple-600' >View all Courses</Link>
    </div>
  )
}

export default ViewAllCourseButton