<?php
echo '<h2>hello world</h2>';exit;
header("Content-Type: application/json");

$response = [
    "message" => "Welcome to the courier tracking API!",
    "status" => 200
];
echo json_encode($response);
?>
