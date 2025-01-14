<?php
date_default_timezone_set("Africa/Douala");

class Connection {
    private static $connection = null;

    private function __construct() {
        //db connection variables
        $host = 'localhost';
        $user = 'root';
        $password = '12$%DOCKERichami237p@ssword';
        $database = 'courierDb';
        self::$connection = new mysqli($host,$user,$password,$database);

        if(self::$connection->connect_error){
            die('Connection error'.self::$connection->connect_error);
        }
    }

    public static function getConnection(){
        if(self::$connection === null){
            new Connection();
        }

        return self::$connection;
    }
}
?>