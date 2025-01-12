import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96 mt-10">
        <FaExclamationTriangle className='text-accent-100 text-6xl mb-4' />
      <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
      <p className="text-xl mb-5">This page does not exist</p>
      <Link
        to="/index"
        className="text-white bg-accent-100  rounded-md px-3 py-2 mt-4"
        >Go Back</Link>
    </section>
  )
}

export default NotFound