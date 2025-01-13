// EditShipment.js
import React, { useEffect, useState } from 'react';
import ShipmentForm from '../../components/admincomponents/ShipmentForm';

const EditShipment = ({ shipmentId }) => {
  const [shipmentData, setShipmentData] = useState(null);

  useEffect(() => {
    // Fetch shipment data based on shipmentId (replace with actual API logic)
    const fetchShipmentData = async () => {
      const data = await fetch(`/api/shipments/${shipmentId}`);
      const json = await data.json();
      setShipmentData(json);
    };

    fetchShipmentData();
  }, [shipmentId]);

  const handleSubmit = (formData) => {
    // Handle form submission for editing shipment
    console.log('Updated shipment data:', formData);
    // Add your submit logic here (e.g., API call to update shipment)
  };

//   if (!shipmentData) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Edit Shipment</h1>
      <ShipmentForm onSubmit={handleSubmit} shipmentData={shipmentData} isEditing={true} />
    </div>
  );
};

export default EditShipment;
