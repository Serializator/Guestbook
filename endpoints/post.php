<?php
    require_once('snippets/database.php');

    foreach(array('firstName', 'lastName', 'email', 'website', 'content') as $key) {
        if(empty($_POST[$key])) {
            http_response_code(500);
            exit('Something went wrong when we were trying to read the data you gave us.');
        }
    }

    try {
        $query = $connection->prepare('INSERT INTO `comments` (`first_name`, `last_name`, `address`, `email`, `website`, `content`) VALUES (?, ?, ?, ?, ?, ?);');
        $query->execute(array($_POST['firstName'], $_POST['lastName'], $_SERVER['REMOTE_ADDR'], $_POST['email'], $_POST['website'], $_POST['content']));
    } catch(PDOException $exception) {
        http_response_code(500);
        exit('Something went wrong when we were trying to store your comment.');
    }
?>
