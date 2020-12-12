<?php
session_start();
include_once("connectToDB.php");

if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $gid = $_SESSION['gameid'];
    $sql = $conn->query("SELECT UserName FROM game WHERE GameId = $gid AND UserName != '$uname';");
    if ($sql->num_rows > 0){
        $row = $sql->fetch_assoc();
        echo json_encode($row['UserName']); 
        $conn->query("UPDATE game SET GameOpponent = '$uname' WHERE UserName != '$uname' AND GameId = $gid;");
    }
    else{
        echo json_encode(NULL);
    }
}
else{
    echo "Player Not Logged In";
}

	
?>