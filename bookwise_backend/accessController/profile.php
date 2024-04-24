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

    // Include necessary files and establish database connection

    // Retrieve the user's email from the session
    $email = $_SESSION['email'];

    if($email == null) {
        http_response_code(401); // Unauthorized access
        echo json_encode(array("error" => "Invalid session Id, Please LogIN"));
        exit;
    }

    // Query to retrieve user data based on the email
    $query = "SELECT user_id, username, email FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    // Check if the query was successful
    if (!$result) {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("error" => "Failed to retrieve user data"));
        exit;
    }

    // Fetch user data from the query result
    $data = mysqli_fetch_assoc($result);

    // Return the user data as JSON response
    header('Content-Type: application/json');
    echo json_encode($data);

    // Free the result and close the database connection
    mysqli_free_result($result);
    mysqli_close($conn);
?>
