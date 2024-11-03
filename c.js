const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status');
let playerScore = document.getElementById('player_wins');
let opponentScore = document.getElementById('opponent_wins');
let tieScore = document.getElementById('tie_occurence');
var winAudio = new Audio('C:\\Users\\erjan\\Desktop\\javascript practice\\tictactoe\\audios\\game-over-arcade-6435.mp3'); // Use a relative path
var loseAudio = new Audio('C:\\Users\\erjan\\Desktop\\javascript practice\\tictactoe\\audios\\marimba-lose-250960.mp3');
const restartButton = document.getElementById('btn');
// conditions
const conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = [
    '','','',
    '','','',
    '','','',
];
let currentPlayer = 'X';
let running = false;
let playerXWins = 0;
let playerOWins = 0;
// set the game first
function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClick)); // click a cell function
    statusText.textContent = `Player ${currentPlayer} place it now`; // monitor player
    running = true; // the game is running
}
// what will happen if you click it
function cellClick() {
    const cellIndex = this.getAttribute('cellIndex');
    if (options[cellIndex] !== "" || !running) {
        return
    }
    updateCell(this, cellIndex);
    checkWinner()
}
function updateCell(cell, index) { // update the options and cell
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function showButtonRestart() {
    restartButton.style.display = 'inline';
};
function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < conditions.length; i++ ) {
        const [a, b, c] = conditions[i]
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            roundWon = true;
            break; 
        }
    }
    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        running = false;
        if (currentPlayer === 'X') {
            playerXWins++;
            playerScore.textContent = parseInt(playerScore.textContent) + 1; // Increment tie score
        } else {
            playerOWins++;
            opponentScore.textContent = parseInt(opponentScore.textContent) + 1; // Increment tie score
        };
        if (playerXWins === 3 || playerOWins === 3) {
            statusText.textContent = `Overall Victory for ${currentPlayer}`;
            running = false;
            if (playerXWins > playerOWins) {
                winAudio.play(); 
            } else {
                loseAudio.play();
            }
            showButtonRestart(); // Show the button
            return;
        };
        setTimeout(resetBoard, 1000); // Delay to show who won before clearing the board
    } else if (!options.includes("")) {
        statusText.textContent = "It's a tie!";
        tieScore.textContent = parseInt(tieScore.textContent) + 1; // Increment tie score
        running = false;
        setTimeout(resetBoard, 1000); // Delay to show who won before clearing the board
    } else {
        switchPlayer();
    }
};
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer} place it now`;
};
function resetBoard() {
    options = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    statusText.textContent = `Player ${currentPlayer} place it now`;
    running = true;
};
restartButton.addEventListener('click', gameReset)
function gameReset() {
    options = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    statusText.textContent = `Player ${currentPlayer} place it now`;
    running = true;
    tieScore.textContent = 0;
    opponentScore.textContent = 0;
    playerScore.textContent = 0;
    playerXWins = 0;
    playerOWins = 0;
    restartButton.style.display = 'none'; // Hide the button after resetting
};
initializeGame();