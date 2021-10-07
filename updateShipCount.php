<?php
session_start();
include_once("connectToDB.php");

$shipHit = json_decode($_GET['shipHit']);

if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $gid = $_SESSION['gameid'];
    $sql = $conn->query("SELECT $shipHit FROM game WHERE GameId = $gid AND UserName != '$uname';");
    $row = $sql->fetch_assoc();
    $val = ($row["$shipHit"]);

    $conn->query("UPDATE game SET $shipHit=$val-1 WHERE UserName != '$uname' AND GameId = $gid;");
}
else{
    echo "Player Not Logged In";
}

	
?>