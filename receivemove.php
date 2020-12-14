<?php
session_start();
include_once("connectToDB.php");

if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $gid = $_SESSION['gameid'];
    $sql = $conn->query("SELECT PlayerAction FROM game WHERE GameId = $gid AND UserName != '$uname';");
    $row = $sql->fetch_assoc();
    echo json_encode($row['PlayerAction']);

    

    $conn->query("UPDATE game SET PlayerAction=NULL WHERE UserName != '$uname' AND GameId = $gid;");
}
else{
    echo "Player Not Logged In";
}

	
?>