<?php
session_start();
include_once("connectToDB.php");


if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $conn->query("UPDATE game SET GameOpponent=NULL,GameId=NULL,CurrentTurn=NULL,PlayerAction=NULL,OpponentAction=NULL,GameState=NULL,ChatMessage=NULL WHERE UserName = '$uname' AND UserId = $uid;");

}


	
?>