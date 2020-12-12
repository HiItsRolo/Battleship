<?php


$servername = "localhost";
$username = "ADMIN";
$password = "ADMIN";
$dbname = "Battleship";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("<br>Connection failed: " . $conn->connect_error);
}
echo "<br>Connected successfully";

// sql to create table

$pw = sha1('ABC');
$time = json_encode('00:17:24');
$sql = "INSERT INTO users (UserName,UserPassword,NumWins,NumGames,NumLosses,TimePlayed) 
VALUES ('Tim', '$pw',5,12,7,$time);";

$pw = sha1("123ABC");
$time = json_encode('00:44:44');
$sql .= "INSERT INTO users (UserName,UserPassword,NumWins,NumGames,NumLosses,TimePlayed) 
VALUES ('Evan', '$pw',11,13,2,$time);";

$pw = sha1("ABC123");
$time = json_encode('02:55:56');
$sql .= "INSERT INTO users (UserName,UserPassword,NumWins,NumGames,NumLosses,TimePlayed) 
VALUES ('Jeff', '$pw',3,27,24,$time);";

$pw = sha1("123");
$time = json_encode('00:47:12');
$sql .= "INSERT INTO users (UserName,UserPassword,NumWins,NumGames,NumLosses,TimePlayed) 
VALUES ('Juan', '$pw',15,22,7,$time);";

$conn->multi_query($sql);


$conn->close();
 
?>