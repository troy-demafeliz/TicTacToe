// DOM Elements
const gridContainer = document.getElementById('grid');
const roundDisplay = document.getElementById('round-display');
const computerButton = document.getElementById('computer-button');
const playerButton = document.getElementById('two-player-button');

// Game Configuration
const GRID_SIZE = 3;
const MAX_ROUNDS = 3;
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Game State
let gameState = {
    currentPlayer: 'X',
    scores: { X: 0, O: 0 },
    rounds: 0,
    gameMode: null,
    userHasMoved: false
};

// Game Mode Selection
computerButton.addEventListener('click', () => setGameMode('computer'));
playerButton.addEventListener('click', () => setGameMode('player'));

function setGameMode(mode) {
    if (!gameState.userHasMoved) {
        highlightButton(mode === 'computer' ? computerButton : playerButton);
        gameState.gameMode = mode;
        enableGrid();
    }
}

function highlightButton(selectedButton) {
    [computerButton, playerButton].forEach(button => button.classList.remove('active'));
    selectedButton.classList.add('active');
}

// Grid Management
function createGrid() {
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.style.pointerEvents = 'none';
        cell.addEventListener('click', () => handleCellClick(cell));
        gridContainer.appendChild(cell);
    }
}

function handleCellClick(cell) {
    if (!cell.textContent) {
        cell.textContent = gameState.currentPlayer;
        gameState.userHasMoved = true;
        
        if (checkWinner(gameState.currentPlayer)) {
            handleWin();
        } else if (isTie()) {
            handleTie();
        } else {
            handleNextTurn();
        }
    }
}

// Game Logic
function handleWin() {
    setTimeout(() => {
        gameState.scores[gameState.currentPlayer]++;
        alert(`Player ${gameState.currentPlayer} wins! Current Score: X - ${gameState.scores.X}, O - ${gameState.scores.O}`);
        gameState.rounds++;
        updateRoundDisplay();
        
        if (gameState.rounds < MAX_ROUNDS) {
            resetGame();
        } else {
            alert(`Game Over! Final Score: X - ${gameState.scores.X}, O - ${gameState.scores.O}`);
            resetGame(true);
        }
    }, 100);
}

function handleTie() {
    setTimeout(() => {
        alert(`It's a tie! Current Score: X - ${gameState.scores.X}, O - ${gameState.scores.O}`);
        resetGame();
    }, 100);
}

function handleNextTurn() {
    if (gameState.gameMode === 'computer' && gameState.currentPlayer === 'X') {
        gameState.currentPlayer = 'O';
        setTimeout(makeComputerMove, 500);
    } else {
        gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
    }
}

function makeComputerMove() {
    const cells = document.querySelectorAll('.grid-cell');
    const emptyCells = Array.from(cells).filter(cell => !cell.textContent);
    
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.textContent = gameState.currentPlayer;

        if (checkWinner(gameState.currentPlayer)) {
            handleWin();
        } else if (isTie()) {
            handleTie();
        } else {
            gameState.currentPlayer = 'X';
        }
    }
}

// Game State Checks
function checkWinner(player) {
    const cells = document.querySelectorAll('.grid-cell');
    return WINNING_COMBINATIONS.some(combination => 
        combination.every(index => cells[index].textContent === player)
    );
}

function isTie() {
    const cells = document.querySelectorAll('.grid-cell');
    return Array.from(cells).every(cell => cell.textContent);
}

// UI Updates
function updateRoundDisplay() {
    roundDisplay.textContent = `Round ${gameState.rounds + 1}`;
}

function enableGrid() {
    document.querySelectorAll('.grid-cell')
        .forEach(cell => cell.style.pointerEvents = 'auto');
}

function disableGrid() {
    document.querySelectorAll('.grid-cell')
        .forEach(cell => cell.style.pointerEvents = 'none');
}

// Game Reset
function resetGame(newGame = false) {
    document.querySelectorAll('.grid-cell')
        .forEach(cell => cell.textContent = '');
    
    gameState.currentPlayer = 'X';
    gameState.userHasMoved = false;

    if (newGame) {
        gameState.scores = { X: 0, O: 0 };
        gameState.rounds = 0;
        gameState.gameMode = null;
        roundDisplay.textContent = 'Round 1';
        disableGrid();
    }
}

// Initialize Game
createGrid();
