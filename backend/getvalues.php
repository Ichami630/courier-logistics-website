<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

// CORS headers for cross-origin requests
header("Access-Control-Allow-Origin: *"); // Allow all domains or replace with your frontend URL
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow necessary headers


if($_SERVER['REQUEST_METHOD'] === 'GET'){
    include_once('connection.php');
    $conn = Connection::getConnection();

    $shipmentTypes = $conn->query("SELECT id, name from lkup_shipmentType")->fetch_all(MYSQLI_ASSOC);
    $shipmentModes = $conn->query("SELECT id, name FROM lkup_shipmentMode")->fetch_all(MYSQLI_ASSOC);
    $paymentModes = $conn->query("SELECT id, name FROM lkup_paymentMode")->fetch_all(MYSQLI_ASSOC);
    $carriers = $conn->query("SELECT id, name FROM lkup_shipmentCarrier")->fetch_all(MYSQLI_ASSOC);
    $locations = $conn->query("SELECT id, name FROM lkup_shipmentLocations")->fetch_all(MYSQLI_ASSOC);
    $status = $conn->query("SELECT id, name FROM lkup_shipmentStatus")->fetch_all(MYSQLI_ASSOC);

    echo json_encode([
        'shipmentTypes' => $shipmentTypes,
        'shipmentModes' => $shipmentModes,
        'paymentModes' => $paymentModes,
        'carriers' => $carriers,
        'locations' => $locations,
        'status' => $status
    ]);exit;
}
?>