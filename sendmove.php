<?php
session_start();
include_once("connectToDB.php");

$action = json_decode($_GET['action']);

if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $gid = $_SESSION['gameid'];
    $conn->query("UPDATE game SET PlayerAction='$action' WHERE UserName = '$uname' AND GameId = $gid;");
}
else{
    echo "Player Not Logged In";
}

	
?>