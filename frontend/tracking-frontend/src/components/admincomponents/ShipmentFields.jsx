import React from 'react';

const ShipmentFields = {
    shipperDetails: [
        { id: 1, label: "Name", type: "text" },
        { id: 2, label: "Phone Number", type: "text" },
        { id: 3, label: "Email", type: "email" },
        { id: 4, label: "Address", type: "text" },
    ],

    receiverDetails: [
        { id: 1, label: "Name", type: "text" },
        { id: 2, label: "Phone Number", type: "text" },
        { id: 3, label: "Email", type: "email" },
        { id: 4, label: "Address", type: "text" },
    ],

    shipmentStatus: [
        { id: 1, label: "Date", type: "date" },
        { id: 2, label: "Time", type: "time" },
        { id: 3, label: "Location", type: "text" },
        { id: 4, label: "Status", type: "dropdown" },
    ],

    shipmentDetails: [
        { label: "Type of Shipment", type: "dropdown", key: "typeOfShipment" },
        { label: "Weight", type: "text", key: "weight" },
        { label: "Packages", type: "text", key: "packages" },
        { label: "Product", type: "text", key: "product" },
        { label: "Payment Mode", type: "dropdown", key: "paymentMode" },
        { label: "Carrier", type: "dropdown", key: "carrier" },
        { label: "Quantity", type: "text", key: "quantity" },
        { label: "Mode", type: "dropdown", key: "mode" },
        { label: "Origin", type: "dropdown", key: "origin" },
        { label: "Destination", type: "dropdown", key: "destination" },
        { label: "Departure Time", type: "time", key: "departureTime" },
        { label: "Pickup Time", type: "time", key: "pickupTime" },
        { label: "Pickup Date", type: "date", key: "pickupDate" },
        { label: "Comment", type: "textarea", key: "comment" },
    ]
};

export default ShipmentFields;
