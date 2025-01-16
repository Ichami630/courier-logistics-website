<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// CORS headers for cross-origin requests
header("Access-Control-Allow-Origin: *"); // Allow all domains or replace with your frontend URL
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow necessary headers

include_once('connection.php');
$conn = Connection::getConnection();
if(isset($_GET['trackingNumber'])){

}else{
    $sql = "SELECT sp.name AS shipperName,r.name AS receiverName,s.tracking_number,ss.name AS status FROM tbl_shipment s 
        JOIN tbl_shipper sp ON s.shipper_id = sp.shipper_id 
        JOIN tbl_receiver r ON s.receiver_id = r.receiver_id 
        JOIN tbl_shipmentHistory sh ON s.shipment_id = sh.shipment_id 
        JOIN lkup_shipmentStatus ss ON sh.status_id = ss.id 
    ORDER BY s.created_at DESC";
    $result = $conn->query($sql);
    $shipment = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode(['success' => true, 'shipment' => $shipment]);
}
?>