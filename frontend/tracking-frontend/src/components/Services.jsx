import React from 'react';

import proofofdelivery from '../assets/images/proofofdelivery.jpg';
import imports from '../assets/images/imports.jpg';
import freight from '../assets/images/freight.jpg';
import tracking from '../assets/images/online-tracking.jpg';

const Services = () => {
  const services = [
    {
      id: 1,
      image: freight,
      title: 'Freight',
      description: 'Efficient and secure freight services for all your logistics needs.',
    },
    {
      id: 2,
      image: proofofdelivery,
      title: 'Proof of Delivery',
      description: 'Get real-time proof of delivery for every shipment.',
    },
    {
      id: 3,
      image: imports,
      title: 'Imports',
      description: 'Reliable import solutions tailored to your business.',
    },
    {
      id: 4,
      image: tracking,
      title: 'Online Tracking',
      description: 'Track your shipments online in real time with ease.',
    },
  ];

  return (
    <div className="bg-gray-50 mb-10">
      <div className="max-w-7xl">
        {/* <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative group overflow-hidden shadow-md bg-gray-200"
              style={{ height: '300px' }}
            >
              {/* Background Image */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-opacity duration-300"></div>

              {/* Text Content */}
              <div className="relative z-10 text-center text-white flex flex-col justify-center items-center px-4 py-6 h-full">
                <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                <div className="h-1 w-10 bg-primary-200 mb-3"></div>
                <p className="text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
