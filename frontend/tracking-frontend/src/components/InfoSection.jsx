import React from 'react';
import { FaClock, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const InfoSection = () => {
  const infoItems = [
    {
      id: 1,
      icon: <FaClock className="text-4xl text-primary-200" />,
      title: 'Opening Hours',
      description: 'Mon - Fri: 9:00 AM - 6:00 PM',
    },
    {
      id: 2,
      icon: <FaMapMarkerAlt className="text-4xl text-primary-200" />,
      title: 'Our Location',
      description: '123 Logistics Lane, Cityville',
    },
    {
      id: 3,
      icon: <FaEnvelope className="text-4xl text-primary-200" />,
      title: 'Our Contact',
      description: 'contact@prioritymailsolutions.com',
    },
  ];

  return (
    <div className="hidden md:flex bg-gray-900 text-white py-5 px-5 md:px-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {infoItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="mr-5">{item.icon}</div>
            <div>
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p className="text-sm mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
