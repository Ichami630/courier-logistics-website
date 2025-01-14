<?php 
$secret_key = getenv('WT_SECRET_KEY') ? : 'mySuperSecretKey123!';

echo '<p> hello '.$secret_key.'</p>';
?>