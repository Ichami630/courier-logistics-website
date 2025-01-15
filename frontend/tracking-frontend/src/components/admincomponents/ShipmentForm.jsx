import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ShipmentFields from './ShipmentFields';
import Track from '../../pages/Track';

const ShipmentForm = () => {
  const { trackingNumber } = useParams(); 

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{trackingNumber ? 'Update Shipment': 'New Shipment'}</h1>
      <form className="grid gap-6 lg:grid-cols-4">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-3">
          {/* Tracking Number */}
          <div className="p-6 bg-white rounded-lg shadow">
            <label className="block mb-2 text-sm font-medium text-gray-700">Tracking Number</label>
            <input
              type="text"
              value={trackingNumber || 'Auto-generated tracking number'}
              className="w-full p-2 border rounded-lg focus:outline-primary-100"
              readOnly
            />
          </div>

          {/* Shipper Details */}
          <div className="p-6 space-y-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-bold text-gray-700">Shipper Details</h2>
            {ShipmentFields.shipperDetails.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                <input
                  type={field.type}
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                  required
                />
              </div>
            ))}
          </div>

          {/* Receiver Details */}
          <div className="p-6 space-y-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-bold text-gray-700">Receiver Details</h2>
            {ShipmentFields.receiverDetails.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                <input
                  type={field.type}
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                  required
                />
              </div>
            ))}
          </div>

          {/* Shipment Details */}
          <div className="p-6 space-y-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-bold text-gray-700">Shipment Details</h2>
            {ShipmentFields.shipmentDetails.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                {field.type === "dropdown" ? (
                  <select
                    className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                    required
                  >
                    <option value="">Select {field.label}</option>
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                    required
                  />
                ) : (
                  <input
                    type={field.type}
                    className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                    required
                  />
                )}
              </div>
            ))}
          </div>

          {/* Shipment History */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-bold text-gray-700">Shipment History</h2>
            <div className="flex items-center justify-center w-full h-64 bg-gray-200 rounded-lg">
              <p className="text-gray-500">Map Placeholder</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="p-6 bg-white rounded-lg shadow md:h-1/5 lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-700">Current Status</h2>
          {ShipmentFields.shipmentStatus.map((field) => (
            <div key={field.id} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              {field.type === 'dropdown' ? (
                <select
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                  required
                >
                  <option value="">Select {field.label}</option>
                </select>
              ) : (
                <input
                  type={field.type}
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                  required
                />
              )}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="mt-4 sm:flex md:block sm:justify-end">
            <button
              type="submit"
              className="px-6 py-2 ml-4 text-white bg-blue-600 rounded-lg md:mt-2 hover:bg-blue-700"
            >
              {trackingNumber ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShipmentForm;
