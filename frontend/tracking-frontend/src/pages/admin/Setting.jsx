import React, { useState,useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("general");

  const handleTabSwitch = (tab) => setActiveTab(tab);

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Settings</h1>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => handleTabSwitch("general")}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "general" ? "border-b-2 border-blue-600" : ""
          }`}
        >
          General Settings
        </button>
        <button
          onClick={() => handleTabSwitch("clientEmail")}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "clientEmail" ? "border-b-2 border-blue-600" : ""
          }`}
        >
          Client Email Settings
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "clientEmail" && <ClientEmailSettings />}
      </div>
    </div>
  );
};


const GeneralSettings = () => {
  // Define General Settings Form Fields in an Object
  const generalFormFields = [
    {id:1, name: "shipmentType", label: "Add Type of Shipment",type: "text", },
    {id:2, name: "shipmentMode", label: "Add Shipment Mode",type: "text" },
    {id:3, name: "shipmentCarrier", label: "Shipment Carrier", type: "text" },
    {id:4, name: "paymentModes", label: "Shipment Payment Mode", type: "text" },
    {id:5, name: "shipmentStatus", label: "Shipment Status", type: "text" },
  ];

  const [formData, setFormData] = useState({
    shipmentType: '',
    shipmentMode: '',
    shipmentCarrier: '',
    paymentModes: '',
    shipmentStatus: '',
    shipmentLocations: '',
  });

  //retreive data from database on page load
  useEffect(() => {
    const fetchValues = async () => {
      try {
        const response = await api.get('savesettings.php');
        if(response.data.success){
          setFormData(response.data.values);
        }else{
          toast.error('Failed to fetch setting values')
        }
      } catch (error) {
        console.error('Error fetching settings:', error.message);
      }
    };
    fetchValues();
  },[]);

  // Update formData on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post('savesettings.php', formData);
        if (response.data.success) {
            toast.success(response.data.message);  // Show success message
        } else {
            toast.error(response.data.message);  // Show error message
        }
    } catch (error) {
        console.error('Error details:', error.message);
        toast.error('An unexpected error occurred');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded-lg shadow ">
      {generalFormFields.map((field) => (
        <div key={field.id}>
          <label className="block text-sm font-medium text-gray-700" htmlFor={field.label}>{field.label}</label>
          <input
            className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            type="text"
          />
        </div>
      ))}
      <label className="block text-sm font-medium text-gray-700" htmlFor="shipmentLocations">shipment Locations</label>
      <textarea
          name="shipmentLocations"
          onChange={handleChange}
          value={formData.shipmentLocations}
          className="w-full p-2 mt-1 border rounded-lg focus:outline-primary-100"
      />
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Save Settings
        </button>
      </div>
    </form>
  );
};

const ClientEmailSettings = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-700">Client Email Settings</h2>
      <p className="mt-4 text-gray-600">Hello Client</p>
    </div>
  );
};

export default Setting;
