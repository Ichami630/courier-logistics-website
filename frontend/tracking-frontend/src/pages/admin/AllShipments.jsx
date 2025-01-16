import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllShipments = () => {
  // Example data - you can replace this with data fetched from your backend
  const [shipments, setShipments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 5; // Number of items to display per page

  //fetch all existing shipments
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await api.get('getshipment.php');
        if(response.data.success){
          setShipments(response.data.shipment);
        }else{
          toast.error('error fetching data');
        }
      } catch (error) {
        console.log('Error fetch shipments',error);
      }
    };
    fetchAll();
  },[]);

  //delete shipment
  const handleDelete = async (shipment_id,shipper_id,receiver_id) => {
    try {
      if(window.confirm("Warning!!!: Are you sure you want to delete this shipment?")){
        const response =await api.delete('deleteshipment.php',{
          data: {shipmentId: shipment_id,shipperId: shipper_id,receiverId:receiver_id}
        });
        if(response.data.success){
          toast.success('Shipment deleted successfully');
        }else{
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log("Error deleting shipment: ",error)
      toast.error("Something wrong, failed to delete shipment");
    }

  }

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice the shipments array to only show the current page items
  const currentShipments = shipments.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(shipments.length / itemsPerPage);

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">All Shipments</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-left text-gray-700">Shipper</th>
              <th className="px-4 py-3 text-sm font-medium text-left text-gray-700">Receiver</th>
              <th className="px-4 py-3 text-sm font-medium text-left text-gray-700">Tracking Number</th>
              <th className="px-4 py-3 text-sm font-medium text-left text-gray-700">Status</th>
              <th className="px-4 py-3 text-sm font-medium text-left text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentShipments.length > 0 ? 
              (currentShipments.map((shipment) => (
                <tr key={shipment.shipment_id} className="border-b">
                  <td className="px-4 py-3 text-sm text-gray-600">{shipment.shipperName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{shipment.receiverName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{shipment.tracking_number}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        shipment.status.toLowerCase() === "pending"
                          ? "bg-blue-100 text-blue-800"
                          : shipment.status.toLowerCase() === "in transit"
                          ? "bg-yellow-100 text-yellow-800"
                          : shipment.status.toLowerCase() === "on hold"
                          ? "bg-orange-100 text-orange-800"
                          : shipment.status.toLowerCase() === "delivered"
                          ? "bg-green-100 text-green-800"
                          : shipment.status.toLowerCase() === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800" // Default for unknown statuses
                      }`}
                    >
                      {shipment.status}
                    </span>
                  </td>
                  <td className="flex gap-3 px-4 py-3 text-sm text-gray-600">
                    <NavLink 
                      to={`/admin/shipment/edit/${shipment.tracking_number}`}
                      className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </NavLink>
                    <button className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(shipment.shipment_id,shipment.shipper_id,shipment.receiver_id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))): (
              <tr>
                 <td colSpan="5" className="text-center text-red-600 py-3">
                  ** No shipment Found **
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 mx-1 text-gray-800 bg-gray-300 rounded-lg hover:bg-gray-400"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            } hover:bg-blue-400`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="px-4 py-2 mx-1 text-gray-800 bg-gray-300 rounded-lg hover:bg-gray-400"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllShipments;
