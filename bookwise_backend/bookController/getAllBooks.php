<?php
    require('../db/db.php');

    $query = 'SELECT * FROM collection';

    $result = mysqli_query($conn,$query);
    $books = mysqli_fetch_all($result,MYSQLI_ASSOC);

    $responseData = json_encode($books);
    header('Content-Type: application/json');

    echo $responseData;

    mysqli_free_result($result);
    mysqli_close($conn);

?>