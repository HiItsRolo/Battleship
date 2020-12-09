<?php
include_once("connectToDB.php");
  $sort = $_GET['sort'];
  $asc = $_GET['asc'];

  if($sort == "Wins"){
      if($asc == "true")
        $sql = $conn->query("SELECT * FROM users ORDER BY NumWins ASC"); // query the users by ascending order of number of wins
      else
        $sql = $conn->query("SELECT * FROM users ORDER BY NumWins DESC"); // query the users by descending order of number of wins
  }

  else if($sort == "Time"){
      if($asc == "true")
        $sql = $conn->query("SELECT * FROM users ORDER BY TimePlayed ASC"); // query the users by ascending order of time played
      else
        $sql = $conn->query("SELECT * FROM users ORDER BY TimePlayed DESC"); // query the users by descending order of time played
  }


  else if($sort == "Games"){ 
      if($asc == "true")
      $sql = $conn->query("SELECT * FROM users ORDER BY NumGames ASC"); // query the users by ascending order of number of games
      else 
        $sql = $conn->query("SELECT * FROM users ORDER BY NumGames DESC"); // query the users by descending order of number of games
  }


  if ($sql->num_rows > 0) {
      // output data of each row
      $i = 0;
      while($row = $sql->fetch_assoc()) {
        $arr[$i] = $row;
        $i++;
      }
   } 
        
    

  echo json_encode($arr);
      

?>