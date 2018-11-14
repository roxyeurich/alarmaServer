<?php
header('Access-Control-Allow-Origin: *'); 
try {
  $conn = new PDO("mysql:host=d6q8diwwdmy5c9k9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;dbname=qefvl1o77u29l7gz","zuaks09ibij50mi6","ow722kdbo87l4aok");
} catch (PDOException $e){
  echo "Error".$e->getMessage();
}

$group_name =$_POST["group_name"];
$passcode =$_POST["passcode"];
$userid =$_POST["userid"];


$query = "INSERT INTO groups (group_name, passcode) VALUES ('$group_name','$passcode')";

//"SELECT * FROM users WHERE username='$username' AND password = '$password';
//$query = "INSERT INTO users (email, password, username, status) VALUES ('test', 'test', 'test', 1)";

$result = $conn->query($query);
if($result){
  $id = $conn->lastInsertId();
  
  $query="UPDATE users SET group_id='$id' WHERE id='$userid'";
  $result = $conn->query($query);
  if($result){
    echo json_encode(array(
    'status'=>true,
    'id'=>$id,
  ));
  } else {
    echo json_encode(false);
  }

} else {
  echo json_encode(false);
}

?>