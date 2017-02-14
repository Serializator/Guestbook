<?php
    try {
        $connection = new PDO('mysql:host=127.0.0.1;dbname=guestbook', 'root', 'root');
    } catch(PDOException $exception) {
        print('Connection Failed: ' . $exception->getMessage());
        http_response_code(500);
    }
?>
