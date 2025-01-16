<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// CORS headers for cross-origin requests
header("Access-Control-Allow-Origin: *"); // Allow all domains or replace with your frontend URL
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Allow POST and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow necessary headers

include_once('connection.php');
$conn = Connection::getConnection();
if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    $data = json_decode(file_get_contents('php://input'),true);

    $shipment_id = (int)$data['shipmentId'] ?? NULL;
    $shipper_id = (int)$data['shipperId'] ?? NULL;
    $receiver_id = (int)$data['receiverId'] ?? NULL;

    $stmt = $conn->prepare("DELETE FROM tbl_shipment WHERE shipment_id =?");
    $stmt->bind_param('i',$shipment_id);
    if($stmt->execute()){
        $stmt =$conn->prepare("DELETE FROM tbl_shipper WHERE shipper_id = ?");
        $stmt->bind_param('i', $shipper_id);
        if($stmt->execute()){
            $stmt = $conn->prepare("DELETE FROM tbl_receiver WHERE receiver_id = ?");
            $stmt->bind_param('i', $receiver_id);
            if($stmt->execute()){
                echo json_encode(['success' => true]);exit;
            }
        }
    }else{
        echo json_encode(['success' => true, 'message' => 'Error deleting shipment: ' .$stmt->error]);exit;
    }
}
?>