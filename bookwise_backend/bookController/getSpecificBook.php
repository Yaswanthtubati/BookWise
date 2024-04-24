<?php

    require('../db/db.php');
    require('../cors/cors.php');

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        //get Raw post data
        $postData = file_get_contents("php://input");

        // Decode the JSON data
        $requestData = json_decode($postData, true);

        // Retrieve the data from the POST request
        $bookId = mysqli_real_escape_string($conn, $requestData["bookId"]);

        $query = "SELECT * FROM collection where id = '$bookId' ";

        $result = mysqli_query($conn, $query);

        if ($result) {

            $book = mysqli_fetch_all($result,MYSQLI_ASSOC);

            $responseData = json_encode($book);
            header('Content-Type: application/json');

            echo $responseData;
        } else {
            // If the query fails, return an error
            http_response_code(500); // Internal Server Error
            echo json_encode(array("error" => "Failed to insert data"));
        }
    } else {
        // If the request method is not POST, return an error
        http_response_code(405); // Method Not Allowed
        echo json_encode(array("error" => "Method not allowed"));
    }
?>
