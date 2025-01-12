import React from 'react';

const Partners = () => {
  const partners = [
    { id: 1, name: 'UPS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/UPS_Logo_Shield_2017.svg/800px-UPS_Logo_Shield_2017.svg.png' },
    { id: 2, name: 'USPS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/USPS_logo.svg/1024px-USPS_logo.svg.png' },
    { id: 3, name: 'FedEx', logo: 'https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp' },
    { id: 4, name: 'DHL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/DHL_Logo.svg/1024px-DHL_Logo.svg.png' },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-5 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Trusted Partners</h2>
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
