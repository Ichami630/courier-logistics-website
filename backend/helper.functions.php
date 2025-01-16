<?php
function generateTrackingNumber($conn){
    $prefix = 'PMS';
    $suffix = 'CARGO';

    //generate unique 12 digit number
    $uniqueNumber = str_pad(mt_rand(1,999999999999),12,'0',STR_PAD_LEFT);

    //concatenate to form the tracking number
    $trackingNumber = $prefix.$uniqueNumber.$suffix;

    //check if the tracking number already exist in the database
    $stmt = $conn->prepare("SELECT COUNT(*) FROM tbl_shipment WHERE tracking_number = ?");
    $stmt->bind_param('s',$trackingNumber);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    //if the tracking number already exist regenerate else return
    if($count > 0){
        return generateTrackingNumber($conn);//recursively generates a new tracking number
    }

    return $trackingNumber;
}
?>