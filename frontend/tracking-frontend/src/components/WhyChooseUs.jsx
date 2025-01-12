import React from "react";
import { FaShippingFast, FaShieldAlt, FaThumbsUp, FaClock } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaShippingFast className="text-4xl text-accent-100" />,
      title: "Fast Delivery",
      description: "Get your packages delivered quickly with our efficient logistics solutions.",
    },
    {
      id: 2,
      icon: <FaShieldAlt className="text-4xl text-accent-100" />,
      title: "Secure Handling",
      description: "We ensure your packages are handled with care and delivered safely.",
    },
    {
      id: 3,
      icon: <FaThumbsUp className="text-4xl text-accent-100" />,
      title: "Customer Satisfaction",
      description: "Our top priority is ensuring you have the best delivery experience.",
    },
    {
      id: 4,
      icon: <FaClock className="text-4xl text-accent-100" />,
      title: "24/7 Support",
      description: "Our team is available around the clock to assist you with your needs.",
    },
  ];

  return (
    <div className="bg-gray-100 py-4 mb-10">
      <div className="container mx-auto px-5 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white shadow-md hover:shadow-lg p-6 rounded-lg transition-shadow duration-300 flex flex-col items-center text-center"
            >
              {feature.icon}
              <h3 className="mt-4 text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
