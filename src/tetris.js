// // REPROGRAM WITH OWN LOGIC
let movePieceTimer;
const gridWidth = 10; // 10 grid columns
const gridHeight = 20; // 16 grid rows
let newGridBoard = [];

const createGridDisplay = () => {
  const tetrisGrid = document.querySelector("#tetrisBoard");
  tetrisGrid.innerHTML = ""; // this stop the A button to recreate the grid resulting to empty space
  for (let h = 0; h < gridHeight; h++) {
    // h++ to prevent infinite loop and crashing
    for (let w = 0; w < gridWidth; w++) {
      // w++ to also prevent infinite loop and crashing
      const gridCell = document.createElement("div");
      gridCell.className = "tetris-cell"; // gives the created div a class = tetris-cell for css styling
      tetrisGrid.appendChild(gridCell); // append the created div inside tetrisBoard
    }
  }
};

// displays the tetris game after the A button was clicked
function startTetris() {
  createGridBoard();
  createGridDisplay();
  spawnShape();
}

// Makes the function accessible (global) via other js files
globalThis.TetrisGame = {
  start: startTetris,
};

// // SHAPES
const tetrisShapes = {
  I: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
    color: "color-I",
  },
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

const getRandomShape = () => {
  const tetrisKeys = Object.keys(tetrisShapes); // converts tetrisShapes object into Array and get the Keys
  const randomShapeIndex = Math.floor(Math.random() * tetrisKeys.length); // generate random Index base on tetrisShape index number
  const shapeKey = tetrisKeys[randomShapeIndex]; // random generated shape Key
  const combineKeyValue = tetrisShapes[shapeKey]; // random generated shape value
  return combineKeyValue; // for render function
};

// displays generated shape when called
let currentShape;
let startXPosition = 3;
let startYPosition = 0;

const spawnShape = () => {
  currentShape = getRandomShape();
  currentPositionX = 3;
  currentPositionY = 0;

  drawPiece(currentShape, currentPositionX, currentPositionY);
  if (movePieceTimer) {
    clearInterval(movePieceTimer);
  }

  movePieceTimer = setInterval(moveDown, 500);
};

//
const renderShape = (
  shape,
  startX,
  startY, // shape = tetrisShape, startX and startY = target column and row
) => {
  const gridBoardCell = document.querySelectorAll("#tetrisBoard .tetris-cell");

  //   shape.shape = tetrisShapes {shapes}
  // Loops through each row inside the 2D matrix array.
  shape.shape.forEach((row, y) => {
    // row = item in Array, y = current index of the row
    // Loops through each individual cell inside the current row array.
    row.forEach((value, x) => {
      // Checks if the current cell in the piece needs to be painted.
      if (value === 1) {
        // This cell needs to be drawn at column boardX, row boardY on the game board.
        const boardX = startX + x;
        const boardY = startY + y;

        // Converts 2D grid coordinates $(\text{X, Y})$ into a single 1D index array number.
        const calculateIndex = boardY * gridWidth + boardX;

        // Selects the specific <div> element from our DOM list corresponding to calculateIndex
        const cell = gridBoardCell[calculateIndex];

        if (cell) {
          cell.classList.add("filled");
          cell.classList.add(shape.color);
        }
      }
    });
  });
};

const moveDown = () => {
  const pieceHeight = currentShape.shape.length;

  if (currentPositionY + pieceHeight < gridHeight) {
    clearPiece(currentShape, currentPositionX, currentPositionY);
    currentPositionY += 1;
    drawPiece(currentShape, currentPositionX, currentPositionY);
  } else {
    lockPiece(currentShape, currentPositionX, currentPositionY);
  }
};

const drawPiece = (shape, currentX, currentY) => {
  const tetrisCell = document.querySelectorAll("#tetrisBoard .tetris-cell");
  // currentShape = shape & color
  shape.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        const boardX = currentX + x;
        const boardY = currentY + y;

        const calculate2DArray = boardY * gridWidth + boardX;

        const converted1DArray = tetrisCell[calculate2DArray];

        if (converted1DArray) {
          converted1DArray.classList.add("filled");
          converted1DArray.classList.add(shape.color);
        }
      }
    });
  });
};

const clearPiece = (shape, currentX, currentY) => {
  const tetrisCell = document.querySelectorAll("#tetrisBoard .tetris-cell");
  shape.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        const boardX = currentX + x;
        const boardY = currentY + y;

        const calculate2DArray = boardY * gridWidth + boardX;

        const converted1DArray = tetrisCell[calculate2DArray];

        if (converted1DArray) {
          converted1DArray.classList.remove("filled");
          converted1DArray.classList.remove(shape.color);
        }
      }
    });
  });
};

const movePieceLeft = () => {
  clearPiece(currentShape, currentPositionX, currentPositionY);
  currentPositionX -= 1;
  drawPiece(currentShape, currentPositionX, currentPositionY);
};

const movePieceRight = () => {
  clearPiece(currentShape, currentPositionX, currentPositionY);
  currentPositionX += 1;
  drawPiece(currentShape, currentPositionX, currentPositionY);
};

// left & right movement
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      movePieceLeft();
      break;
    case "ArrowRight":
    case "d":
      movePieceRight();
      break;
  }
});

const createGridBoard = () => {
  newGridBoard = Array.from({ length: gridHeight }, () =>
    Array(gridWidth).fill(0),
  );
  console.log(newGridBoard);
};

const lockPiece = (currentShape, currentPositionX, currentPositionY) => {
  currentShape.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        const boardX = currentPositionX + x;
        const boardY = currentPositionY + y;
        newGridBoard[boardY][boardX] = currentShape.color;

        // full lines to be implemented
      }
    });
  });
  currentPositionX = 3;
  currentPositionY = 0;
  spawnShape();
};
// FOR TOMORROW
// COLLISION DETECTION
// STACK PIECE
// ADD MOBILE TOUCH EVENTS
