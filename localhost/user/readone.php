<?php



// POST /
// data: token

require '../connect.php';

// print_r($_POST);

try {
    $id = $_GET['id'];

    // print_r($id);
    

 
    $sql = "SELECT * FROM `users` WHERE `user_id` = '{$id}'";
    $result = mysqli_query($con, $sql);


    if(!mysqli_num_rows($result)){
        echo json_encode(["success" => 0, "message" => "user does not exist"]); 
        http_response_code(201);
    }
    else{
        $user_info = mysqli_fetch_array($result, MYSQLI_ASSOC);

        echo json_encode(["success" => 1, "user" => $user_info]);    
        http_response_code(201);
    }


    
    
} catch(Exception $e){
    print_r($e);
}
