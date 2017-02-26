<?php
    require_once('snippets/database.php');

    $valid = true;

    if(empty($_POST['firstName']) || empty($_POST['lastName'])) {
        $valid = false;
    }

    if(empty($_POST['email'])) {
        $valid = false;
    } else {
        $match = preg_match('/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/', $_POST['email']);

        if(($match === 0) || ($match === false)) {
            $valid = false;
        }
    }

    if(empty($_POST['website'])) {
        $valid = false;
    } else {
        $match = preg_match('/https?:\/\/.+/', $_POST['website']);

        if(($match === 0) || ($match === false)) {
            $valid = false;
        }
    }

    if(empty($_POST['content']) || (strlen($_POST['content']) > 126)) {
        $valid = false;
    }

    if($valid !== true) {
        http_response_code(400);
        exit('Inappropriate Data');
    }

    try {
        $date = date('Y-m-d H:i:s');
        $query = $connection->prepare('INSERT INTO `comments` (`first_name`, `last_name`, `address`, `email`, `website`, `date`, `content`) VALUES (?, ?, ?, ?, ?, ?, ?);');
        $query->execute(array($_POST['firstName'], $_POST['lastName'], $_SERVER['REMOTE_ADDR'], $_POST['email'], $_POST['website'], $date, $_POST['content']));

        print(json_encode(array(
            'firstName' => $_POST['firstName'],
            'lastName' => $_POST['lastName'],
            'email' => $_POST['email'],
            'website' => $_POST['website'],
            'content' => $_POST['content'],
            'date' => $date,
            'gravatar' => md5($_POST['email']))));
    } catch(PDOException $exception) {
        http_response_code(500);
        exit('Something went wrong when we were trying to store your comment.');
    }
?>
