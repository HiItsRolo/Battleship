<?php
session_start();
include_once("connectToDB.php");


if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $gid = $_SESSION['gameid'];
    $sql = $conn->query("UPDATE game SET GameState='Ready' WHERE UserName = '$uname' AND UserId = $uid AND GameId = $gid;");
}
else{
    echo "Player Not Logged In";
}

	
?>