
<?php
if(!session_id()) session_start();

$servername = "localhost";
$username = "ADMIN";
$password = "ADMIN";
$dbname = "Battleship";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
//  die("<br>Connection failed: " . $conn->connect_error);
}
//echo "<br>Connected successfully";

?>