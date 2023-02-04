<?php


// data: token

require '../connect.php';

try { 
    $sql = "SELECT * FROM `users`";
    $result = mysqli_query($con, $sql);


    if(!mysqli_num_rows($result)){

        echo json_encode(["success" => 0]); 
        http_response_code(201);
    }
    else{
        $user_list = $result->fetch_all(MYSQLI_ASSOC);

        echo json_encode(["success" => 1, "user_list" => $user_list]);    
        http_response_code(201);
    }


    
    
} catch(Exception $e){
    print_r($e);
}
