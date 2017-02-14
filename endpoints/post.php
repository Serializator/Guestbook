<?php
    require_once('snippets/database.php');

    foreach(array(`firstName`, `lastName`, `email`, `ip`, `comment`) as $key) {
        if(empty($_GET[$key])) {
            return;
        }
    }

    try {
        $query = $connection->prepare('INSERT INTO `comments` (`first_name`, `last_name`, `email`, `ip`, `comment`) VALUES (?, ?, ?, ?, ?);');
        $query->execute(array($_GET['firstName'], $_GET['lastName'], $_GET['email'], $_SERVER['REMOTE_ADDR'], $_GET['comment']));
    } catch(PDOException $exception) {
        print('Query Failed: ' . $exception->getMessage())
        http_response_code(500);
    }
?>
