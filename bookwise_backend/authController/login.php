<?php
require('../db/db.php');
require('../cors/cors.php');

    if($_SERVER["REQUEST_METHOD"] == 'POST') {
        $postData = file_get_contents("php://input");
        $requestData = json_decode($postData, true);

        $email = mysqli_real_escape_string($conn, $requestData["email"]);
        $password = mysqli_real_escape_string($conn, $requestData["password"]);

        $query = "SELECT * FROM users WHERE email = '$email'";
        $result = mysqli_query($conn, $query);

        if($result) {
            $row = mysqli_fetch_assoc($result);

            if ($row) {
                // Verify password
                if (password_verify($password, $row['pwd'])) {
                    // Password is correct, create session and set session variables
                    session_start();
                    $_SESSION['email'] = $email;
                    $_SESSION['username'] = $row['username'];
                    $_SESSION['user_id'] = $row['user_id'];

                    // Create a response object containing session ID and user data
                    $data = array(
                        "status" => "success",
                        "session_id" => session_id(),
                        "email" => $_SESSION['email'],
                        "user_id" => $_SESSION['user_id'],
                        "name" => $_SESSION['username'],
                    );

                    // Set a cookie with the session ID
                    setcookie(session_name(), session_id(), time() + (86400 * 30), "/"); // Adjust the expiration time as needed

                    // Send the response with session ID to the client
                    $responseData = json_encode($data);
                    header('Content-Type: application/json');
                    echo $responseData;
                } else {
                    // Password is incorrect
                    $data = array(
                        "status" => "error",
                        "message" => "Incorrect password",
                    );
                    echo json_encode($data);
                }
            } else {
                // Email not found in database
                $data = array(
                    "status" => "error",
                    "message" => "Email not found",
                );
                echo json_encode($data);
            }
        } else {
            // If the query fails, return an error
            http_response_code(500); // Internal Server Error
            echo json_encode(array("error" => "Failed to retrieve data"));
        }
    } else {
        // If the request method is not POST, return an error
        http_response_code(405); // Method Not Allowed
        echo json_encode(array("error" => "Method not allowed"));
    }
?>
