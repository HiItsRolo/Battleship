

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
    const computerGrid = document.getElementById('grid-computer');
    const displayGrid = document.getElementsByClassName('grid-display');
    const ships = document.querySelectorAll('.ship');
    const destroyer = document.getElementsByClassName('destroyer-container');
    const submarine = document.getElementsByClassName('submarine-container');
    const cruiser = document.getElementsByClassName('cruiser-container');
    const battleship = document.getElementsByClassName('battleship-container');
    const carrier = document.getElementsByClassName('carrier-container');
    const startButton = document.getElementById('start');
    const rotateButton = document.getElementById('rotate');
    const turnDisplay = document.getElementById('whose-go');
    const infoDisplay = document.getElementById('info');
    const userSquares = [];
    const computerSquares = [];
    const width = 10;
    let isHorizontal = true;
    let isGameOver = false;
    let currentPlayer = 'user';

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
    createBoard(computerGrid, computerSquares);


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

    //Draw AI's ships in random location
    function generate(ship) {
        let randomDirection = Math.floor(Math.random() * ship.directions.length);
        let current = ship.directions[randomDirection];
        if (randomDirection == 0) direction = 1;
        if (randomDirection == 1) direction = 10;
        let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)));

        const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'))
        const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1);
        const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0);

        if(!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => computerSquares[randomStart + index].classList.add('taken',ship.name));
        else generate(ship)
    }

    for(let i=0;i < shipArray.length;i++){
        generate(shipArray[i]);
    }

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

    var interval;

    function startGame(){
        if(displayGrid[0].innerHTML.trim().length == 0){
            document.getElementById("griddisplay").style.display = "none";
            if(document.getElementById("connectServer").style.display == "none") 
            {   
                sendReady();
                interval = checkReady();
            }
            else
                alert("Please Connect to a server")
        }
        else{
            alert("Not ready yet, Please place all of your pieces");
        }
    }

    startButton.addEventListener('click',startGame)

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
            playGame();
        }
        else{
            setTimeout(checkReady,5000);
        }
    }


    

    function playGame(){
        if (isGameOver) return
        if (currentPlayer == 'user'){
            turnDisplay.innerHTML = 'Your Turn'
            computerSquares.forEach(square => square.addEventListener('click',function(e){
                revealSquare(square)
            }))
        }
        if (currentPlayer == 'computer'){
            turnDisplay.innerHTML = 'Computer Go'
            setTimeout (computerGo, 1000)
        }
    }


    let destroyerCount = 0;
    let submarineCount = 0;
    let cruiserCount = 0;
    let battleshipCount = 0;
    let carrierCount = 0;

    function revealSquare(square){
        if (!square.classList.contains('boom') && !square.classList.contains('miss')){
            if (square.classList.contains('destroyer')) destroyerCount++
            if (square.classList.contains('submarine')) submarineCount++
            if (square.classList.contains('cruiser')) cruiserCount++
            if (square.classList.contains('battleship')) battleshipCount++
            if (square.classList.contains('carrier')) carrierCount++
          
            if (square.classList.contains('taken')){
                square.classList.add('boom')
            }
            else{
                square.classList.add('miss')
            }
            checkForWins();
            currentPlayer = 'computer'
            playGame()
        }
        
    }

    let cpudestroyerCount = 0;
    let cpusubmarineCount = 0;
    let cpucruiserCount = 0;
    let cpubattleshipCount = 0;
    let cpucarrierCount = 0;

    function computerGo() {
        let random = Math.abs(Math.floor(Math.random() * userSquares.length))
        if (!userSquares[random].classList.contains('boom')){
            userSquares[random].classList.add('boom')
            if (userSquares[random].classList.contains('destroyer')) cpudestroyerCount++
            if (userSquares[random].classList.contains('submarine')) cpusubmarineCount++
            if (userSquares[random].classList.contains('cruiser')) cpucruiserCount++
            if (userSquares[random].classList.contains('battleship')) cpubattleshipCount++
            if (userSquares[random].classList.contains('carrier')) cpucarrierCount++
        }
        else computerGo()
        checkForWins();
        currentPlayer = 'user'
        turnDisplay.innerHTML = 'Your Go'
    }
    
    function checkForWins(){
        checkHumanWin()
        checkCPUWin()
    }

    function checkHumanWin(){
        if (destroyerCount === 2){
            infoDisplay.innerHTML = "You sunk the computer's destroyer"
            destroyerCount = 10
        }
        if (submarineCount === 3){
            infoDisplay.innerHTML = "You sunk the computer's submarine"
            submarineCount = 10
        }
        if (cruiserCount === 3){
            infoDisplay.innerHTML = "You sunk the computer's cruiser"
            cruiserCount = 10
        }
        if (battleshipCount === 4){
            infoDisplay.innerHTML = "You sunk the computer's battleship"
            battleshipCount = 10
        }
        if (carrierCount === 5){
            infoDisplay.innerHTML = "You sunk the computer's carrier"
            carrierCount = 10
        }

        if((battleshipCount + submarineCount + cruiserCount + battleshipCount + carrierCount) === 50){
            infoDisplay.innerHTML = "You Win"
            gameOver()
        }
    }

    function checkCPUWin(){
        if (cpudestroyerCount === 2){
            infoDisplay.innerHTML = "You sunk the player's destroyer"
            cpudestroyerCount = 10
        }
        if (cpusubmarineCount === 3){
            infoDisplay.innerHTML = "You sunk the players's submarine"
            cpusubmarineCount = 10
        }
        if (cpucruiserCount === 3){
            infoDisplay.innerHTML = "You sunk the players's cruiser"
            cpucruiserCount = 10
        }
        if (cpubattleshipCount === 4){
            infoDisplay.innerHTML = "You sunk the player's battleship"
            battleshipCount = 10
        }
        if (cpucarrierCount === 5){
            infoDisplay.innerHTML = "You sunk the players's carrier"
            cpucarrierCount = 10
        }

        if((cpubattleshipCount + cpusubmarineCount + cpucruiserCount + cpubattleshipCount + cpucarrierCount) === 50){
            infoDisplay.innerHTML = "CPU Win"
            gameOver()
        }
    }

    function gameOver(){
        isGameOver = true;
        startButton.removeEventListener('click',playGame)
    }



})