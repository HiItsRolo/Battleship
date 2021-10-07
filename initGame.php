<?php
session_start();
include_once("connectToDB.php");

if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $gid = $_SESSION['gameid'];
    $sql = $conn->query("UPDATE game SET CurrentTurn = '$uname', RemainingDestroyer=2, RemainingSubmarine=3, RemainingCruiser=3, RemainingBattleship=4, RemainingCarrier=5 WHERE GameId = $gid AND GameState = 'Ready';");
}
else{
    echo "Player Not Logged In";
}

	
?>