<?php
include_once("connectToDB.php");

if (isset($_POST['username'])) {
  $username = $_POST['username'];
	$password = sha1($_POST['password']);
    $sql = "INSERT INTO users (UserName,UserPassword,NumWins,NumGames,NumLosses) 
    VALUES ('$username', '$password',0,0,0)";


    
    if ($conn->query($sql) === TRUE) {
        echo $output = "Hello $username! You are now registered! Please log in to use your account";
        header( "refresh:2;url=index.html" );
      } 
    else {
        echo "<br>Error inserting record: " . $conn->error;
        $output = "Error registering the user, returning back to the signup page";
        header( "refresh:5;url=signup.html" );
      }
  

      
  $conn->close();

}
?>