<?php

// phpinfo();

// POST /auth/register.php
// data: name, email

require '../connect.php';

// print_r($_POST);

try {
    $data = json_decode(file_get_contents("php://input"));

    // echo $data;
    // print_r($data);

    $name = $data -> name;
    $email = $data -> email;
    $password = $data -> password;

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // validate input

    // name and email not empty
    $error = [];

    $nameLen = strlen($name);
    $emailLen = strlen($email);

    if($nameLen == 0 || $emailLen == 0){
        array_push($error, "input length must be greater than 0");
    }
    else {
        // email must not exist yet
        $sql = "SELECT * FROM `users` WHERE `email` = '{$email}'";
        $user = mysqli_query($con, $sql);

        if(mysqli_num_rows($user)){
            array_push($error, "user already existed");
        }
    }




    if(sizeof($error)){
        echo json_encode(["success" => 0, "errors" => $error]); 
        // http_response_code(401);
    }
    else{
        $sql = "INSERT INTO `users` (
            `email`, 
            `name`,
            `role`,
            `password`
        ) VALUES (
            '{$email}', 
            '{$name}',
            0,
            '{$hashedPassword}'
        )";
    
    
        $insertUser = mysqli_query($con, $sql);
    
        // print_r($_POST);
    
        if($insertUser) {
            echo json_encode(["success" => 1, "message" => "user inserted"]); 
            http_response_code(201);
        }
        else{
            echo json_encode(["success" => 0, "message" => "user not inserted"]);
            http_response_code(501);
        }        
    }


    
    
} catch(Exception $e){
    print_r($e);
}
