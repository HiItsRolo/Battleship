<?php
session_start();
include_once("connectToDB.php");

if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $gid = $_SESSION['gameid'];
    $sql = $conn->query("SELECT CurrentTurn FROM game WHERE GameId = $gid AND UserName = '$uname';");
    $row = $sql->fetch_assoc();
    if ($uname == $row['CurrentTurn']){
        echo json_encode(true);
    }
    else{
        echo json_encode(false);
    }
    
}
else{
    echo "Player Not Logged In";
}

	
?>