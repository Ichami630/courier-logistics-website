import React from 'react';
import { Link } from 'react-router-dom'; // Use react-router-dom for navigation if applicable

const Banner = ({ image, title, breadcrumb }) => {
  return (
    <div
      className="w-full h-[300px] md:h-[400px] bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay */}
      <div className="bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center text-white px-4">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center">{title}</h1>

        {/* Breadcrumb */}
        <nav className="mt-4">
          <ul className="flex text-sm md:text-base">
            {breadcrumb.map((crumb, index) => (
              <li key={index} className="flex items-center">
                <Link to={crumb.path} className="text-primary-100 hover:underline">
                  {crumb.label}
                </Link>
                {index < breadcrumb.length - 1 && (
                  <span className="mx-2">/</span> // Separator
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Banner;
