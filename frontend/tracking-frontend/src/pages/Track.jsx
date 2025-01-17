import React from 'react';
import { useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

import Banner from '../components/Banner';
import tracking from '../assets/images/online-tracking.jpg'

const Track = () => {
  const breadcrumb = [
    { label: 'Home', path: '/' },
    { label: 'Track & Trace', path: '/track' },
  ];
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [shipmentHistory, setShipmentHistory] = useState([]);
  const [shipmentStatus, setShipmentStatus] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.get(`getshipment.php?trackingNumber=${trackingNumber}`);
      if(response.data.success){
        setShipmentDetails(response.data.shipmentdetails);
        setShipmentHistory(response.data.shipmenthistory); // Update state here
        setShipmentStatus(response.data.status);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching shipment data:', error);
    } finally{
      setLoading(false);
    }
  };
  return (
    <>
      
      <Banner
        image={tracking}
        title="Track & Trace"
        breadcrumb={breadcrumb}
      />
      <div className="mt-10 mb-20 mx-auto md:max-w-4xl rounded-lg shadow-lg bg-white">
      {/* Header */}
      <h2 className="py-8 px-4 font-bold text-2xl text-center text-primary-200">
        Track Your Package
      </h2>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-4 border-t border-gray-300">
        <h4 className="font-semibold text-gray-700 mb-4">Enter Consignment Number</h4>
        
        {/* Input and Button */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
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
      {loading && <Spinner loading={true} />}
      {!loading && shipmentDetails &&(
      <>
        <div className="mt-10 mb-10 mx-auto md:max-w-5xl rounded-lg shadow-lg bg-white">
        <div className="px-6 py-6">
          <div className="mb-6">
            <div className="flex justify-between">
              <h3 className="font-bold text-xl text-primary-200">Shipment Details</h3>
              <p 
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                shipmentStatus.status.toLowerCase() === "pending"
                  ? "bg-blue-100 text-blue-800"
                  : shipmentStatus.status.toLowerCase() === "in transit"
                  ? "bg-yellow-100 text-yellow-800"
                  : shipmentStatus.status.toLowerCase() === "on hold"
                  ? "bg-orange-100 text-orange-800"
                  : shipmentStatus.status.toLowerCase() === "delivered"
                  ? "bg-green-100 text-green-800"
                  : shipmentStatus.status.toLowerCase() === "cancelled"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800" // Default for unknown statuses
              }`}
              >{shipmentStatus.status}</p>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
            <strong>Packages:</strong> {shipmentDetails.shipmentPackages}
            </div>
            <div>
              <strong>Shipment Type:</strong> {shipmentDetails.shipment_type}
            </div>
            <div>
              <strong>Weight:</strong> {shipmentDetails.shipmentWeight} 
            </div>
            <div>
              <strong>Product:</strong> {shipmentDetails.shipmentProduct}
            </div>
            <div>
              <strong>Quantity:</strong> {shipmentDetails.quantity}
            </div>
            <div>
              <strong>Origin:</strong> {shipmentDetails.shipmentOrigin}
            </div>
            <div>
              <strong>Destination:</strong> {shipmentDetails.shipmentDestination}
            </div>
            <div>
              <strong>Shipment Carrier:</strong> {shipmentDetails.shipmentCarrier}
            </div>
            <div>
              <strong>Shipment Mode:</strong> {shipmentDetails.shipment_Mode}
            </div>
            <div>
              <strong>Departure Time:</strong> {shipmentDetails.departureTime}
            </div>
            <div>
              <strong>Pickup Date:</strong> {shipmentDetails.pickupDate}
            </div>
            <div>
              <strong>Pickup Time:</strong> {shipmentDetails.pickupTime}
            </div>
            <div>
              <strong>Payment Mode:</strong> {shipmentDetails.payment_mode}
            </div>
            <div>
              <strong>Comment:</strong> {shipmentDetails.comment}
            </div>
          </div>
          </div>
        </div>
        </div>
        <div className="mt-10 mb-10 mx-auto md:max-w-5xl rounded-lg shadow-lg bg-white">
          <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-primary-200 mb-2">Shipper Info</h4>
              <p><strong>Name:</strong> {shipmentDetails.shipperName}</p>
              <p><strong>Phone:</strong> {shipmentDetails.shipperNumber}</p>
              <p><strong>Email:</strong> {shipmentDetails.shipperEmail}</p>
              <p><strong>Address:</strong> {shipmentDetails.shipperAddress}</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary-200 mb-2">Receiver Info</h4>
              <p><strong>Name:</strong> {shipmentDetails.receiverName}</p>
              <p><strong>Phone:</strong> {shipmentDetails.receiverNumber}</p>
              <p><strong>Email:</strong> {shipmentDetails.receiverEmail}</p>
              <p><strong>Address:</strong> {shipmentDetails.receiverAddress}</p>
            </div>
          </div>
          </div>
        </div>
        {/* shipment history here */}
          <div className="mt-10 mb-10 mx-auto md:max-w-3xl rounded-lg shadow-lg bg-white">
            <div className="px-6 py-6">
              <h3 className="font-bold text-xl text-primary-200">Shipment History</h3>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {shipmentHistory.map((history, index) => (
                  <React.Fragment key={index}>
                    <div>
                      <strong>Location:</strong> {history.location}
                    </div>
                    <div>
                      <strong>Status:</strong>
                        <span
                          className={`px-2 py-1 ml-2 text-xs font-semibold rounded-full ${
                            history.status.toLowerCase() === "pending"
                              ? "bg-blue-100 text-blue-800"
                              : history.status.toLowerCase() === "in transit"
                              ? "bg-yellow-100 text-yellow-800"
                              : history.status.toLowerCase() === "on hold"
                              ? "bg-orange-100 text-orange-800"
                              : history.status.toLowerCase() === "delivered"
                              ? "bg-green-100 text-green-800"
                              : history.status.toLowerCase() === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800" // Default for unknown statuses
                          }`}
                        >
                         {history.status}
                        </span>
                    </div>
                    <div>
                      <strong>Updated At:</strong> {history.created_at}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
      </>
      )}
    </>
  );
};

export default Track;
