<?php



// POST /auth/login.php
// data: email

require '../connect.php';

// print_r($_POST);

try {
    $data = json_decode(file_get_contents("php://input"));

    $email = $data -> email;
    $password = $data -> password;

    // validate input

    // email not empty
    $error = [];

    $emailLen = strlen($email);

    if($emailLen == 0){
        array_push($error, "input length must be greater than 0");
    }
    else {
        // email matched
        $sql = "SELECT * FROM `users` WHERE `email` = '{$email}'";
        $user = mysqli_query($con, $sql);

        if(!mysqli_num_rows($user)){
            array_push($error, "wrong email");
        }
    }




    if(sizeof($error)){
        echo json_encode(["success" => 0, "errors" => $error]); 
        // http_response_code(401);
    }
    else{
        $user_info = mysqli_fetch_array($user, MYSQLI_ASSOC);

        // check password
        if(password_verify($password, $user_info["password"])){
            // create a token
            $str=rand();
            $token = md5($str);

            $sql = "INSERT INTO `sessions` (
                `session`,
                `user`,
                `role`,
                `user_id`
            ) VALUES (
                '{$token}',
                '{$user_info["email"]}',
                '{$user_info["role"]}',
                '{$user_info["user_id"]}'
            )";
        
            $insertUser = mysqli_query($con, $sql);

            if($insertUser){
                echo json_encode([
                    "success" => 1, 
                    "message" => "login sucessfully", 
                    "token" => $token,
                    "user" => $user_info["email"],
                    "user_id" => $user_info["user_id"],
                    "role" => $user_info["role"]
                ]); 
                http_response_code(201);       
            }
            else{
                http_response_code(501);
            }
        }
        else{
            array_push($error, "email or password is incorrect");
            echo json_encode(["success" => 0, "errors" => $error]); 
            http_response_code(201);
        }
    }


    
    
} catch(Exception $e){
    print_r($e);
}
