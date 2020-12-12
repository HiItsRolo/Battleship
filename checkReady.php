<?php
session_start();
include_once("connectToDB.php");

if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $gid = $_SESSION['gameid'];
    $sql = $conn->query("SELECT GameState, UserName FROM game WHERE GameId = $gid AND GameState = 'Ready';");
    if ($sql->num_rows == 2){
        echo json_encode(true); 
    }
    else if($sql->num_rows == 1){
        $row = $sql->fetch_assoc();
        if($row['UserName'] != $uname){
            echo json_encode("Opponent Ready");
        }
        else{
            echo json_encode(false);
        }
    }
    else{
        echo json_encode(false);
    }
}
else{
    echo "Player Not Logged In";
}

	
?>