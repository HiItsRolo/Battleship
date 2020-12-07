<?php
include_once("connectToDB.php");
  $sort = $_GET['sort'];

  if($sort == "Wins"){
      $sql = $conn->query("SELECT * FROM users ORDER BY numWins DESC"); // query the person
  }

  else if($sort == "Losses"){
      $sql = $conn->query("SELECT * FROM users ORDER BY numLosses DESC"); // query the person
  }

  else if($sort == "Name"){
      $sql = $conn->query("SELECT * FROM users ORDER BY UserName"); // query the person
  }
     

  else if($sort == "Games"){ 
      $sql = $conn->query("SELECT * FROM users ORDER BY numGames DESC"); // query the person
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