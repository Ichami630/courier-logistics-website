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
include_once('helper.functions.php');
$conn = Connection::getConnection();
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $data = json_decode(file_get_contents('php://input'), true);

    //shipper details
    $shipperName = $data['shipperName'];
    $shipperNumber = $data['shipperNumber'];
    $shipperEmail = $data['shipperEmail'];
    $shipperAddress = $data['shipperAddress'];

    //receiver details
    $receiverName = $data['receiverName'];
    $receiverNumber = $data['receiverNumber'];
    $receiverEmail = $data['receiverEmail'];
    $receiverAddress = $data['receiverAddress'];

    //shipment details
    $shipmentType = (int)$data['shipmentType'];
    $weight = $data['shipmentWeight'];
    $packages = (int)$data['shipmentPackages'];
    $product = $data['shipmentProduct'];
    $paymentMode = (int)$data['paymentMode'];
    $carrier = (int)$data['carrier'];
    $quantity = (int)$data['quantity'];
    $shipmentMode = (int)$data['shipmentMode'];
    $origin = (int)$data['origin'];
    $destination = (int)$data['destination'];
    $departureTime = date('H:i:s', strtotime($data['departureTime']));
    $pickTime = date('H:i:s', strtotime($data['pickupTime']));
    $pickupDate = date('Y-m-d', strtotime($data['pickupDate']));
    $comment = $data['comment'];

    //shipment history
    $date = date('Y-m-d',strtotime($data['historyDate']));
    $time = date('H:i:s',strtotime($data['historyTime']));
    $location = $data['historyLocation'];
    $status = (int)$data['historyStatus'];

    //generate a new tracking number
    $trackingNumber = generateTrackingNumber($conn);

    // Insert into the shipper table and get the shipper id
    $stmt = $conn->prepare("INSERT INTO tbl_shipper (name, phone_number, email, address) VALUES (?, ?, ?, ?)");
    $stmt->bind_param('ssss', $shipperName, $shipperNumber, $shipperEmail, $shipperAddress);

    if ($stmt->execute()) {
        // Get the last insert ID
        $shipper_id = $conn->insert_id;

        //go ahead and insert into the receiver table
        $stmt = $conn->prepare("INSERT INTO tbl_receiver (name, phone_number, email, address) VALUES (?, ?, ?, ?)");
        $stmt->bind_param('ssss', $receiverName, $receiverNumber, $receiverEmail, $receiverAddress);
        if($stmt->execute()){
            //last insert id
            $receiver_id = $conn->insert_id;

            //insert into the shipment table
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
            if($stmt->execute()){
                $shipment_id = $conn->insert_id;

                //insert shipment history
                $stmt = $conn->prepare("INSERT INTO tbl_shipmentHistory(shipment_id ,status_id ,location,date,time) VALUES(?,?,?,?,?)");
                $stmt->bind_param('iisss',$shipment_id,$status,$location,$date,$time);
                if($stmt->execute()){
                    $id = $conn->insert_id;
                    echo json_encode(['success' => true, 'message' => 'shipment created successfully']);
                }
            }else{
                echo json_encode(['success' => false, 'message' => 'Error:'.$stmt->error]);exit;
            }
        }else{
            echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
            exit;
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
        exit;
    }
}
?>