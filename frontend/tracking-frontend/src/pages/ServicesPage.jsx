import React from 'react';
import { NavLink } from 'react-router-dom';
import Banner from '../components/Banner';
import Services from '../components/Services';

const ServicesPage = () => {
  const breadcrumb = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
  ];

  return (
    <div>
      {/* Banner Section */}
      <Banner
        image="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
        title="Our Services"
        breadcrumb={breadcrumb}
      />

      {/* Intro Section */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-6">
          Explore Our Wide Range of Services
        </h2>
        <p className="text-center text-lg text-gray-600 mb-10">
          From freight handling to real-time online tracking, we provide comprehensive logistics solutions designed to meet your business and personal needs. Let us take care of your shipments with unmatched professionalism and efficiency.
        </p>
      </div>

      {/* Services Component */}
      <Services />

      {/* Additional Information Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Why Choose Our Services</h2>
          <p className="text-center text-lg text-gray-600 mb-10">
            Our services are crafted to provide the best value and experience. Here’s what sets us apart:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 shadow-md rounded-lg bg-gray-100 text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Reliable & Secure</h3>
              <p className="text-gray-600">
                Your packages are handled with the utmost care and delivered securely every time.
              </p>
            </div>
            <div className="p-6 shadow-md rounded-lg bg-gray-100 text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Global Coverage</h3>
              <p className="text-gray-600">
                With an extensive network, we deliver to over 200 countries worldwide.
              </p>
            </div>
            <div className="p-6 shadow-md rounded-lg bg-gray-100 text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Real-Time Tracking</h3>
              <p className="text-gray-600">
                Stay updated with real-time tracking of your shipments at every step.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-500 py-12 text-white mb-10 md:mx-10 md:rounded-md">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6">
            Let us handle your logistics needs with our reliable and efficient services. Get in touch today!
          </p>
          <NavLink className="bg-primary-100 text-white p-4 rounded-full font-semibold hover:bg-accent-100 transition-colors" to="/contact">
            Contact Us Now
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
