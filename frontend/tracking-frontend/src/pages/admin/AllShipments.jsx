import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllShipments = () => {
  // Example data - you can replace this with data fetched from your backend
  const shipments = [
    { id: 1, shipper: "John Doe", receiver: "Jane Smith", trackingNumber: "TRK12345", status: "Shipped" },
    { id: 2, shipper: "Alice Cooper", receiver: "Bob Martin", trackingNumber: "TRK23456", status: "In Transit" },
    { id: 3, shipper: "Mary Johnson", receiver: "Steve Harris", trackingNumber: "TRK34567", status: "Delivered" },
    { id: 4, shipper: "Tom Hanks", receiver: "Sarah O'Connor", trackingNumber: "TRK45678", status: "Shipped" },
    { id: 5, shipper: "James Bond", receiver: "Moneypenny", trackingNumber: "TRK56789", status: "In Transit" },
    { id: 6, shipper: "Bruce Wayne", receiver: "Alfred Pennyworth", trackingNumber: "TRK67890", status: "Delivered" },
    { id: 7, shipper: "Clark Kent", receiver: "Lois Lane", trackingNumber: "TRK78901", status: "Shipped" },
    { id: 8, shipper: "Peter Parker", receiver: "Mary Jane", trackingNumber: "TRK89012", status: "In Transit" },
    // Add more shipments here as needed
  ];

  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1); // Track current page

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
            {currentShipments.map((shipment) => (
              <tr key={shipment.id} className="border-b">
                <td className="px-4 py-3 text-sm text-gray-600">{shipment.shipper}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{shipment.receiver}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{shipment.trackingNumber}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      shipment.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : shipment.status === "In Transit"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {shipment.status}
                  </span>
                </td>
                <td className="flex gap-3 px-4 py-3 text-sm text-gray-600">
                  <NavLink 
                    to={`/admin/shipment/edit/${shipment.trackingNumber}`}
                    className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </NavLink>
                  <button className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
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
