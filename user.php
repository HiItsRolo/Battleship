<?php

class user{
	private $UserId,$UserName,$UserMail,$UserGameId,$UserPassword,$UserGameColor,$UserGameOpponent;
	
	public function getUserId(){
		return $this->UserId;
	}
	public function setUserId($UserId){
		return $this->UserId=$UserId;
	}
	
	public function getUserName(){
		return $this->UserName;
	}
	public function setUserName($UserName){
		return $this->UserName=$UserName;
	}
	
	public function getUserMail(){
		return $this->UserMail;
	}
	public function setUserMail($UserMail){
		return $this->UserMail=$UserMail;
	}
	
	public function getUserPassword(){
		return $this->UserPassword;
	}
	public function setUserPassword($UserPassword){
		return $this->UserPassword=$UserPassword;
	}
	public function getUserGameId(){
		return $this->UserGameId;
	}
	public function setUserGameId($UserGameId){
		return $this->UserGameId=$UserGameId;
	}
	
	public function getUserGameOpponent(){
		return $this->UserGameOpponent;
	}
	public function setUserGameOpponent($UserGameOpponent){
		return $this->UserGameOpponent=$UserGameOpponent;
	}
	public function getUserGameColor(){
		return $this->UserGameColor;
	}
	public function setUserGameColor($UserGameColor){
		return $this->UserGameColor=$UserGameColor;
	}
	
	public function InsertUser(){
		include "connectToDB.php";
		$UserInsert=$conn->query("INSERT INTO users (UserName,UserPassword) 
		VALUES ($this->getUserName(),$this->getUserPassword())");
	}
	public function UserLogin(){
		include "connectToDB.php";
		$UserRequest=$conn->query("SELECT * FROM users 
        WHERE UserName=$this->getUserName(),  AND UserPassword=$this->getUserPassword()");
		if($UserRequest->num_rows==0){
			header("Location: ../index.php?error=1");
			return false;
		} else {
			while($row=$UserRequest->fetch_assoc()){
				$this->setUserId($row['UserId']);
				$this->setUserGameId($row['GameId']);
				$this->setUserGameOpponent($row['GameOpponent']);
				$this->setUserGameColor($row['GameColor']);
				if ($row["GameId"] == 0) {
					header("Location: indexMult.php");
				}else{
					header("Location: Ch/index.php");
				}  
				return true;
			}
		} 
	}
	
	public function DisplayAvailablePlayers(){
		include "connectToDB.php";
		$UserReq=$conn->query("SELECT * FROM users ORDER BY UserId");
		$existCount = $UserReq->num_rows;
		if ($existCount == 0) { // evaluate the count
			return "Tom";
		}
		if ($existCount > 0) {
			while($row = $UserReq->fetch_assoc()){
				$name = $row["UserName"];
				$token = $row["GameId"];
				if($row["UserName"] != $_SESSION['UserName']) { // if opponent name
					if ($row["GameId"] != 0) {
						$available = "not available";
					}else{
						$available = "available";
					}
					if ($token==0){
							$token=rand(10000, 10000000);
					}
					if ($row["GameId"] != 0) {
						?>
						<span style="color:red" class="UserNameS"> <?php echo $name;?>					
						</span>
						<?php
					} else {
						?>
						<span class="UserNameS" onclick="parent.location='redirect.php?id=<?php echo $token;?>&name=<?php echo $name;?>';"> <?php echo $name;?>
						</span>
						<?php
						
					}
					?>
						</span> is 
						<span class="ChatMessageS" > <?php echo $available;?>
						</span> </br>
					<?php
					
					
				}
			}
		}
	}
	public function DeleteGame($id){
		include "connectToDB.php";
		$token=0;
		
		$ChatReq=$conn->query("SELECT * FROM chats ORDER BY ChatId");
		$existCount = $ChatReq->num_rows;
		if ($existCount == 0) { // evaluate the count
			return "Tom";
		}
		if ($existCount > 0) {
			while($row = $ChatReq->fetch_assoc()){
				$gameChatID = $row["chatGameId"];			
				if($gameChatID == $id) {
					$GameChatIdDelete =$conn->query("DELETE FROM chats WHERE chatGameId=$gameChatID");

				}
			}
		} 
		$UserReq=$conn->query("SELECT * FROM users ORDER BY UserId");
		$existCount = $UserReq->num_rows;
		if ($existCount == 0) { // evaluate the count
			return "Tom";
		}
		if ($existCount > 0) {
			while($row = $UserReq->fetch_assoc()){
				$gameID = $row["GameId"];			
				if($gameID == $id) {
					$GameOpponent="";
					$GameColor="";
					$startMove="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
					$UserName=$_SESSION['UserName'];
					$GameIdInsert =$conn->query("UPDATE users SET GameId=$token, MoveString=$startMove, GameColor=$GameColor, GameOpponent=$GameOpponent WHERE GameId=$id");	
					
				}
			}
		}
	}
}
?>