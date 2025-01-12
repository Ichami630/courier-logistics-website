import React from 'react';

const Track = () => {
  return (
    <div className="mt-36 mb-20 mx-auto md:max-w-4xl rounded-lg shadow-lg bg-white">
      {/* Header */}
      <h2 className="py-8 px-4 font-bold text-2xl text-center text-primary-200">
        Track Your Package
      </h2>
      
      {/* Form */}
      <form action="" className="px-6 py-4 border-t border-gray-300">
        <h4 className="font-semibold text-gray-700 mb-4">Enter Consignment Number</h4>
        
        {/* Input and Button */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            name="tracking-number"
            placeholder="Enter Tracking Number"
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-100 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg px-4 py-3 font-bold text-white bg-accent-100 hover:bg-primary-100 transition-all"
          >
            Track Result
          </button>
        </div>
        
        {/* Example */}
        <h4 className="font-medium text-sm text-gray-600 mt-4">
          Ex: 1234
        </h4>
      </form>
    </div>
  );
};

export default Track;
