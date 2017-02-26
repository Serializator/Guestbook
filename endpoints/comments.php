<?php
    require_once('snippets/database.php');

    try {
        $comments = array();
        $query = $connection->prepare('SELECT `first_name` AS `firstName`, `last_name` AS `lastName`, `email`, `website`, `date`, `content` FROM `comments` ORDER BY `date` DESC;');

        $query->execute();

        while($comment = $query->fetch(PDO::FETCH_ASSOC)) {
            $comments[] = array(
                'firstName' => $comment['firstName'],
                'lastName' => $comment['lastName'],
                'email' => $comment['email'],
                'website' => $comment['website'],
                'content' => $comment['content'],
                'date' => $comment['date'],
                'gravatar' => md5($comment['email'])
            );
        }

        print(json_encode($comments));
    } catch(PDOException $exception) {
        http_response_code(500);
        exit('Something went wrong when we were trying fetch the comments.');
    }
?>
