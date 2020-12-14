<?php
session_start();
include_once("connectToDB.php");

if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $gid = $_SESSION['gameid'];
    $sql = $conn->query("SELECT * FROM game WHERE GameId = $gid AND GameState = 'Ready';");
    if ($sql->num_rows > 0){
        $row = $sql->fetch_assoc();
        if ($row['CurrentTurn'] != $uname){
            echo json_encode("Opponent");
        }
        else{
            echo json_encode("User");
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