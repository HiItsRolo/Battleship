<?php
include_once("connectToDB.php");
    $sql = $conn->query("SELECT * FROM users"); // query the person
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