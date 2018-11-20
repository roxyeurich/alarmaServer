<?php
header('Access-Control-Allow-Origin: *'); 
try {
  $conn = new PDO("mysql:host=d6q8diwwdmy5c9k9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;dbname=qefvl1o77u29l7gz","zuaks09ibij50mi6","ow722kdbo87l4aok");
} catch (PDOException $e){
  echo "Error".$e->getMessage();
}

$group_id=$_POST["group_id"];
$task_description =$_POST["task_description"];
$task_title =$_POST["task_title"];
$rating =$_POST["score"];
$end_time =$_POST["end_time"];

$query = "INSERT INTO tasks (group_id, task_title, task_description, score, end_time) VALUES ('$group_id', '$task_title', '$task_description', '$rating', '$end_time')";

$result = $conn->query($query);
if($result){
  
   $message="You have a new task! ".$task_title;
  $query = "INSERT INTO notifications (message, group_id) VALUES ('$message', '$group_id')";
  $result = $conn->query($query);
  
  echo json_encode(true);
  
} else {
  echo json_encode(false);
}

?>