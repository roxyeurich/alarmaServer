<?php
header('Access-Control-Allow-Origin: *'); 
try {
  $conn = new PDO("mysql:host=d6q8diwwdmy5c9k9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;dbname=qefvl1o77u29l7gz","zuaks09ibij50mi6","ow722kdbo87l4aok");
} catch (PDOException $e){
  echo "Error".$e->getMessage();
}

$email =$_POST["email"];
$password =$_POST["password"];
$username =$_POST["username"];
//$location_main =$_POST["location_main"];


$query = "SELECT * FROM users WHERE email='$email'";

//"SELECT * FROM users WHERE username='$username' AND password = '$password';

//USE THIS TO TEST IF INFO IS GOING INTO DATABASE:
//$query = "INSERT INTO users (email, password, username, status) VALUES ('test', 'test', 'test', 1)";

$result = $conn->query($query);
if($result){
  $users=$result->fetchAll();
  
  if (!empty($users)){
    echo json_encode(false);  
  } else {
    
    $query = "INSERT INTO users (email, password, username, admin) VALUES ('$email', '$password', '$username', 1)";


    //"SELECT * FROM users WHERE username='$username' AND password = '$password';
    //$query = "INSERT INTO users (email, password, username, status) VALUES ('test', 'test', 'test', 1)";

    $result = $conn->query($query);
    if($result){
      $userid=$conn->lastInsertId();
      echo json_encode(array(
        'status'=>true,
        'id'=>$userid,
      ));

    } else {
      echo json_encode(false);
    }
  }
  
  
} else {
  echo json_encode(false);
}


?>