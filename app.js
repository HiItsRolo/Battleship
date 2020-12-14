

window.onload = function() {

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200) {
				alert("Hello, Welcome to Battleship");
			}
		}
	}

	xhr.open("POST", "resetGameTable.php",true);	
	xhr.send();
}

var interval;
let ready = false;

function startSession(){
    let gameid = JSON.stringify(document.getElementById("gameid").value);
    let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                if(data == "Player Not Logged In"){
                    alert("Please Log In")
                }
                else{
                    document.getElementById("connectServer").style.display = "none";
                    document.getElementById("serverStatus").innerHTML = "Connected to GameID: " + gameid;
                    document.getElementById("gameid").style.display = "none";
                    document.getElementById("sendmessage").style.display = "inline";
                    document.getElementById("chatmessage").style.display = "inline";
                    document.getElementById("chatBox").style.display = "block";

                    document.getElementById('username').innerHTML = "Username: " + data;
                    setTimeout(checkforOpponent,5000);
                    setTimeout(testServer,5000);
                }
			}
		}
	}

    xhr.open("POST", "startgamesession.php",true);	
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.send(gameid);
}

function checkforOpponent(){
    let xhr = new XMLHttpRequest()
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                if (data){
                    document.getElementById('opponentname').innerHTML = "Username: " + data;
                    clearTimeout(checkforOpponent);
                    setTimeout(checkGameReady,5000);
                }
                else{
                    setTimeout(checkforOpponent,5000);
                }
			}
		}
	}

	xhr.open("POST", "checkforopponent.php",true);	
    xhr.send();
}


function checkGameReady(){
    let xhr = new XMLHttpRequest()
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                if (data == "Opponent Ready"){
                    document.getElementById('opponentStatus').innerHTML = "Ready";
                    setTimeout(checkGameReady,5000);
                }
                else if (data == true)
                {                      
                    document.getElementById('opponentStatus').innerHTML = "Ready";
                    document.getElementById('userStatus').innerHTML = "Ready";
                    ready = true;
                }
                else{
                    setTimeout(checkGameReady,5000);
                }
			}
		}
	}

	xhr.open("POST", "checkReady.php",true);	
    xhr.send();
}

function initGame(){
    let xhr = new XMLHttpRequest()
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200) {

			}
		}
	}

	xhr.open("POST", "initGame.php",true);	
    xhr.send(); 
}


function testServer(){
    let chat = document.getElementById("chatBox");
    let xhr = new XMLHttpRequest()
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                if (data){
                    chat.value += "Opponent: " + data + '\r\n';
                    chat.scrollTop = chat.scrollHeight;
                }
			}
		}
	}

	xhr.open("POST", "receivemessage.php",true);	
    xhr.send();
    setTimeout(testServer,5000);
}


function sendMessage(){
    let comms = document.getElementById("chatmessage");
    let chat = document.getElementById("chatBox");

    let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200) {
                chat.value += "You: " + comms.value + '\r\n';
                comms.value = "";  
                chat.scrollTop = chat.scrollHeight;
                document.getElementById("sendmessage").disabled = true;                
                setTimeout(function() {document.getElementById("sendmessage").disabled = false}, 5000);
            }
		}
	}

	xhr.open("GET", "sendmessage.php?message=" + JSON.stringify(comms.value),true);	
	xhr.send();
}







