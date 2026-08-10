const boardWidth = 10;
const boardHeight = 5;

function createBoardCells() {
  const tetrisBoard = document.querySelector("#tetrisBoard");
  tetrisBoard.innerHTML = "";

  //   200 cells (10 wide x 20 height)
  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      const cell = document.createElement("div");
      cell.className = "tetris-cell";
      tetrisBoard.appendChild(cell);
    }
  }
}

// initialize game
function startTetris() {
  createBoardCells();
}

// Make it globally available
window.TetrisGame = {
  start: startTetris,
};
