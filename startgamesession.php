<?php
session_start();
include_once("connectToDB.php");

if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $_SESSION['gameid'] = 47;
    $sql = $conn->query("UPDATE game SET GameId= 47 WHERE UserName = '$uname' AND UserId = $uid;");
}
else{
    echo "Player Not Logged In";
}

	
?>