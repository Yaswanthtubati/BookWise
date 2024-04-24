<?php

    // Allow requests from any origin
    // Allow requests only from specific origin
    $allowed_origin = 'http://localhost:1234';
    header("Access-Control-Allow-Origin: $allowed_origin");

    // Allow credentials
    header("Access-Control-Allow-Credentials: true");

    // Allow GET, POST, PUT, DELETE, OPTIONS methods
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    
    // Allow content-type headers
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    // If the request method is OPTIONS, respond with 200 OK
    if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
        http_response_code(200);
        exit;
    }

?>