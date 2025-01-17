import React from 'react';
import Banner from '../components/Banner';
import banner1 from '../assets/images/banner1.jpg'
import { NavLink } from 'react-router-dom';
import About from '../components/About';

const AboutUsPage = () => {
  const breadcrumb = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about-us' },
  ];

  return (
    <div>
      {/* Banner Section */}
      <Banner
        image={banner1}
        title="About Us"
        breadcrumb={breadcrumb}
      />

      {/* About Section */}
      <About />

      {/* Vision & Mission Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the most trusted and innovative logistics partner,
                delivering unparalleled value and service across the globe.
              </p>
            </div>
            {/* Mission */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide reliable, efficient, and customer-focused logistics
                solutions that empower businesses and individuals to thrive.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Section: Core Values */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <h4 className="text-xl font-semibold mb-2">Integrity</h4>
              <p className="text-gray-600">
                We uphold the highest standards of integrity in every action we
                take.
              </p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <h4 className="text-xl font-semibold mb-2">Customer Focus</h4>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do, and their
                satisfaction drives us.
              </p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <h4 className="text-xl font-semibold mb-2">Innovation</h4>
              <p className="text-gray-600">
                We embrace innovation to provide cutting-edge solutions and
                improve our services.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-600 py-12 text-white md:mx-10 md:rounded-md mb-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-lg mb-6">
            Discover how we can make a difference for your logistics needs.
            Connect with us today!
          </p>
          <NavLink
          to='/contact'
           className="bg-primary-100 text-white px-6 py-3 rounded-full font-semibold hover:bg-accent-100 transition-colors">
            Contact Us
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
