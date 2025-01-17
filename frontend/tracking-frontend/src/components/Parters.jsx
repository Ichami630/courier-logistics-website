import React from 'react';
import usps from '../assets/images/usps.png'
import ups from '../assets/images/ups.jpeg';
import fedex from '../assets/images/fedex.jpeg';
import dhl from '../assets/images/dhl.jpeg';
const Partners = () => {
  const partners = [
    { id: 1, name: 'UPS', logo: ups },
    { id: 2, name: 'USPS', logo: usps },
    { id: 3, name: 'FedEx', logo: fedex },
    { id: 4, name: 'DHL', logo: dhl },
  ];

  return (
    <div className="bg-transparent py-12">
      <div className="container mx-auto px-5 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex justify-center items-center p-4 hover:scale-105 transform transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-24 h-auto"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
