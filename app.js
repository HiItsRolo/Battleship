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
    let currentPlayer = 'user'

    //create board
    function createBoard(grid, squares){
        let table = document.createElement('table');
        table.classList = "playtable";
        let tbody = document.createElement('tbody');
        for(let i=0; i < width; i++){
            let tr = document.createElement('tr');
            for(let j=0; j < width; j++){
                const square = document.createElement('td');
                square.dataset.id = i*10+j;
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
        let shipLastId = lastShipIndex + parseInt(this.dataset.id)

        const notAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93]
        
        let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10*lastShipIndex)
        const notAllowedVertical = [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]

        let newNotAllowedVertical = notAllowedVertical.splice(0,10*lastShipIndex)
  
        selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
        
        shipLastId = shipLastId - selectedShipIndex
        
        if(isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)){
            for(let i=0;i<draggedShiplength;i++){
                userSquares[parseInt(this.dataset.id)-selectedShipIndex + i].classList.add('taken',shipClass)
            }
        }
        else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)){
            for(let i=0;i<draggedShiplength;i++){
                userSquares[parseInt(this.dataset.id)-selectedShipIndex + width*i].classList.add('taken',shipClass)
            }
        }
        else{
            return
        }
        console.log(displayGrid[0])
        displayGrid[0].removeChild(draggedShip)

    }

    function dragEnd(){
    }


    //game logic
    function playGame(){
        if (isGameOver) return
        if (currentPlayer == 'user'){
            turnDisplay.innerHTML = 'Your Go'
            computerSquares.forEach(square => square.addEventListener('click',function(e){
                revealSquare(square)
            }))
        }
        if (currentPlayer == 'computer'){
            turnDisplay.innerHTML = 'Computer Go'
            setTimeout (computerGo, 1000)
        }
    }
    startButton.addEventListener('click',playGame)

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