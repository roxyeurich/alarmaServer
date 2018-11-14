<?php
try {
  $conn = new PDO("mysql:host=d6q8diwwdmy5c9k9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;dbname=qefvl1o77u29l7gz","zuaks09ibij50mi6","ow722kdbo87l4aok");
} catch (PDOException $e){
  echo "Error".$e->getMessage();
}

//$score =$_POST["score"];

$id=$_POST['id'];
$query="SELECT SUM(score) AS score FROM tasks WHERE user_id=$id";

$result = $conn->query($query);
if($result){
  
  $tasks=$result->fetchAll();
  echo json_encode($tasks); 
  
} else {
  echo json_encode(false);
}

?>