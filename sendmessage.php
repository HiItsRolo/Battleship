<?php
session_start();
include_once("connectToDB.php");

$message = $_GET['message'];

if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $gid = $_SESSION['gameid'];
    $sql = $conn->query("UPDATE game SET ChatMessage=$message WHERE UserName = '$uname' AND UserId = $uid AND GameId = $gid;");
}
else{
    echo "Player Not Logged In";
}

	
?>