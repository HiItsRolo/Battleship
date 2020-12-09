
let ascWins = false;
let ascGames = false;
let ascTime = false;


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
                    let timePlayed = document.createElement('td');
                    name.innerHTML = data[i].UserName;
                    wins.innerHTML = data[i].NumWins;
                    losses.innerHTML = data[i].NumLosses;
                    games.innerHTML = data[i].NumGames;
                    timePlayed.innerHTML = data[i].TimePlayed;
                    row.appendChild(name);
                    row.appendChild(wins);
                    row.appendChild(losses);
                    row.appendChild(games);
                    row.appendChild(timePlayed);
                    leaderboard.appendChild(row);
                }        
			}
		}
	}

	xhr.open("POST", "leaderboard.php",true);	
	xhr.send();

}


function sortLeaderboardByWins(){
    ascWins = !ascWins;
    ascTime = false;
    ascGames = false;
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
                    let timePlayed = document.createElement('td');
                    name.innerHTML = data[i].UserName;
                    wins.innerHTML = data[i].NumWins;
                    losses.innerHTML = data[i].NumLosses;
                    games.innerHTML = data[i].NumGames; 
                    timePlayed.innerHTML = data[i].TimePlayed;
                    row.appendChild(name);
                    row.appendChild(wins);
                    row.appendChild(losses);
                    row.appendChild(games);
                    row.appendChild(timePlayed);
                    leaderboard.appendChild(row);
                }        
			}
		}
	}

	xhr.open("GET", "sortleaderboard.php?sort=Wins&asc=" + ascWins,true);	
	xhr.send();
}


function sortLeaderboardByTimePlayed(){
    ascTime = !ascTime;
    ascWins = false;
    ascGames = false;
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
                    let timePlayed = document.createElement('td');
                    name.innerHTML = data[i].UserName;
                    wins.innerHTML = data[i].NumWins;
                    losses.innerHTML = data[i].NumLosses;
                    games.innerHTML = data[i].NumGames;
                    timePlayed.innerHTML = data[i].TimePlayed;
                    row.appendChild(name);
                    row.appendChild(wins);
                    row.appendChild(losses);
                    row.appendChild(games);
                    row.appendChild(timePlayed);
                    leaderboard.appendChild(row);
                }        
			}
		}
	}

	xhr.open("GET", "sortleaderboard.php?sort=Time&asc=" + ascTime,true);	
	xhr.send();
}




function sortLeaderboardByGamesPlayed(){
    ascGames = !ascGames;
    ascTime = false;
    ascWins = false;
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
                    let timePlayed = document.createElement('td');
                    name.innerHTML = data[i].UserName;
                    wins.innerHTML = data[i].NumWins;
                    losses.innerHTML = data[i].NumLosses;
                    games.innerHTML = data[i].NumGames;
                    timePlayed.innerHTML = data[i].TimePlayed;
                    row.appendChild(name);
                    row.appendChild(wins);
                    row.appendChild(losses);
                    row.appendChild(games);
                    row.appendChild(timePlayed);
                    leaderboard.appendChild(row);
                }        
			}
		}
	}

	xhr.open("GET", "sortleaderboard.php?sort=Games&asc=" + ascGames,true);	
	xhr.send();
}