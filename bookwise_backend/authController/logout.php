<?php
// Start the session
    session_start();
    require('../cors/cors.php');

    if(isset($_COOKIE['PHPSESSID'])){

        // Check if the user is logged in
    
            // If logged in, clear all session variables
        session_unset();
            // Destroy the session
        session_destroy();
            // Redirect to the login page or any other desired page

        setcookie('cookie_name', '', time() - 3600, '/');

    
        $data = array(
            "success" => "Logged Out",
        );
        $responseData = json_encode($data);
        header('Content-Type: application/json');
    
        echo $responseData;

    } else{
        http_response_code(401);
        echo json_encode(array("error" => "Session Logged out Already"));
    }

?>
