const gridContainer = document.getElementById('grid');
const gridSize = 3; // 3x3 grid

// Function to create the grid
function createGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        gridContainer.appendChild(cell);
    }
}

// Call the function to create the grid
createGrid();
