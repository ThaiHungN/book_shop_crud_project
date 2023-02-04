<?php

// phpinfo();

// POST /auth/register.php
// data: name, email

require '../connect.php';

// print_r($_POST);

try {
    // print_r($_FILES['file']);

    $uploaddir = '/var/www/localhost/images/';
    $uploadfile = $uploaddir . basename($_FILES['file']['name']);


    if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
        echo json_encode(["success" => 1, "message" => "file uploaded", "url" => "http://localhost/images/".basename($_FILES['file']['name'])]); 
        http_response_code(201);
    } else {
        echo json_encode(["success" => 0, "message" => "failed"]); 
            http_response_code(201);
    }

 

    

    








    
    
} catch(Exception $e){
    print_r($e);
}
