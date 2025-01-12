import React from "react";
import CountUp from "react-countup";

const StatsCounter = () => {
  const stats = [
    { id: 1, title: "Total Deliveries", value:800, suffix: "+" },
    { id: 2, title: "Countries Covered", value: 50, suffix: "+" },
    { id: 3, title: "Happy Clients", value: 5000, suffix: "+" },
    { id: 4, title: "Logistics Profesionals", value: 120, suffix: "+" },
  ];

  return (
    <div className=" text-white mb-10 py-8">
      <div className="container mx-auto px-5">
        <h2 className="text-center text-gray-800 text-3xl font-bold mb-8">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-4xl font-extrabold text-accent-100">
                <CountUp start={0} end={stat.value} duration={3} suffix={stat.suffix} />
              </h3>
              <p className="mt-3 text-lg font-medium">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;
