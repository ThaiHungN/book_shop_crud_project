<?php


// data: token

require '../connect.php';

try { 
    $sql = "SELECT * FROM `products`";
    $result = mysqli_query($con, $sql);


    if(!mysqli_num_rows($result)){

        echo json_encode(["success" => 0]); 
        http_response_code(201);
    }
    else{
        $product_list = $result->fetch_all(MYSQLI_ASSOC);

        echo json_encode(["success" => 1, "product_list" => $product_list]);    
        http_response_code(201);
    }


    
    
} catch(Exception $e){
    print_r($e);
}
