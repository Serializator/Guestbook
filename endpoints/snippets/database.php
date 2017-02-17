<?php
    try {
        $connection = new PDO('mysql:host=database;dbname=guestbook', 'root', 'root');
    } catch(PDOException $exception) {
        http_response_code(500);
        exit('Connection Failed: ' . $exception->getMessage());
    }
?>
