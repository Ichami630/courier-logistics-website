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
    $trackingNumber = $_GET['trackingNumber'];
    // Check if the tracking number exists in the database
    $checkSql = "SELECT COUNT(*) AS count FROM tbl_shipment WHERE tracking_number = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param('s', $trackingNumber);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result()->fetch_assoc();

    if ($checkResult['count'] == 0) {
        // Tracking number not found
        echo json_encode([
            'success' => false,
            'message' => 'Tracking number not found.',
        ]);
        exit;
    }
    
    $sql = "SELECT sp.name AS shipperName, sp.phone_number AS shipperNumber, sp.email AS shipperEmail, sp.address AS shipperAddress, r.name AS receiverName, r.phone_number AS receiverNumber, r.email AS receiverEmail, r.address AS receiverAddress,
            s.type_id  AS shipmentType,st.name AS shipment_type, s.weight AS shipmentWeight,s.packages AS shipmentPackages,s.product AS shipmentProduct,s.payment_id AS paymentMode, pm.name AS payment_mode,s.carrier_id AS carrier, sc.name AS shipmentCarrier, s.quantity,s.mode_id AS shipmentMode, sm.name AS shipment_Mode,s.origin_id AS origin, sl.name AS shipmentOrigin,s.destination_id AS destination, sld.name AS shipmentDestination, s.departure_time AS departureTime, s.pickup_time AS pickupTime, s.pickup_date pickupDate,s.comment FROM tbl_shipment s 
        JOIN tbl_shipper sp ON s.shipper_id = sp.shipper_id 
        JOIN tbl_receiver r ON s.receiver_id = r.receiver_id
        JOIN lkup_shipmentType st ON s.type_id = st.id
        JOIN lkup_paymentMode pm ON s.payment_id = pm.id
        JOIN lkup_shipmentCarrier sc ON s.carrier_id = sc.id
        JOIN lkup_shipmentMode sm ON s.mode_id = sm.id
        JOIN lkup_shipmentLocations sl ON s.origin_id = sl.id
        JOIN lkup_shipmentLocations sld ON s.destination_id = sld.id
    WHERE s.tracking_number =  ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s',$trackingNumber);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();

    // Query for shipment history
    $historySql = "SELECT sh.location, ss.name AS status, sh.created_at FROM tbl_shipmentHistory sh
    JOIN tbl_shipment s ON sh.shipment_id = s.shipment_id 
    JOIN lkup_shipmentStatus ss ON sh.status_id = ss.id 
    WHERE s.tracking_number = ? 
    ORDER BY created_at ASC";
    $historyStmt = $conn->prepare($historySql);
    $historyStmt->bind_param('s', $trackingNumber);
    $historyStmt->execute();
    $shipmentHistory = $historyStmt->get_result()->fetch_all(MYSQLI_ASSOC);

    //query the latest shipment status
    $statussql = "SELECT ss.name AS status FROM tbl_shipmentHistory sh 
        JOIN tbl_shipment s ON sh.shipment_id = s.shipment_id 
        JOIN lkup_shipmentStatus ss ON sh.status_id = ss.id 
        WHERE s.tracking_number = ? 
        ORDER BY sh.created_at 
    DESC LIMIT 1";
    $statusstmt = $conn->prepare($statussql);
    $statusstmt->bind_param('s',$trackingNumber);
    $statusstmt->execute();
    $status = $statusstmt->get_result()->fetch_assoc();   

    echo json_encode([
        'success' => true, 
        'shipmentdetails' => $result,
        'shipmenthistory' => $shipmentHistory,
        'status' => $status,
    ]);exit;
}else{
    $sql = "
    SELECT 
        s.shipment_id, 
        sp.shipper_id, 
        r.receiver_id, 
        sp.name AS shipperName, 
        r.name AS receiverName, 
        s.tracking_number, 
        ss.name AS status 
    FROM tbl_shipment s
    JOIN tbl_shipper sp ON s.shipper_id = sp.shipper_id
    JOIN tbl_receiver r ON s.receiver_id = r.receiver_id
    JOIN (
        SELECT shipment_id, status_id 
        FROM tbl_shipmentHistory 
        WHERE (shipment_id, created_at) IN (
            SELECT shipment_id, MAX(created_at) AS max_created_at
            FROM tbl_shipmentHistory
            GROUP BY shipment_id
        )
    ) sh_latest ON s.shipment_id = sh_latest.shipment_id
    JOIN lkup_shipmentStatus ss ON sh_latest.status_id = ss.id
    ORDER BY s.created_at DESC;
";
    $result = $conn->query($sql);
    $shipment = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode([
        'success' => true, 
        'shipment' => $shipment,
    ]);
}
?>