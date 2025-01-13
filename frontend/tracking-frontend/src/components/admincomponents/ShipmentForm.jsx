
import React, { useState, useEffect } from 'react';

const ShipmentForm = ({ shipmentData = {}, onSubmit, isEditing = false }) => {
  const [formData, setFormData] = useState({
    trackingNumber: shipmentData.trackingNumber || '',
    shipper: {
      name: shipmentData.shipper?.name || '',
      phone: shipmentData.shipper?.phone || '',
      email: shipmentData.shipper?.email || '',
      address: shipmentData.shipper?.address || '',
    },
    receiver: {
      name: shipmentData.receiver?.name || '',
      phone: shipmentData.receiver?.phone || '',
      email: shipmentData.receiver?.email || '',
      address: shipmentData.receiver?.address || '',
    },
    shipmentDetails: {
      typeOfShipment: shipmentData.shipmentDetails?.typeOfShipment || '',
      weight: shipmentData.shipmentDetails?.weight || '',
      packages: shipmentData.shipmentDetails?.packages || '',
      product: shipmentData.shipmentDetails?.product || '',
      paymentMode: shipmentData.shipmentDetails?.paymentMode || '',
      carrier: shipmentData.shipmentDetails?.carrier || '',
      departureTime: shipmentData.shipmentDetails?.departureTime || '',
      destination: shipmentData.shipmentDetails?.destination || '',
      pickupTime: shipmentData.shipmentDetails?.pickupTime || '',
      mode: shipmentData.shipmentDetails?.mode || '',
      quantity: shipmentData.shipmentDetails?.quantity || '',
      carrierReferenceNo: shipmentData.shipmentDetails?.carrierReferenceNo || '',
      origin: shipmentData.shipmentDetails?.origin || '',
      pickupDate: shipmentData.shipmentDetails?.pickupDate || '',
      expectedDeliveryDate: shipmentData.shipmentDetails?.expectedDeliveryDate || '',
      comment: shipmentData.shipmentDetails?.comment || '',
    },
    shipmentHistory: shipmentData.shipmentHistory || {
      date: '',
      time: '',
      location: '',
      status: '',
      remark: '',
    },
  });

  const handleInputChange = (e, category, field) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="grid gap-6 lg:grid-cols-4" onSubmit={handleSubmit}>
      {/* Main Content */}
      <div className="space-y-6 lg:col-span-3">
        {/* Tracking Number */}
        <div className="p-6 bg-white rounded-lg shadow">
          <label className="block mb-2 text-sm font-medium text-gray-700">Tracking Number</label>
          <input
            type="text"
            placeholder="Auto-generated tracking number"
            className="w-full p-2 border rounded-lg focus:outline-primary-100"
            readOnly
            value={formData.trackingNumber}
          />
        </div>

        {/* Shipper Details */}
        <div className="p-6 space-y-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-bold text-gray-700">Shipper Details</h2>
          {["Name", "Phone Number", "Email", "Address"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">{field}</label>
              <input
                type="text"
                placeholder={`Enter shipper ${field.toLowerCase()}`}
                className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                value={formData.shipper[field.toLowerCase()]}
                onChange={(e) => handleInputChange(e, 'shipper', field.toLowerCase())}
                required
              />
            </div>
          ))}
        </div>

        {/* Receiver Details */}
        <div className="p-6 space-y-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-bold text-gray-700">Receiver Details</h2>
          {["Name", "Phone Number", "Email", "Address"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">{field}</label>
              <input
                type="text"
                placeholder={`Enter receiver ${field.toLowerCase()}`}
                className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                value={formData.receiver[field.toLowerCase()]}
                onChange={(e) => handleInputChange(e, 'receiver', field.toLowerCase())}
                required
              />
            </div>
          ))}
        </div>

        {/* Shipment Details */}
        <div className="p-6 space-y-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-bold text-gray-700">Shipment Details</h2>
          {[
            { label: "Type of Shipment", type: "dropdown", key: "typeOfShipment" },
            { label: "Weight", type: "text", key: "weight" },
            { label: "Packages", type: "text", key: "packages" },
            { label: "Product", type: "text", key: "product" },
            { label: "Payment Mode", type: "dropdown", key: "paymentMode" },
            { label: "Carrier", type: "dropdown", key: "carrier" },
            { label: "Departure Time", type: "datetime-local", key: "departureTime" },
            { label: "Destination", type: "dropdown", key: "destination" },
            { label: "Pickup Time", type: "datetime-local", key: "pickupTime" },
            { label: "Mode", type: "dropdown", key: "mode" },
            { label: "Quantity", type: "text", key: "quantity" },
            { label: "Carrier Reference No", type: "text", key: "carrierReferenceNo" },
            { label: "Origin", type: "dropdown", key: "origin" },
            { label: "Pickup Date", type: "date", key: "pickupDate" },
            { label: "Expected Delivery Date", type: "date", key: "expectedDeliveryDate" },
            { label: "Comment", type: "textarea", key: "comment" },
          ].map(({ label, type, key }) => (
            <div key={label}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              {type === "dropdown" ? (
                <select
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                  value={formData.shipmentDetails[key]}
                  onChange={(e) => handleInputChange(e, 'shipmentDetails', key)}
                  required
                >
                  <option value="">Select {label}</option>
                </select>
              ) : type === "textarea" ? (
                <textarea
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                  value={formData.shipmentDetails[key]}
                  onChange={(e) => handleInputChange(e, 'shipmentDetails', key)}
                  required
                />
              ) : (
                <input
                  type={type}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                  value={formData.shipmentDetails[key]}
                  onChange={(e) => handleInputChange(e, 'shipmentDetails', key)}
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
        {["Date", "Time", "Location", "Status", "Remark"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{field}</label>
            <input
              type="text"
              placeholder={`Enter ${field.toLowerCase()}`}
              className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
              value={formData.shipmentHistory[field.toLowerCase()]}
              onChange={(e) => handleInputChange(e, 'shipmentHistory', field.toLowerCase())}
              required
            />
          </div>
        ))}

        {/* Action Buttons */}
        <div className="mt-4 sm:flex md:block sm:justify-end">
          <button
            type="submit"
            className="px-6 py-2 ml-4 text-white bg-blue-600 rounded-lg md:mt-2 hover:bg-blue-700"
          >
            {isEditing ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ShipmentForm;