document.addEventListener('DOMContentLoaded',() => {
    const userGrid = document.getElementById('grid-user');
    const opponentGrid = document.getElementById('grid-opponent');
    const displayGrid = document.getElementsByClassName('grid-display');
    const ships = document.querySelectorAll('.ship');
    const destroyer = document.getElementsByClassName('destroyer-container');
    const submarine = document.getElementsByClassName('submarine-container');
    const cruiser = document.getElementsByClassName('cruiser-container');
    const battleship = document.getElementsByClassName('battleship-container');
    const carrier = document.getElementsByClassName('carrier-container');
    const startButton = document.getElementById('start');
    const rotateButton = document.getElementById('rotate');
    const turnDisplay = document.getElementById('currentTurn');
    const infoDisplay = document.getElementById('info');
    const playerShip = document.getElementById('userShipsRemaining');
    const opponentShip = document.getElementById('opponentShipsRemaining');
    const userSquares = [];
    const opponentSquares = [];
    const width = 10;
    let isHorizontal = true;
    let isGameOver = false;
    let currentPlayer = 'waiting';

    //create board
    function createBoard(grid, squares){
        let table = document.createElement('table');
        table.classList = "playtable";
        let tbody = document.createElement('tbody');
        for(let i=0; i < width; i++){
            let tr = document.createElement('tr');
            for(let j=0; j < width; j++){
                const square = document.createElement('td');
                square.dataset.id = i*10 + j;
                square.classList = "gridSquare";
                tr.appendChild(square);
                squares.push(square);
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        grid.appendChild(table);
    }

    createBoard(userGrid, userSquares);
    createBoard(opponentGrid, opponentSquares);


    //array of ships
    const shipArray = [
        {
            name: 'destroyer',
            directions: [
                [0,1],
                [0,width]
            ]
        }, 
        {
            name: 'submarine',
            directions: [
                [0,1,2],
                [0,width,width*2]
            ]
        },
        {
            name: 'cruiser',
            directions: [
                [0,1,2],
                [0,width,width*2]
            ]
        },
        {
            name: 'battleship',
            directions: [
                [0,1,2,3],
                [0,width,width*2,width*3]
            ]
        },
        {
            name: 'carrier',
            directions: [
                [0,1,2,3,4],
                [0,width,width*2,width*3,width*4]
            ]
        },
    ]

    //rotate the ships
    function rotate() {
        if (isHorizontal) {
            if(typeof destroyer[0] != 'undefined')
            destroyer[0].classList.toggle('destroyer-container-vertical');
            if(typeof submarine[0] != 'undefined')
            submarine[0].classList.toggle('submarine-container-vertical');
            if(typeof cruiser[0] != 'undefined')
            cruiser[0].classList.toggle('cruiser-container-vertical');
            if(typeof battleship[0] != 'undefined')
            battleship[0].classList.toggle('battleship-container-vertical');
            if(typeof carrier[0] != 'undefined')
            carrier[0].classList.toggle('carrier-container-vertical');
            isHorizontal = false;
            return
        }
        if (!isHorizontal) {
            if(typeof destroyer[0] != 'undefined')
            destroyer[0].classList.toggle('destroyer-container-vertical');
            if(typeof submarine[0] != 'undefined')
            submarine[0].classList.toggle('submarine-container-vertical');
            if(typeof cruiser[0] != 'undefined')
            cruiser[0].classList.toggle('cruiser-container-vertical');
            if(typeof battleship[0] != 'undefined')
            battleship[0].classList.toggle('battleship-container-vertical');
            if(typeof carrier[0] != 'undefined')
            carrier[0].classList.toggle('carrier-container-vertical');
            isHorizontal = true;
            return
        }

    }
    rotateButton.addEventListener('click', rotate);

 

    ships.forEach(ship => ship.addEventListener('dragstart',dragStart))
    userSquares.forEach(square => square.addEventListener('dragstart',dragStart))
    userSquares.forEach(square => square.addEventListener('dragover',dragOver))
    userSquares.forEach(square => square.addEventListener('dragenter',dragEnter))
    userSquares.forEach(square => square.addEventListener('dragleave',dragLeave))
    userSquares.forEach(square => square.addEventListener('drop',dragDrop))
    userSquares.forEach(square => square.addEventListener('dragend',dragEnd))

    let selectedShipNameWithIndex
    let draggedShip
    let draggedShiplength

    ships.forEach(ship => ship.addEventListener('mousedown',(e) => {
        selectedShipNameWithIndex = e.target.id;
    }))

    function dragStart(){
        draggedShip = this
        draggedShiplength = this.childNodes.length/2 -1
    }
    function dragOver(e){
        e.preventDefault()
    }
    function dragEnter(e){
        e.preventDefault()
    }
    function dragLeave(){
    }
    function dragDrop(){
        let shipNameWithLastId = draggedShip.lastChild.previousSibling.id
        let shipClass = shipNameWithLastId.slice(0,-2)

        let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))

        var shipLastId;
        var newNotAllowedHorizontal;
        var newNotAllowedVertical;
        var selectedShipIndex;

        if(isHorizontal){
            shipLastId = lastShipIndex + parseInt(this.dataset.id)
            const notAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,100,1,11,21,31,41,51,61,71,81,91,101,2,12,22,32,42,52,62,72,82,92,102,3,13,23,33,43,53,63,73,83,93,103];
            newNotAllowedHorizontal = notAllowedHorizontal.splice(0, (10*lastShipIndex)+(1*lastShipIndex));
            selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));
            shipLastId = shipLastId - selectedShipIndex;

        }

        else{
            shipLastId = (lastShipIndex*width) + parseInt(this.dataset.id)
            const notAllowedVertical = [109,108,107,106,105,104,103,102,101,100,9,8,7,6,5,4,3,2,1,0,119,118,117,116,115,114,113,112,111,110,19,18,17,16,15,14,13,12,11,10,129,128,127,126,125,124,123,122,121,120,29,28,27,26,25,24,23,22,21,20,139,138,137,136,135,134,133,132,131,130,39,38,37,36,35,34,33,32,31,30]
            newNotAllowedVertical = notAllowedVertical.splice(0, (20*lastShipIndex));
            selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));
            shipLastId = shipLastId - (selectedShipIndex*width);

        }
        
        
        
  
        
        if(isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)){
            for(let i=0;i<draggedShiplength;i++){
                if(userSquares[parseInt(this.dataset.id)-selectedShipIndex + i].classList.contains('taken')){
                    return;
                }
            }
            for(let i=0;i<draggedShiplength;i++){
                userSquares[parseInt(this.dataset.id)-selectedShipIndex + i].classList.add('taken',shipClass)
            }
        }
        else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)){
            for(let i=0;i<draggedShiplength;i++){
                if(userSquares[parseInt(this.dataset.id) + (width*(i-selectedShipIndex))].classList.contains('taken')){
                    return;
                }
            }
            for(let i=0;i<draggedShiplength;i++){
                userSquares[parseInt(this.dataset.id) + (width*(i-selectedShipIndex))].classList.add('taken',shipClass)
            }
        }
        else{
            return
        }

        displayGrid[0].removeChild(draggedShip);

    }

    function dragEnd(){
    }


    //game logic

    startButton.addEventListener('click',startGame)

    function startGame(){
        if(displayGrid[0].innerHTML.trim().length == 0){
            document.getElementById("griddisplay").style.display = "none";
            if(document.getElementById("connectServer").style.display == "none") 
            {
                startButton.removeEventListener('click',startGame)   
                sendReady();
                checkReady();
            }
            else
                alert("Please Connect to a server")
        }
        else{
            alert("Not ready yet, Please place all of your pieces");
        }
    }



    let destroyerCount = 0;
    let submarineCount = 0;
    let cruiserCount = 0;
    let battleshipCount = 0;
    let carrierCount = 0;

    
    let OpponentdestroyerCount = 0;
    let OpponentsubmarineCount = 0;
    let OpponentcruiserCount = 0;
    let OpponentbattleshipCount = 0;
    let OpponentcarrierCount = 0;

    let userShipCount = 5;
    let opponentShipCount = 5;

    function sendReady(){
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200) {
                    document.getElementById('userStatus').innerHTML = "Ready";
                }
            }
        }
    
        xhr.open("POST", "readyUp.php",true);	
        xhr.send();
    }


    function checkReady(){

        if(ready){
            clearTimeout(checkReady);
            initGame();
            turnDisplay.innerHTML = "Please wait, the game is about to start"
            setTimeout(activateButtons,10000);
        }
        else{
            setTimeout(checkReady,5000);
        }
    }

    function activateButtons(){
        opponentSquares.forEach(square => square.addEventListener('click',function(e){
            checkMove(square)
        }))

        updateTimer();

        playGame();
    }

    
