<?php

    session_start();

    require('../db/db.php');
    require('../cors/cors.php');

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        // Retrieve the user ID from the session

        // Retrieve the data from the DELETE request
        $postData = file_get_contents("php://input");
        $requestData = json_decode($postData, true);

        $bookId = mysqli_real_escape_string($conn, $requestData["bookId"]);
        $title = mysqli_real_escape_string($conn, $requestData["title"]);
        $author = mysqli_real_escape_string($conn, $requestData["author"]);
        $genre = mysqli_real_escape_string($conn, $requestData["genre"]);
        $pyear = mysqli_real_escape_string($conn, $requestData["pyear"]);

        // Construct the DELETE query
        $query = "UPDATE collection SET title = '$title', author = '$author', genre = '$genre', pyear = '$pyear' WHERE id = '$bookId'";

        // Execute the query
        $result = mysqli_query($conn, $query);

        if ($result) {
            // If deletion is successful, send a success response
            http_response_code(200);
            echo json_encode(array("message" => "Book Updated successfully"));
        } else {
            // If the query fails, return an error
            http_response_code(500); // Internal Server Error
            echo json_encode(array("error" => "Failed to update book"));
        }
    } else {
        // If the request method is not DELETE, return an error
        http_response_code(405); // Method Not Allowed
        echo json_encode(array("error" => "Method not allowed"));
    }
?>
