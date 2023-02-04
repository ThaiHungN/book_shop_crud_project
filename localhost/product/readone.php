<?php



// POST /
// data: token

require '../connect.php';

// print_r($_POST);

try {
    $id = $_GET['id'];

    // print_r($id);
    

 
    $sql = "SELECT * FROM `products` WHERE `product_id` = '{$id}'";
    $result = mysqli_query($con, $sql);


    if(!mysqli_num_rows($result)){
        echo json_encode(["success" => 0, "message" => "product does not exist"]); 
        http_response_code(201);
    }
    else{
        $product_info = mysqli_fetch_array($result, MYSQLI_ASSOC);
        // print_r($session_info);

        echo json_encode(["success" => 1, "product" => $product_info]);    
        http_response_code(201);
    }


    
    
} catch(Exception $e){
    print_r($e);
}
