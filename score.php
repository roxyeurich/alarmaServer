<?php
header('Access-Control-Allow-Origin: *'); 
try {
  $conn = new PDO("mysql:host=d6q8diwwdmy5c9k9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;dbname=qefvl1o77u29l7gz","zuaks09ibij50mi6","ow722kdbo87l4aok");
} catch (PDOException $e){
  echo "Error".$e->getMessage();
}

$userid =$_POST["user_id"];
$id =$_POST["task_id"];

$query = "UPDATE tasks SET user_id='$userid' WHERE task_id='$id'";
  
$result = $conn->query($query);
if($result){
  echo json_encode(true); 
  
  
} else {
  echo json_encode(false);
}
$conn=null;
$result=null;
?>