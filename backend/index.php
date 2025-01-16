<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Example Shipment Data
include_once('connection.php');
include_once('helper.functions.php');
$conn = Connection::getConnection();

// $trackingNumber = generateTrackingNumber($conn);
// echo 'tracking NUmber:'.$trackingNumber;
$data = [
    'shipmentType' => 22, // integer
    'shipmentWeight' => '25kg', // varchar
    'shipmentPackages' => 3, // integer
    'shipmentProduct' => 'Electronics', // varchar
    'paymentMode' => 11, // integer
    'carrier' => 31, // integer
    'quantity' => '10 items', // varchar
    'shipmentMode' => 8, // integer
    'origin' => 20, // integer
    'destination' => 8, // integer
    'departureTime' => '14:30:00', // time
    'pickupTime' => '09:15:00', // time
    'pickupDate' => '2025-01-16', // date
    'comment' => 'Handle with care', // varchar
];

// Assigning variables
$shipmentType = (int)$data['shipmentType'];
$weight = $data['shipmentWeight'];
$packages = (int)$data['shipmentPackages'];
$product = $data['shipmentProduct'];
$paymentMode = (int)$data['paymentMode'];
$carrier = (int)$data['carrier'];
$quantity = $data['quantity'];
$shipmentMode = (int)$data['shipmentMode'];
$origin = (int)$data['origin'];
$destination = (int)$data['destination'];
$departureTime = $data['departureTime'];
$pickTime = $data['pickupTime'];
$pickupDate = $data['pickupDate'];
$comment = $data['comment'];

$shipper_id = 5;
$receiver_id = 1;
$trackingNumber = "PMS1584578090CARGO";

// Preparing the SQL statement
$stmt = $conn->prepare("
    INSERT INTO tbl_shipment 
    (tracking_number, shipper_id, receiver_id, type_id, weight, packages, product, payment_id, carrier_id, quantity, mode_id, origin_id, destination_id, departure_time, pickup_time, pickup_date, comment) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");
$stmt->bind_param('siiisisiiiiiissss', 
    $trackingNumber, $shipper_id, $receiver_id, $shipmentType, $weight, $packages, $product, 
    $paymentMode, $carrier, $quantity, $shipmentMode, $origin, $destination, $departureTime, 
    $pickTime, $pickupDate, $comment
);

// Executing the query and handling the result
if ($stmt->execute()) {
    $shipment_id = $conn->insert_id;
    echo 'sent successfully';
} else {
    echo 'error:'.$stmt->error;
}
$stmt->close();
?>