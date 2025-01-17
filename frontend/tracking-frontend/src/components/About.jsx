import React from 'react'
import about from '../assets/images/about.jpg'
const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <img
            src={about}
            alt="About Us"
            className="rounded-lg shadow-lg object-cover w-full h-96"
          />
          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="text-gray-600 mb-6">
              We are a leading courier and logistics company committed to
              providing efficient, reliable, and secure services to meet your
              personal and business needs. With years of experience and a
              dedicated team, we strive to deliver excellence in every shipment.
            </p>
            <p className="text-gray-600">
              Our commitment to innovation and customer satisfaction drives us
              to continuously improve our services, ensuring your packages are
              in safe hands and delivered on time, every time.
            </p>
          </div>
        </div>
      </div>
  )
}

export default About