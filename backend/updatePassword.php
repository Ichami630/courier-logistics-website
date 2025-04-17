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

if (!isset($data['id'], $data['oldPassword'], $data['newPassword'], $data['confirmPassword'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
    exit;
}

$user_id = $data['id'];
$oldPassword = $data['oldPassword'];
$newPassword = $data['newPassword'];
$confirmPassword = $data['confirmPassword'];

// Validate new passwords match
if ($newPassword !== $confirmPassword) {
    echo json_encode(['success' => false, 'message' => 'New passwords do not match.']);
    exit;
}

// Fetch user
$stmt = $conn->prepare("SELECT password FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $row = $result->fetch_assoc()) {
    // Verify old password
    if (password_verify($oldPassword, $row['password'])) {
        // Hash new password
        $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

        // Update password
        $update = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
        $update->bind_param("si", $hashedPassword, $user_id);
        if ($update->execute()) {
            echo json_encode(['success' => true, 'message' => 'Password updated successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update password.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Old password is incorrect.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'User not found.']);
}
?>
