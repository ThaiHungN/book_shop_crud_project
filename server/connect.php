<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'admin');
define('DB_PASS', '1');
define('DB_NAME', 'book_shop_db');

// connect function
function connect(){
	// print_r($_POST);

	$connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

	// print_r($_POST);

	// if(mysqli_connect_errno($connect)){
	// 	die("failed to connect" . mysqli_connect_error());
	// }

	// print_r($_POST);

	

	mysqli_set_charset($connect, "utf8");

	return $connect;
}

$con = connect();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
