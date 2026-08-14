const boardWidth = 10;
const boardHeight = 16;
let movePieceTimer = null;
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
  // createBoardCells();
  // renderShape(tetrisShapes.J, 4, 0);
  initializeLockBoard();
  spawnNewPiece();
  reRenderBoard();
  movePieceTimer = setInterval(movePieceDown, 500);
}

// Make it globally available
window.TetrisGame = {
  start: startTetris,
};

// SHAPES
const tetrisShapes = {
  I: { shape: [[1, 1, 1, 1]], color: "color-I" },
  J: {
    shape: [
      [1, 1, 1],
      [1, 0, 0],
    ],
    color: "color-J",
  },

  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "color-Z",
  },
  BOX: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "color-Box",
  },
  ASWD: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "color-shape",
  },
};

function renderShape(shape, startX, startY) {
  const boardCells = document.querySelectorAll("#tetrisBoard .tetris-cell");

  shape.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        const boardX = startX + x;
        const boardY = startY + y;

        const calculateIndex = boardY * boardWidth + boardX;

        const cell = boardCells[calculateIndex];

        if (cell) {
          cell.classList.add("filled");
          cell.classList.add(shape.color);
        }
      }
    });
  });
  console.log("RUN");
}

let currentPiece = null;
let xPosition = 0;
let yposition = 0;

let lockedBoard = [];

function initializeLockBoard() {
  lockedBoard = [];
  for (let y = 0; y < boardHeight; y++) {
    lockedBoard[y] = [];
    for (let x = 0; x < boardWidth; x++) {
      lockedBoard[y][x] = 0;
    }
  }
}

function spawnNewPiece() {
  const shapeKeys = Object.keys(tetrisShapes);

  const randomShapeKeys =
    shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
  currentPiece = tetrisShapes[randomShapeKeys];

  xPosition = Math.floor(boardWidth / 2) - 1;
  yposition = 0;

  if (!canmMovePiece(currentPiece, xPosition, yposition)) {
    stopGame();
    alert("Game Over!");
  }
}

function canmMovePiece(piece, newX, newY) {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] === 1) {
        const boardX = newX + x;
        const boardY = newY + y;

        // hit side wall
        if (boardX < 0 || boardX >= boardWidth) {
          return false;
        }

        // hit bottom
        if (boardY >= boardHeight) {
          return false;
        }

        // locked block stack
        if (boardY >= 0 && lockedBoard[boardY][boardX] !== 0) {
          return false;
        }
      }
    }
  }
  return true; // no collision
}

function lockPiece() {
  currentPiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        const boardX = xPosition + x;
        const boardY = yposition + y;

        if (boardY >= 0) {
          lockedBoard[boardY][boardX] = currentPiece.color;
        }
      }
    });
  });

  spawnNewPiece();
}

function reRenderBoard() {
  const boardCells = document.querySelectorAll("#tetrisBoard .tetris-cell");

  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      const cellIndex = y * boardWidth + x;
      const cell = boardCells[cellIndex];

      // TO CONTINUE
      cell.className = "tetris-cell";

      if (lockedBoard[y][x] !== 0) {
        cell.classList.add("filled");
        cell.classList.add(lockedBoard[y][x]);
      }
    }
  }
  if (currentPiece) {
    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          const boardX = xPosition + x;
          const boardY = yposition + y;

          if (
            boardY >= 0 &&
            boardY < boardHeight &&
            boardX >= 0 &&
            boardX < boardWidth
          ) {
            const index = boardY * boardWidth + boardX;
            const cell = boardCells[index];
            cell.classList.add("filled");
            cell.classList.add(currentPiece.color);
          }
        }
      });
    });
  }
}

function movePieceDown() {
  if (movePiece(xPosition, yposition + 1)) {
    yposition++;
  } else {
    lockPiece();
  }

  reRenderBoard();
}
