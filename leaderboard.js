


window.onload = function() {

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200) {
                let leaderboard = document.getElementById('leaderboard');
				let data = JSON.parse(xhr.responseText);
                n = data.length;        
                
                for (let i = 0; i < n; i++){              
                    let row = document.createElement('tr');
                    let name = document.createElement('td');
                    let wins = document.createElement('td');
                    let losses = document.createElement('td');
                    let games = document.createElement('td');
                    name.innerHTML = data[i].UserName;
                    wins.innerHTML = data[i].numWins;
                    losses.innerHTML = data[i].numLosses;
                    games.innerHTML = data[i].numGames;
                    row.appendChild(name);
                    row.appendChild(wins);
                    row.appendChild(losses);
                    row.appendChild(games);
                    leaderboard.appendChild(row);
                }        
			}
		}
	}

	xhr.open("POST", "leaderboard.php",true);	
	xhr.send();

}

function sortLeaderboardByWins(){

    let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200) {
                let leaderboard = document.getElementById('leaderboard');
                leaderboard.innerHTML = '';
				let data = JSON.parse(xhr.responseText);
                n = data.length;        
                
                for (let i = 0; i < n; i++){              
                    let row = document.createElement('tr');
                    let name = document.createElement('td');
                    let wins = document.createElement('td');
                    let losses = document.createElement('td');
                    let games = document.createElement('td');
                    name.innerHTML = data[i].UserName;
                    wins.innerHTML = data[i].numWins;
                    losses.innerHTML = data[i].numLosses;
                    games.innerHTML = data[i].numGames;
                    row.appendChild(name);
                    row.appendChild(wins);
                    row.appendChild(losses);
                    row.appendChild(games);
                    leaderboard.appendChild(row);
                }        
			}
		}
	}

	xhr.open("GET", "sortleaderboard.php?sort=Wins",true);	
	xhr.send();
}


function sortLeaderboardByLosses(){

    let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200) {
                let leaderboard = document.getElementById('leaderboard');
                leaderboard.innerHTML = '';
				let data = JSON.parse(xhr.responseText);
                n = data.length;        
                
                for (let i = 0; i < n; i++){              
                    let row = document.createElement('tr');
                    let name = document.createElement('td');
                    let wins = document.createElement('td');
                    let losses = document.createElement('td');
                    let games = document.createElement('td');
                    name.innerHTML = data[i].UserName;
                    wins.innerHTML = data[i].numWins;
                    losses.innerHTML = data[i].numLosses;
                    games.innerHTML = data[i].numGames;
                    row.appendChild(name);
                    row.appendChild(wins);
                    row.appendChild(losses);
                    row.appendChild(games);
                    leaderboard.appendChild(row);
                }        
			}
		}
	}

	xhr.open("GET", "sortleaderboard.php?sort=Losses",true);	
	xhr.send();
}


function sortLeaderboardByName(){
    let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200) {
                let leaderboard = document.getElementById('leaderboard');
                leaderboard.innerHTML = '';
				let data = JSON.parse(xhr.responseText);
                n = data.length;        
                
                for (let i = 0; i < n; i++){              
                    let row = document.createElement('tr');
                    let name = document.createElement('td');
                    let wins = document.createElement('td');
                    let losses = document.createElement('td');
                    let games = document.createElement('td');
                    name.innerHTML = data[i].UserName;
                    wins.innerHTML = data[i].numWins;
                    losses.innerHTML = data[i].numLosses;
                    games.innerHTML = data[i].numGames;
                    row.appendChild(name);
                    row.appendChild(wins);
                    row.appendChild(losses);
                    row.appendChild(games);
                    leaderboard.appendChild(row);
                }        
			}
		}
	}

	xhr.open("GET", "sortleaderboard.php?sort=Name",true);	
	xhr.send();
}

function sortLeaderboardByGamesPlayed(){
    let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200) {
                let leaderboard = document.getElementById('leaderboard');
                leaderboard.innerHTML = '';
				let data = JSON.parse(xhr.responseText);
                n = data.length;        
                
                for (let i = 0; i < n; i++){              
                    let row = document.createElement('tr');
                    let name = document.createElement('td');
                    let wins = document.createElement('td');
                    let losses = document.createElement('td');
                    let games = document.createElement('td');
                    name.innerHTML = data[i].UserName;
                    wins.innerHTML = data[i].numWins;
                    losses.innerHTML = data[i].numLosses;
                    games.innerHTML = data[i].numGames;
                    row.appendChild(name);
                    row.appendChild(wins);
                    row.appendChild(losses);
                    row.appendChild(games);
                    leaderboard.appendChild(row);
                }        
			}
		}
	}

	xhr.open("GET", "sortleaderboard.php?sort=Games",true);	
	xhr.send();
}