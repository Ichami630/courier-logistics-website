<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// CORS headers for cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,POST,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include_once('connection.php');
$conn = Connection::getConnection();

// Fetch all users
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

$users = $result->fetch_object();

echo json_encode([
    'success' => true,
    'profile' => $users,
]);
?>
