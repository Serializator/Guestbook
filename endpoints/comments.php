<?php
    require_once('snippets/database.php');

    try {
        $comments = array();
        $offset = (empty($_GET['offset'] || !is_int($_GET['offset'])) ? 0 : $_GET['offset']);
        $query = $connection->prepare('SELECT `id`, `username`, `comment`, `date` FROM `comments` OFFSET ? ORDER BY `date`;');

        $query->execute(array($offset));

        while($comment = $query->fetch(PDO::FETCH_ASSOC)) {
            $comments[] = $comment;
        }

        print(json_encode($comments));
    } catch(PDOException $exception) {
        http_response_code(500);
        exit('Query Failed: ' . $exception->getMessage());
    }
?>
