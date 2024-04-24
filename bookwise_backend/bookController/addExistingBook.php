<?php
    session_start();

    require('../db/db.php');
    require('../cors/cors.php');

    // Check if the session ID is set
    if (!isset($_COOKIE['PHPSESSID'])) {
        // If session ID is not set, return an error
        http_response_code(401); // Unauthorized
        echo json_encode(array("error" => "Session ID not found"));
        exit;
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        //get Raw post data
        $postData = file_get_contents("php://input");

        // Decode the JSON data
        $requestData = json_decode($postData, true);
        $user_id = $_SESSION['user_id'];

        if (!isset($user_id)) {
            // If session ID is not set, return an error
            http_response_code(401); // Unauthorized
            echo json_encode(array("error" => "Unauthorized, Please Login to website"));
            exit;
        }

        // Retrieve the data from the POST request
        $title = mysqli_real_escape_string($conn, $requestData["title"]);
        $author = mysqli_real_escape_string($conn, $requestData["author"]);
        $message = mysqli_real_escape_string($conn, $requestData["about"]);
        $genre = mysqli_real_escape_string($conn, $requestData["genre"]);
        $pyear = mysqli_real_escape_string($conn, $requestData["pyear"]);


    // Query to insert existing book data based into collection table
        $query = "INSERT INTO collection(title, author, genre, about, pyear, user_id) VALUES('$title', '$author', '$genre', '$message', '$pyear', '$user_id' )";

    // Check if the query was successful
        $result = mysqli_query($conn, $query);

        if ($result) {
            $data = array(
                "status" => "success",
                "title" => $title,
            );

        // Encode the data as JSON
            $responseData = json_encode($data);

            // Set the content type header to JSON
            header('Content-Type: application/json');

            // Send the JSON data back to the frontend
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
