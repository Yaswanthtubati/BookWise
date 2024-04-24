<?php
    require('../db/db.php');
    require('../cors/cors.php');

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get raw post data 
        $postData = file_get_contents("php://input");

        // Decode the JSON data
        $requestData = json_decode($postData, true);

        // Retrieve the data from the POST request
        $name = mysqli_real_escape_string($conn, $requestData["name"]);
        $email = mysqli_real_escape_string($conn, $requestData["email"]);
        $password = password_hash(mysqli_real_escape_string($conn, $requestData["password"]), PASSWORD_DEFAULT);

        $query = "INSERT INTO users(username, email, pwd) VALUES('$name', '$email', '$password' )";

        $result = mysqli_query($conn, $query);

        if ($result) {
            // Start a session
            session_start();
            $row = mysqli_fetch_assoc($result);
            // Set session variables
            $_SESSION['username'] = $name;
            $_SESSION['email'] = $email;
            $_SESSION['user_id'] = $row['user_id'];

            $data = array(
                "status" => "success",
                "session_id" => session_id(),
                "user_id" => $_SESSION['user_id'],
                "email" => $email,
                "name" => $name,
            );

            setcookie(session_name(), session_id(), time() + (86400 * 30), "/");

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
