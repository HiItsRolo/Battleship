<?php
session_start();
include_once("connectToDB.php");

$activeT = json_decode($_GET['timePlayed']);

function computeTime($t1, $t2){
  
    $parts = explode(':',$t1);
    $parts2 = explode(':',$t2);

    $hours = $parts[0] + $parts2[0];
    $minutes = $parts[1] + $parts2[1];
    $seconds = $parts[2] + $parts2[2];

    $minutes += floor($seconds / 60);
    $seconds = $seconds % 60;


    $hours += floor($minutes / 60);

    $minutes = $minutes % 60;


    if ($hours < 10){
        $hours = "0$hours";
    }
    if ($minutes < 10){
        $minutes = "0$minutes";
    }
    if($seconds < 10){
        $seconds = "0$seconds";
    }

    

    return json_encode("$hours:$minutes:$seconds");
    
}




if (isset($_SESSION['username']) && $_SESSION['loggedin'] == true){
    $uname = $_SESSION['username'];
    $uid = $_SESSION['id'];
    $sql = $conn->query("SELECT * FROM users WHERE UserName= '$uname' AND UserId = $uid LIMIT 1"); // query the person
    $row = $sql->fetch_assoc();
    $losses = $row['NumLosses'] + 1;
    $games = $row['NumGames'] + 1;
    $time = $row['TimePlayed'];
    $time = computeTime($activeT, $time);

    $sql = $conn->query("UPDATE users SET NumLosses = $losses, NumGames = $games, TimePlayed = $time WHERE UserName = '$uname' AND UserId = $uid;");

}

else{
    echo "Player Not Logged In";
}

	
?>