<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// Allow requests from your frontend
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once('connection.php');
$conn = Connection::getConnection();

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['id'], $data['username'], $data['email'], $data['number'], $data['address'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Missing required fields'
    ]);
    exit;
}

$id = $data['id'];
$username = $data['username'];
$email = $data['email'];
$number = $data['number'];
$address = $data['address'];

// You can add sanitization/validation here

$sql = "UPDATE users SET username = ?, email = ?, number = ?, address = ? WHERE id = ?";
$stmt = $conn->prepare($sql);

if ($stmt->execute([$username, $email, $number, $address, $id])) {
    echo json_encode([
        'success' => true,
        'message' => 'Profile updated successfully'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to update profile'
    ]);
}
?>