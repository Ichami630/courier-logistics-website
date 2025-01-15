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

// Shared instance of the database
$conn = Connection::getConnection();

// Respective table names
$tables = [
    'shipmentType' => 'lkup_shipmentType',
    'shipmentMode' => 'lkup_shipmentMode',
    'shipmentCarrier' => 'lkup_shipmentCarrier',
    'paymentModes' => 'lkup_paymentMode',
    'shipmentStatus' => 'lkup_shipmentStatus',
    'shipmentLocations' => 'lkup_shipmentLocations'
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the POST data
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Invalid input data.']);
        exit;
    }

    // Update the database
    foreach ($tables as $key => $table) {
        if (!isset($data[$key])) continue;

        // Extract new values from the input
        $newValues = array_map('trim', explode(',', $data[$key]));

        // Step 1: Delete entries that are no longer in the new values
        $placeholders = implode(',', array_fill(0, count($newValues), '?'));
        $deleteQuery = "DELETE FROM $table WHERE name NOT IN ($placeholders)";
        $stmt = $conn->prepare($deleteQuery);
        if (!$stmt) {
            echo json_encode(['success' => false, 'message' => "Error preparing delete statement: " . $conn->error]);
            exit;
        }
        $stmt->bind_param(str_repeat('s', count($newValues)), ...$newValues);
        if (!$stmt->execute()) {
            echo json_encode(['success' => false, 'message' => "Error deleting obsolete records: " . $stmt->error]);
            exit;
        }

        // Step 2: Insert or update new values
        foreach ($newValues as $value) {
            $stmt = $conn->prepare("
                INSERT INTO $table (name) 
                VALUES (?) 
                ON DUPLICATE KEY UPDATE name = VALUES(name)
            ");
            if (!$stmt) {
                echo json_encode(['success' => false, 'message' => "Error preparing insert statement: " . $conn->error]);
                exit;
            }
            $stmt->bind_param('s', $value);
            if (!$stmt->execute()) {
                echo json_encode(['success' => false, 'message' => "Error inserting/updating value '$value' into table $table: " . $stmt->error]);
                exit;
            }
        }
    }

    // Success
    echo json_encode(['success' => true, 'message' => 'Saved Successfully']);
    exit;
}else if($_SERVER['REQUEST_METHOD'] === 'GET'){
    //fetching data from the database
    $response = [];

    foreach($tables as $key => $table){
        $result = $conn->query("SELECT name FROM $table");

        if($result){
            $values = [];
            while($row = $result->fetch_assoc()){
                $values[] = $row['name'];
            }

            $response[$key] = implode(',',$values);// join values with commas
        }else{
            $response[$key] = ''; //empty string if no data
        }
    }

    echo json_encode(['success' => true, 'values' => $response]);exit;
}
?>
