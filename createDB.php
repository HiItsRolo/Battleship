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
	GameId int(11) NOT NULL,
	UserName varchar(50) NOT NULL,
	UserPassword varchar(50) NOT NULL ,
	NumWins int(11) NOT NULL,
	NumGames int(11) NOT NULL,
	NumLosses int(11) NOT NULL,
	TimePlayed time NOT NULL,
	PRIMARY KEY (UserId)
)";

if ($conn->query($sql) === TRUE) {
  echo "<br>Table users created successfully";
} else {
  echo "<br>Error creating table: " . $conn->error;
}


$sql = "CREATE TABLE game(
	UserName varchar(50) NOT NULL,
	UserId int(11) NOT NULL,
	GameOpponent varchar(50),
	GameId int(11),
	CurrentTurn varchar(10),
	PlayerAction varchar(50),
	OpponentAction varchar(50),
	GameState varchar(50),
	ChatMessage varchar(50),
	RemainingDestroyer int(1),
	RemainingSubmarine int(1),
	RemainingCruiser int(1),
	RemainingBattleship int(1),
	RemainingCarrier int(1),
	PRIMARY KEY (UserId)
)";

if ($conn->query($sql) === TRUE) {
  echo "<br>Table game created successfully";
} else {
  echo "<br>Error creating table: " . $conn->error;
}




$conn->close();
 
?>