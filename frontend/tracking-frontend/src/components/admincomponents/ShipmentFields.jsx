import React from 'react';

const ShipmentFields = {
    shipperDetails: [
        { id: 1, label: "Name", type: "text", name: "shipperName", },
        { id: 2, label: "Phone Number", type: "text", name: "shipperNumber", },
        { id: 3, label: "Email", type: "email" , name: "shipperEmail",},
        { id: 4, label: "Address", type: "text", name: "shipperAddress", },
    ],

    receiverDetails: [
        { id: 1, label: "Name", type: "text", name: "receiverName", },
        { id: 2, label: "Phone Number", type: "text", name: "receiverNumber", },
        { id: 3, label: "Email", type: "email", name: "receiverEmail", },
        { id: 4, label: "Address", type: "text", name: "receiverAddress", },
    ],

    shipmentStatus: [
        { id: 1, label: "Date", type: "date", name: "historyDate", },
        { id: 2, label: "Time", type: "time", name: "historyTime", },
        { id: 3, label: "Location", type: "text", name: "historyLocation", },
        { id: 4, label: "Status", type: "dropdown", table: 'shipmentStatus', name: "historyStatus",},
    ],

    shipmentDetails: [
        { label: "Type of Shipment", type: "dropdown", key: 1, table: "shipmentTypes", name: "shipmentType", },
        { label: "Weight", type: "text", key: 2, table: "weight", name: "shipmentWeight", },
        { label: "Packages", type: "text", key: 3, table: "packages", name: "shipmentPackages", },
        { label: "Product", type: "text", key: 4, table: "product", name: "shipmentProduct", },
        { label: "Payment Mode", type: "dropdown", key: 5, table: "paymentModes", name: "paymentMode", },
        { label: "Carrier", type: "dropdown", key: 6, table: "carriers", name: "carrier", },
        { label: "Quantity", type: "text", key: 7, table: "quantity", name: "quantity", },
        { label: "Mode", type: "dropdown", key: 8, table: "shipmentModes", name: "shipmentMode", },
        { label: "Origin", type: "dropdown", key: 9, table: "locations", name: "origin", },
        { label: "Destination", type: "dropdown", key: 10, table: "locations", name: "destination", },
        { label: "Departure Time", type: "time", key: 11, table: "departureTime", name: "departureTime", },
        { label: "Pickup Time", type: "time", key: 12, table: "pickupTime", name: "pickupTime", },
        { label: "Pickup Date", type: "date", key: 13, table: "pickupDate", name: "pickupDate", },
        { label: "Comment", type: "textarea", key: 14, table: "comment", name: "comment", },
    ]
};

export default ShipmentFields;
