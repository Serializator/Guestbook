<?php
    require_once('snippets/database.php');

    $errors = array();

    if(empty($_POST['firstName'])) {
        array_push($errors, array(
            'field' => 'first-name',
            'type' => 'valueMissing'
        ));
    }

    if(empty($_POST['lastName'])) {
        array_push($errors, array(
            'field' => 'last-name',
            'type' => 'valueMissing'
        ));
    }

    if(empty($_POST['email'])) {
        array_push($errors, array(
            'field' => 'email',
            'type' => 'valueMissing'
        ));
    } else {
        $match = preg_match('/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/', $_POST['email']);

        if(($match === 0) || ($match === false)) {
            array_push($errors, array(
                'field' => 'email',
                'type' => 'typeMismatch'
            ));
        }
    }

    if(empty($_POST['website'])) {
        array_push($errors, array(
            'field' => 'website',
            'type' => 'valueMissing'
        ));
    } else {
        $match = preg_match('/https?:\/\/.+/', $_POST['website']);

        if(($match === 0) || ($match === false)) {
            array_push($errors, array(
                'field' => 'website',
                'type' => 'typeMismatch'
            ));
        }
    }

    if(empty($_POST['content'])) {
        array_push($errors, array(
            'field' => 'content',
            'type' => 'valueMissing'
        ));
    } else if(strlen($_POST['content']) > 126) {
        array_push($errors, array(
            'field' => 'content',
            'type' => 'tooLong'
        ));
    }

    if(sizeof($errors) > 0) {
        http_response_code(400);
        exit(json_encode($errors));
    }

    try {
        $query = $connection->prepare('INSERT INTO `comments` (`first_name`, `last_name`, `address`, `email`, `website`, `content`) VALUES (?, ?, ?, ?, ?, ?);');
        $query->execute(array($_POST['firstName'], $_POST['lastName'], $_SERVER['REMOTE_ADDR'], $_POST['email'], $_POST['website'], $_POST['content']));
    } catch(PDOException $exception) {
        http_response_code(500);
        exit('Something went wrong when we were trying to store your comment.');
    }
?>
