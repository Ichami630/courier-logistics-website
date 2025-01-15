<?php
header('Content-Type: application/json');

// CORS headers for cross-origin requests
header("Access-Control-Allow-Origin: *"); // Allow all domains or replace with your frontend URL
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow necessary headers


if($_SERVER['REQUEST_METHOD'] === 'POST'){
    include_once('connection.php');
    $conn = Connection::getConnection();
    $data = json_decode(file_get_contents('php://input'),true);

    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Invalid input data.']);
        exit;
    }
    $tableName = $data['table'];
    $result = $conn->query("SELECT name FROM $tableName");
    if($result){
        $response = [];
        while($row = $result->fetch_assoc()){
            $response[] = $row['name'];
        }
    }

    //send the value to the frontend
    echo json_encode(['success' => true, 'values' => $response]);exit;



}
?>