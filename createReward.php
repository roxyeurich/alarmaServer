<?php
header('Access-Control-Allow-Origin: *'); 
try {
  $conn = new PDO("mysql:host=d6q8diwwdmy5c9k9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;dbname=qefvl1o77u29l7gz","zuaks09ibij50mi6","ow722kdbo87l4aok");
} catch (PDOException $e){
  echo "Error".$e->getMessage();
}


$reward_title =$_POST["reward_title"];
$reward_points =$_POST["reward_points"];
$group_id =$_POST["group_id"];

$query = "INSERT INTO rewards (reward_title, reward_points, group_id) VALUES ('$reward_title', '$reward_points', '$group_id')";

$result = $conn->query($query);
if($result){
  
   $message="You have a new reward! ".$reward_title;
  $query = "INSERT INTO notifications (message, group_id) VALUES ('$message', '$group_id')";
  $result = $conn->query($query);
  
  echo json_encode(true);
  
} else {
  echo json_encode(false);
}

?>