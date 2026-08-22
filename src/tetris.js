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
  currentShape = getRandomShape();
  nextShape = getRandomShape();
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

  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "color-S",
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
    color: "color-O",
  },
  ASWD: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "color-T",
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
let nextShape;
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

const canMovePiece = (currentShape, proposedX, proposedY) => {
  const shape = currentShape.shape;
  console.log(shape);

  for (let y = 0; y < shape.length; y++) {
    console.log("Outer Loop Row: ", y);
    for (let x = 0; x < shape[y].length; x++) {
      console.log("Inner Loop Column: ", x);
      if (shape[y][x] === 1) {
        const nextX = proposedX + x;
        const nextY = proposedY + y;

        // left / right wall collision
        // < 0 = far left
        if (nextX < 0 || nextX >= gridWidth) {
          console.log("Hit wall!");
          return false;
        }

        // floor collision
        if (nextY >= gridHeight) {
          console.log("Hit floor!");
          return false;
        }

        // block stacking
        // nextY >= 0 = first Y Row, newGridBoard[nextY][nextX] = a piece was already at the bottom, stacked it up!
        if (nextY >= 0) {
          const targetCell = newGridBoard[nextY][nextX];
          if (targetCell !== 0) {
            return false;
          }
        }
      }
    }
  }
  return true;
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

// MOVEMENT
const moveDown = () => {
  if (canMovePiece(currentShape, currentPositionX, currentPositionY + 1)) {
    clearPiece(currentShape, currentPositionX, currentPositionY);
    currentPositionY += 1;
    drawPiece(currentShape, currentPositionX, currentPositionY);
  } else {
    lockPiece(currentShape, currentPositionX, currentPositionY);
  }
};

const movePieceLeft = () => {
  const proposedX = currentPositionX - 1;
  if (canMovePiece(currentShape, proposedX, currentPositionY)) {
    clearPiece(currentShape, currentPositionX, currentPositionY);
    currentPositionX = proposedX;
    drawPiece(currentShape, currentPositionX, currentPositionY);
  }
};

const movePieceRight = () => {
  const proposedX = currentPositionX + 1;
  if (canMovePiece(currentShape, proposedX, currentPositionY)) {
    clearPiece(currentShape, currentPositionX, currentPositionY);
    currentPositionX = proposedX;
    drawPiece(currentShape, currentPositionX, currentPositionY);
  }
};

// rotate piece clockwise
const rotatePieceClockWise = () => {
  const originalPiece = currentShape.shape;
  const oldRow = originalPiece.length;
  const oldCol = originalPiece[0].length;
  const rotatedPiece = Array.from({ length: oldCol }, () =>
    Array(oldRow).fill(0),
  );

  for (let y = 0; y < oldRow; y++) {
    for (let x = 0; x < oldCol; x++) {
      rotatedPiece[x][oldRow - 1 - y] = originalPiece[y][x];
    }
  }

  const newRotatedPiece = { shape: rotatedPiece, color: currentShape.color };

  if (canMovePiece(newRotatedPiece, currentPositionX, currentPositionY)) {
    clearPiece(currentShape, currentPositionX, currentPositionY);
    currentShape.shape = rotatedPiece;
    drawPiece(currentShape, currentPositionX, currentPositionY);
  } else {
    return false;
  }
};

// rotate piece counterclockwise
const rotatePieceCounterClockWise = () => {
  const originalPiece = currentShape.shape;
  const oldRow = originalPiece.length;
  const oldCol = originalPiece[0].length;
  const rotatedPiece = Array.from({ length: oldCol }, () =>
    Array(oldRow).fill(0),
  );

  for (let y = 0; y < oldRow; y++) {
    for (let x = 0; x < oldCol; x++) {
      rotatedPiece[oldCol - 1 - x][y] = originalPiece[y][x];
    }
  }

  const newRotatedPiece = { shape: rotatedPiece, color: currentShape.color };

  if (canMovePiece(newRotatedPiece, currentPositionX, currentPositionY)) {
    clearPiece(currentShape, currentPositionX, currentPositionY);
    currentShape.shape = rotatedPiece;
    drawPiece(currentShape, currentPositionX, currentPositionY);
  }
};

// hard drop (Skip all rows)
const hardDrop = () => {
  clearPiece(currentShape, currentPositionX, currentPositionY);
  while (canMovePiece(currentShape, currentPositionX, currentPositionY + 1)) {
    currentPositionY++;
  }
  drawPiece(currentShape, currentPositionX, currentPositionY);
  lockPiece(currentShape, currentPositionX, currentPositionY);
};

const createGridBoard = () => {
  newGridBoard = Array.from({ length: gridHeight }, () =>
    Array(gridWidth).fill(0),
  );
};

const lockPiece = (currentShape, currentPositionX, currentPositionY) => {
  currentShape.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        const boardX = currentPositionX + x;
        const boardY = currentPositionY + y;
        newGridBoard[boardY][boardX] = currentShape.color;
      }
    });
  });

  clearFullLines();
  drawBoard();
  currentPositionX = 3;
  currentPositionY = 0;
  spawnShape();
};

