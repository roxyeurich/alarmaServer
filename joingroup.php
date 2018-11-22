<?php
header('Access-Control-Allow-Origin: *'); 
try {
  $conn = new PDO("mysql:host=d6q8diwwdmy5c9k9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;dbname=qefvl1o77u29l7gz","zuaks09ibij50mi6","ow722kdbo87l4aok");
} catch (PDOException $e){
  echo "Error".$e->getMessage();
}

$passcode =$_POST["passcode"];
$userid =$_POST["userid"];

$query = "SELECT * FROM groups WHERE passcode = '$passcode'";

$result = $conn->query($query);
if($result){
  $groups=$result->fetchAll();
  //var_dump($groups);
  $id=$groups[0]["group_id"];
  
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
  //echo json_encode($groups);
  
} else {
  echo json_encode(false);
}

?>

