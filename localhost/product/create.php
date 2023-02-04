<?php

// phpinfo();

// POST /auth/register.php
// data: name, email

require '../connect.php';

// print_r($_POST);

try {
    $data = json_decode(file_get_contents("php://input"));

    $token = $data -> token;
 
    $sql = "SELECT * FROM `sessions` WHERE `session` = '{$token}'";
    $result = mysqli_query($con, $sql);


    if(!mysqli_num_rows($result)){
        echo json_encode(["success" => 0, "message" => "unauthorized"]); 
        http_response_code(201);
    }
    else{
        $session_info = mysqli_fetch_array($result, MYSQLI_ASSOC);
        // print_r($session_info);

        $role = $session_info["role"];

        if($role != "1"){
            echo json_encode(["success" => 0, "message" => "unauthorized"]); 
            http_response_code(201);
        }
        else{
            // create
            $name = $data -> name;
            $author = $data -> author;
            $price = $data -> price;
            $thumbnail = $data -> thumbnail;
            $number = $data -> number;

            // validate input

            // name and email not empty
            $error = [];

            $nameLen = strlen($name);
            $authorLen = strlen($author);
            

            if($nameLen == 0 || $authorLen == 0){
                array_push($error, "input length must be greater than 0");
            }
            else if($price < 0 || $number < 0) {
                array_push($error, "price and number must be non-negative numbers");
            }




            if(sizeof($error)){
                echo json_encode(["success" => 0, "errors" => $error]); 
                // http_response_code(401);
            }
            else{
                $sql = "INSERT INTO `products` (
                    `name`, 
                    `author`,
                    `price`,
                    `thumbnail`,
                    `number`
                ) VALUES ( 
                    '{$name}',
                    '{$author}',
                    '{$price}',
                    '{$thumbnail}',
                    '{$number}'
                )";
            
            
                $insertUser = mysqli_query($con, $sql);
            
                // print_r($_POST);
            
                if($insertUser) {
                    echo json_encode(["success" => 1, "message" => "product inserted"]); 
                    http_response_code(201);
                }
                else{
                    echo json_encode(["success" => 0, "message" => "product not inserted"]);
                    http_response_code(501);
                }        
            }

        }
    }


    

    
    
} catch(Exception $e){
    print_r($e);
}
