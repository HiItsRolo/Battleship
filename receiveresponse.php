<?php
session_start();
include_once("connectToDB.php");

if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $gid = $_SESSION['gameid'];
    $sql = $conn->query("SELECT OpponentAction FROM game WHERE GameId = $gid AND UserName = '$uname';");
    $row = $sql->fetch_assoc();
    $temp = $row['OpponentAction'];
    echo json_encode($temp);
}
else{
    echo "Player Not Logged In";
}

	
?>