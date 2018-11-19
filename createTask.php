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

$query = "INSERT INTO tasks (group_id, task_title, task_description, score) VALUES ('$group_id', '$task_title', '$task_description', '$rating')";

$result = $conn->query($query);
if($result){
  echo json_encode(true);
  
} else {
  echo json_encode(false);
}

?>