let timer = document.getElementById('gameTimer');   
var startTime;
let elapsedTime = 0;
var timeInterval;

function updateTimer(){     
    startTime = Date.now() - elapsedTime;
    timeInterval = setInterval(function printTime(){
        elapsedTime = Date.now() - startTime;
        timer.innerHTML = "Time Elapsed: "+timeToString(elapsedTime);
    },1000)
   
}


function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
    if(hh < 10)
    hh = "0"+hh;
  
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
    if(mm < 10)
    mm = "0"+mm;

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    if(ss < 10)
    ss = "0"+ss;
    
    return hh+':'+mm+':'+ss;
  }

    function getAction(){
        if (currentPlayer == 'user'){

        }
        if (currentPlayer == 'opponent'){
            setTimeout (receiveMove, 500)
        }
    }
    
    function checkMove(square){
        if (currentPlayer == 'opponent'){
            getAction();
        }
        else if (!square.classList.contains('boom') && !square.classList.contains('miss')){
            sendMove(square.dataset.id);
            receiveResponse(square);
        }
        else{
            getAction();
        }
    }

    function sendMove(moveid){
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200) {
                    currentPlayer = 'opponent'
                }
            }
        }
    
        xhr.open("GET", "sendmove.php?action="+JSON.stringify(moveid),true);	
        xhr.send();

    }

    function receiveMove(){
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    if (data){
                        sendResponse(data);
                    }
                    else{
                        setTimeout(receiveMove,500)
                    }
                }
            }
        }
    
        xhr.open("POST", "receivemove.php",true);	
        xhr.send();

    }


    function sendResponse(action){
            var temp
            if (userSquares[action].classList.contains('destroyer')) {
                userSquares[action].classList.add('boom')
                OpponentdestroyerCount++
                temp = "HitDestroyer"
            }
            else if (userSquares[action].classList.contains('submarine')) {
                userSquares[action].classList.add('boom')
                OpponentsubmarineCount++
                temp = "HitSubmarine"
            }
            else if (userSquares[action].classList.contains('cruiser')) {
                userSquares[action].classList.add('boom')
                OpponentcruiserCount++
                temp = "HitCruiser"
            }
            else if (userSquares[action].classList.contains('battleship')) {
                userSquares[action].classList.add('boom')
                OpponentbattleshipCount++
                temp = "HitBattleship"
            }
            else if (userSquares[action].classList.contains('carrier')) {
                userSquares[action].classList.add('boom')
                OpponentcarrierCount++
                temp = "HitCarrier"
            }
            else{
                userSquares[action].classList.add('miss')
                temp = "Miss"
            }
        

        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200) {
                    setTimeout(waitForUpdate,500)
                }
            }
        }
    
        xhr.open("POST", "sendresponse.php?action="+JSON.stringify(temp),true);	
        xhr.send();

    }

    function receiveResponse(square){
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    if (data == "HitDestroyer"){
                        square.classList.add('boom');
                        destroyerCount++;
                        updateTurn();
                    }
                    else if (data == "HitSubmarine"){
                        square.classList.add('boom');
                        submarineCount++;
                        updateTurn();
                    }
                    else if (data == "HitCruiser"){
                        square.classList.add('boom');
                        cruiserCount++;
                        updateTurn();
                    }
                    else if (data == "HitBattleship"){
                        square.classList.add('boom');
                        battleshipCount++;
                        updateTurn();
                    }
                    else if (data == "HitCarrier"){
                        square.classList.add('boom');
                        carrierCount++;
                        updateTurn();
                    }
                    else if (data == "Miss"){
                        square.classList.add('miss');
                        updateTurn();
                    }
                    else{
                        setTimeout(receiveResponse(square),500)
                    }
                }
            }
        }
    
        xhr.open("POST", "receiveresponse.php",true);	
        xhr.send();

    }

    function waitForUpdate(){
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    if (data)
                        setTimeout(playGame,500);
                    else
                        setTimeout(waitForUpdate,500);
                }
            }
        }
    
        xhr.open("POST", "waitforupdate.php",true);	
        xhr.send();
    }

    function updateTurn(){
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200) {
                    setTimeout(playGame,500);
                }
            }
        }
    
        xhr.open("POST", "updateTurn.php",true);	
        xhr.send();
    }

    function playGame(){
        checkForWins();
        playerShip.innerHTML = "Ships Remaining: " + userShipCount;
        opponentShip.innerHTML = "Ships Remaining: " + opponentShipCount;

            if(isGameOver){
                alert("The game is over")
            }
            else{
            let xhr = new XMLHttpRequest()
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE){
                    if(xhr.status === 200) {
                        let data = JSON.parse(xhr.responseText);
                        if(data == "User"){
                            currentPlayer = "user"
                            turnDisplay.innerHTML = "User Turn"
                            getAction();
                        }
                        else if(data == "Opponent"){
                            currentPlayer = "opponent"
                            turnDisplay.innerHTML = "Opponent Turn"
                            getAction();
                        }
                        else{
                            alert("Error");
                        }

                    }
                }
            }
        
            xhr.open("POST", "checkTurn.php",true);	
            xhr.send();
            }
    }

    
    function checkForWins(){
        checkHumanWin()
        checkOpponentWin()
    }

    function checkHumanWin(){
        if (destroyerCount === 2){
            opponentShipCount--;
            infoDisplay.innerHTML = "You sunk the opponent's destroyer";
            destroyerCount = 10
        }
        if (submarineCount === 3){
            opponentShipCount--;
            infoDisplay.innerHTML = "You sunk the opponent's submarine";
            submarineCount = 10
        }
        if (cruiserCount === 3){
            opponentShipCount--;
            infoDisplay.innerHTML = "You sunk the opponent's cruiser";
            cruiserCount = 10
        }
        if (battleshipCount === 4){
            opponentShipCount--;
            infoDisplay.innerHTML = "You sunk the opponent's battleship";
            battleshipCount = 10
        }
        if (carrierCount === 5){
            opponentShipCount--;
            infoDisplay.innerHTML = "You sunk the opponent's carrier";
            carrierCount = 10
        }

        if((destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount) === 50){
            infoDisplay.innerHTML = "You Win";

            let data = timeToString(elapsedTime);
            let xhr = new XMLHttpRequest()
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE){
                    if(xhr.status === 200) {
                        
                    }
                }
            }
        
            xhr.open("GET", "wongame.php?timePlayed="+JSON.stringify(data),true);	
            xhr.send();

            gameOver()
        }
    }

    function checkOpponentWin(){
        if (OpponentdestroyerCount === 2){
            userShipCount--;
            infoDisplay.innerHTML = "Opponent sunk your destroyer"
            OpponentdestroyerCount = 10
        }
        if (OpponentsubmarineCount === 3){
            userShipCount--;
            infoDisplay.innerHTML = "Opponent sunk your submarine"
            OpponentsubmarineCount = 10
        }
        if (OpponentcruiserCount === 3){
            userShipCount--;
            infoDisplay.innerHTML = "Opponent sunk your cruiser"
            OpponentcruiserCount = 10
        }
        if (OpponentbattleshipCount === 4){
            userShipCount--;
            infoDisplay.innerHTML = "Opponent sunk your battleship"
            OpponentbattleshipCount = 10
        }
        if (OpponentcarrierCount === 5){
            userShipCount--;
            infoDisplay.innerHTML = "Opponent sunk your carrier"
            OpponentcarrierCount = 10
        }

        if((OpponentdestroyerCount + OpponentsubmarineCount + OpponentcruiserCount + OpponentbattleshipCount + OpponentcarrierCount) === 50){
            infoDisplay.innerHTML = "Opponent Win"

            let data = timeToString(elapsedTime);
            let xhr = new XMLHttpRequest()
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE){
                    if(xhr.status === 200) {
                        
                    }
                }
            }
        
            xhr.open("GET", "lostgame.php?timePlayed="+JSON.stringify(data),true);	
            xhr.send();

            gameOver()
        }
    }

    function gameOver(){
        clearInterval(timeInterval);
        isGameOver = true;
    }



})