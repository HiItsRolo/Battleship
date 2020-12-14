<?php
session_start();
include_once("connectToDB.php");

if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $gid = $_SESSION['gameid'];
    $sql = $conn->query("SELECT GameOpponent FROM game WHERE GameId = $gid AND UserName = '$uname';");
    $row = $sql->fetch_assoc();
    $goppo = $row['GameOpponent'];
    $sql = $conn->query("UPDATE game SET CurrentTurn = '$goppo', OpponentAction=NULL WHERE GameId = $gid");
}
else{
    echo "Player Not Logged In";
}

$row['OpponentAction']
	
?>