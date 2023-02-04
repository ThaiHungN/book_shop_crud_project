<?php



// DELETE /product/delete.php
// data: token

require '../connect.php';

// print_r($_POST);

try {
    $data = json_decode(file_get_contents("php://input"));

    $token = $data -> token;
    $id = $data -> id;

 
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
            // delete
            
            $sql = "DELETE FROM `products` WHERE `product_id` = '{$id}'";

            if (mysqli_query($con, $sql)) {
                echo json_encode(["success" => 1]);    
                http_response_code(201);
            } else {
                echo json_encode(["success" => 0]);    
                http_response_code(201);
            }
        }
    }


    
    
} catch(Exception $e){
    print_r($e);
}
