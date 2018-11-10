<?php
try {
  $conn = new PDO("mysql:host=d6q8diwwdmy5c9k9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;dbname=qefvl1o77u29l7gz","zuaks09ibij50mi6","ow722kdbo87l4aok");
} catch (PDOException $e){
  echo "Error".$e->getMessage();
}

$passcode =$_POST["passcode"];


$query = "SELECT * FROM groups WHERE passcode = '$passcode'";

//"SELECT * FROM users WHERE username='$username' AND password = '$password';

//USE THIS TO TEST IF INFO IS GOING INTO DATABASE:
//$query = "INSERT INTO users (email, password, username, status) VALUES ('test', 'test', 'test', 1)";

$result = $conn->query($query);
if($result){
  $groups=$result->fetchAll();
  echo json_encode($groups);
  
} else {
  echo json_encode(false);
}

?>