import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ShipmentFields from './ShipmentFields';
import api from '../../utils/api';

const ShipmentForm = () => {
  const { trackingNumber } = useParams();

  const [shipmentTypes, setShipmentTypes] = useState([]);
  const [shipmentModes, setShipmentModes] = useState([]);
  const [paymentModes, setPaymentModes] = useState([]);
  const [carriers, setCarriers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [shipmentStatus, setShipmentStatus] = useState([]);

  const [formData, setFormData] = useState({
    trackingNumber: trackingNumber || '',
    shipperName: '',shipperNumber: '',shipperEmail: '',shipperAddress: '',
    receiverName: '',receiverNumber: '',receiverEmail: '',receiverAddress: '',
    shipmentType: '',shipmentWeight: '',shipmentPackages: '',shipmentProduct: '',
    paymentMode: '',carrier: '',quantity: '',shipmentMode: '',origin: '',
    destination: '',departureTime: '',pickupTime: '',pickupDate: '',comment: '',
    historyDate: '',historyTime: '',historyLocation: '',historyStatus: '',
  });

  //fetch the shipment if tracking number is parse
  useEffect(() => {
    const fetchShipmentDetails = async () => {
      if(trackingNumber) {
        try {
          const response = await api.get(`getshipment.php?trackingNumber=${trackingNumber}`);
          if(response.data.success){
            setFormData((prev) => ({
              ...prev,
              ...response.data.shipmentdetails,
              trackingNumber, // Ensure tracking number is set
            }));
          }
        } catch (error) {
          console.log('Error while fetching shipment details:',error);
          toast.error('Opps something when wrong while fetching shipment details');
        }
      }
    };
    fetchShipmentDetails();
  },[trackingNumber]);

  //handle input change
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => (
      {...prev,[name]: value,}
    ));
  };

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await api.post('shipment.php',formData);
      if(response.data.success){
        toast.success(response.data.message);
      }else{
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error Details:',error);
      toast.error('An unexpected error occured');
    }
  };
  //fetching predefined options from backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('getvalues.php');
        setShipmentTypes(res.data.shipmentTypes);
        setPaymentModes(res.data.paymentModes);
        setShipmentModes(res.data.shipmentModes);
        setCarriers(res.data.carriers);
        setLocations(res.data.locations);
        setShipmentStatus(res.data.status);
      } catch (error) {
        console.log("Error fetching options",error);
      }
    };
    fetchData();
  },[]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{trackingNumber ? 'Update Shipment': 'New Shipment'}</h1>
      <form className="grid gap-6 lg:grid-cols-4" onSubmit={handleSubmit}>
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-3">
          {/* Tracking Number */}
          <div className="p-6 bg-white rounded-lg shadow">
            <label className="block mb-2 text-sm font-medium text-gray-700">Tracking Number</label>
            <input
              type="text"
              name='trackingNumber'
              value={formData.trackingNumber || 'Auto-generated tracking number'}
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
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                  // required
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
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                  // required
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
                    name={field.name}
                    onChange={handleChange}
                    value={formData[field.name] || ''}
                    required
                    className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                    // required
                  >
                    <option value="">Select {field.label}</option>
                    {/* Dynamically get the corresponding state using field.table */}
                    {Array.isArray(eval(field.table)) &&
                      eval(field.table).map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    onChange={handleChange}
                    value={formData[field.name]}
                    required
                    className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                    // required
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                    // required
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
                  name={field.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                  // required
                >
                  <option value="">Select {field.label}</option>
                  {Array.isArray(eval(field.table)) &&
                      eval(field.table).map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))
                  }
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
                  // required
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
