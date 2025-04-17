<?php
header('Content-Type: application/json');

// CORS headers for cross-origin requests
header("Access-Control-Allow-Origin: *"); // Allow all domains or replace with your frontend URL
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow necessary headers


require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

include_once('connection.php');

// Shared connection
$conn = Connection::getConnection();

// Secret key for signing tokens
$SECRET_KEY = getenv('JWT_SECRET_KEY') ? : 'mySuperSecretKey123!';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    $stmt = $conn->prepare('SELECT * FROM users WHERE email = ?');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        // Generate JWT token
        $payload = [
            // 'iss' => 'http://tracking-website.local/backend', // Issuer
            // 'aud' => 'localhost:5173', // Audience
            'iss' => 'https://prioritymailsolutions.com/backend', // Issuer
            'aud' => 'https://prioritymailsolutions.com', // Audience
            'iat' => time(), // Issued at
            'exp' => time() + 3600, // Expiry (1 hour)
            'data' => [ // User data
                'id' => $user['id'],
                'email' => $user['email']
            ]
        ];

        $jwt = JWT::encode($payload, $SECRET_KEY, 'HS256');
        echo json_encode(['success' => true, 'token' => $jwt]);
    } else {
        // Authentication fail
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid Credentials']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight OPTIONS request
    http_response_code(200);
    exit();
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Invalid method']);
}
?>