// lock piece permanent
const drawBoard = () => {
  const tetrisCell = document.querySelectorAll("#tetrisBoard .tetris-cell");

  newGridBoard.forEach((row, y) => {
    row.forEach((value, x) => {
      const cellIndex = y * gridWidth + x;
      const cell = tetrisCell[cellIndex];

      if (cell) {
        cell.className = "tetris-cell";
        if (value !== 0) {
          cell.classList.add("filled", value);
        }
      }
    });
  });
};

let score = 0;
// clear full line and update score
const clearFullLines = () => {
  let linesCleared = 0;
  for (let y = 0; y < gridHeight; y++) {
    const isRowFull = newGridBoard[y].every((cell) => cell !== 0);
    if (isRowFull) {
      newGridBoard.splice(y, 1); // removes the fulled row
      newGridBoard.unshift(Array(gridWidth).fill(0)); // added new row with 0 values (empty spaces)
      linesCleared++;
      y--; // goes back to first index row y
    }
  }

  if (linesCleared > 0) {
    score += linesCleared + 4;

    const scoreBoard = document.querySelector("#tetrisScore");
    scoreBoard.textContent = score;
  }
};

// ADD MOBILE TOUCH EVENTS
// ARROW KEYS = left, right, down movement
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowDown":
    case "s":
      moveDown();
      break;
    case "ArrowLeft":
    case "a":
      movePieceLeft();
      break;
    case "ArrowRight":
    case "d":
      movePieceRight();
      break;
    case "x":
      rotatePieceClockWise();
      break;
    case "z":
      rotatePieceCounterClockWise();
      break;
    case "":
    case "Spacebar":
      event.preventDefault();
      hardDrop();
      break;
  }
});

// DPAD CONTROLS
const dpadRightBtn = document.querySelector("#btn-right");
const dpadLeftBtn = document.querySelector("#btn-left");
const dpadDownBtn = document.querySelector("#btn-down");

dpadDownBtn.addEventListener("click", () => {
  moveDown();
});
dpadLeftBtn.addEventListener("click", () => {
  movePieceLeft();
});
dpadRightBtn.addEventListener("click", () => {
  movePieceRight();
});

// A B X Y CONTROLS
const YButton = document.querySelector("#btn-y");
YButton.addEventListener("click", () => {
  rotatePieceClockWise();
});

const AButton = document.querySelector("#btn-a");
AButton.addEventListener("click", () => {
  rotatePieceCounterClockWise();
});
const BButton = document.querySelector("#btn-b");
BButton.addEventListener("click", () => {
  hardDrop();
});

// TO DO:
// SKIP PIECE
// RENDER NEXT PIECE
// GAME OVER
