<?php
header('Access-Control-Allow-Origin: *'); 
try {
  $conn = new PDO("mysql:host=d6q8diwwdmy5c9k9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;dbname=qefvl1o77u29l7gz","zuaks09ibij50mi6","ow722kdbo87l4aok");
} catch (PDOException $e){
  echo "Error".$e->getMessage();
}

$group_id =$_POST["group_id"];

$query = "SELECT id, username, users.latitude, users.longitude, (SELECT SUM(score) FROM tasks WHERE user_id=users.id) AS score FROM users WHERE group_id='$group_id'";

//"SELECT * FROM users WHERE username='$username' AND password = '$password';

//USE THIS TO TEST IF INFO IS GOING INTO DATABASE:
//$query = "INSERT INTO users (email, password, username, status) VALUES ('test', 'test', 'test', 1)";

$result = $conn->query($query);
if($result){
  $users=$result->fetchAll();
  echo json_encode($users); 
  
} else {
  echo json_encode(false);
}
$conn=null;
$result=null;
?>
