// NewShipment.js
import React from 'react';
import ShipmentForm from '../../components/admincomponents/ShipmentForm';

const NewShipment = () => {
  const handleSubmit = (formData) => {
    // Handle form submission for new shipment
    console.log('New shipment data:', formData);
    // Add your submit logic here (e.g., API call)
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">New Shipment</h1>
      <ShipmentForm onSubmit={handleSubmit} isEditing={false} />
    </div>
  );
};

export default NewShipment;
