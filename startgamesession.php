<?php
session_start();
include_once("connectToDB.php");

$gameid = json_decode(file_get_contents('php://input'), true);

if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $_SESSION['gameid'] = $gameid;
    $conn->query("UPDATE game SET GameId= $gameid WHERE UserName = '$uname' AND UserId = $uid;");

    echo json_encode($uname);
}
else{
    echo json_encode("Player Not Logged In");
}

	
?>