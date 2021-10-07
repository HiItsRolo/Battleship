<?php
session_start();
include_once("connectToDB.php");

if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $gid = $_SESSION['gameid'];
    $sql = $conn->query("SELECT * FROM game WHERE GameId = $gid AND UserName = '$uname';");
    $row = $sql->fetch_assoc();
    if($row['RemainingDestroyer']==0&&$row['RemainingSubmarine']==0&&$row['RemainingCruiser']==0&&$row['RemainingBattleship']==0&&$row['RemainingCarrier']==0){
        echo(json_encode('opponentWin'));
        $conn->query("UPDATE game SET GameState='GameOver' WHERE GameId = $gid;");
    }
    else{
        echo(json_encode('false'));
    }

    

    //
}
else{
    echo "Player Not Logged In";
}

	
?>