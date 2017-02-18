<?php
    require_once('snippets/database.php');

    try {
        $comments = array();
        $query = $connection->prepare('SELECT `first_name` AS `firstName`, `last_name` AS `lastName`, `email`, `website`, `content` FROM `comments` ORDER BY `date` DESC;');

        $query->execute(array($offset));

        while($comment = $query->fetch(PDO::FETCH_ASSOC)) {
            $comments[] = $comment;
        }

        print(json_encode($comments));
    } catch(PDOException $exception) {
        http_response_code(500);
        exit('Something went wrong when we were trying fetch the comments.');
    }
?>
