<?php


$servername = "localhost";
$username = "ADMIN";
$password = "ADMIN";
$dbname = "Battleship";


// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully ";


// Create database
$sql = "CREATE DATABASE Battleship";
if ($conn->query($sql) === TRUE) {
  echo "<br>Database created successfully";
} else {
  echo "<br>Error creating database: " . $conn->error;
}

$conn->close();

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("<br>Connection failed: " . $conn->connect_error);
}
echo "<br>Connected successfully";

// sql to create table

$sql = "CREATE TABLE users(
	UserId int(11) NOT NULL auto_increment,
	GameOpponent varchar(50) NOT NULL,
	GameId int(11) NOT NULL,
	GamePlayer varchar(11) NOT NULL,
	UserName varchar(50) NOT NULL,
	UserPassword varchar(50) NOT NULL ,
	numWins int(11) NOT NULL,
	numGames int(11) NOT NULL,
	numLosses int(11) NOT NULL,
	PRIMARY KEY (UserId)
)";

if ($conn->query($sql) === TRUE) {
  echo "<br>Table users created successfully";
} else {
  echo "<br>Error creating table: " . $conn->error;
}



$conn->close();
 
?>