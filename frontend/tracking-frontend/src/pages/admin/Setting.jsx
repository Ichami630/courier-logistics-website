import React, { useState } from "react";

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
  return (
    <form className="p-6 space-y-4 bg-white rounded-lg shadow">
      {/* Add Type of Shipment */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Add Type of Shipment
        </label>
        <input
          type="text"
          placeholder="e.g., Air Freight, International Shipping"
          className="w-full p-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Add Shipment Mode */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Add Shipment Mode
        </label>
        <input
          type="text"
          placeholder="e.g., Air Freight, Land Shipping"
          className="w-full p-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Shipment Locations */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shipment Locations
        </label>
        <input
          type="text"
          placeholder="e.g., New York, Los Angeles"
          className="w-full p-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Shipment Carrier */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shipment Carrier
        </label>
        <input
          type="text"
          placeholder="e.g., DHL, USPS"
          className="w-full p-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Shipment Payment Mode */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shipment Payment Mode
        </label>
        <input
          type="text"
          placeholder="e.g., CashApp, Bitcoin"
          className="w-full p-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Shipment Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shipment Status
        </label>
        <input
          type="text"
          placeholder="e.g., Pending, In Transit"
          className="w-full p-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Shipment Prefix */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shipment Prefix
        </label>
        <input
          type="text"
          placeholder="e.g., PMS"
          className="w-full p-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Shipment Suffix */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shipment Suffix
        </label>
        <input
          type="text"
          placeholder="e.g., Cargo"
          className="w-full p-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

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
