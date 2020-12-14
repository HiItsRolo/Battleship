# Battleship
 CSCI 130 Project Battleship

To install webpages as host:

    -Apache + MySQL is required (Xampp)

    -in PHPMYADMIN: Create a User with the following properties:
        User name: ADMIN
        Host name: localhost
        Password: ADMIN
        Privileges: ALL
    
    -Create Battleship DB using the file "createDB.php" (eg localhost/{directory_name}/createDB.php)

    -Initialize DB with some users using the file "initDB.php"

To use the webpages as a user:
    -index.html is the home page

    -log in using the login.html page or create new user using signup.html, then log in. (the links on index will redirect to appropriate pages)

    -Click play game to go to the battleship game page

    -Enter a gameid# to connect to the desired game room, then click the connect button

    -You will be able to see your opponent's username in the opposite grid, as well as be able to send messages in the chat box at the top.

    -place all of your pieces, clicking the rotate your ship button to rotates the remaining pieces as necessary.

    -When the user has placed all of their pieces from the yellow box, the game will be able to start when the start game button is clicked.

    -When a player is ready, a ready status indicator will appear beneath their name.

    -When both players are ready, "Waiting for game to start" will change to "Please wait, the game is about to start"

    -A short delay will happen to ensure that the server information is properly synced

    -The first player should now be able to play with status "User Turn"

    -Players go back and forth playing until the game ends. Moves are communicated using MySQL and PHP.

    -When the game ends, an alert will appear in the browser window. At the point, the win and loss handler data will be sent to the server to register in the DB table users

    -Leaderboards can be seen from the Leaderboards page, accessed from index.html.