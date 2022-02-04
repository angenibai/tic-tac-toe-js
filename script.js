const cells = document.querySelectorAll(".cell");
const gameStatusText = document.querySelector("#game-status");
const restartBtn = document.querySelector("#restart");

const winSelections = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let isGameEnd = false;
let selectedByX = [];
let selectedByO = [];
let currentPlayer = "X";

// action when a cell is clicked
const handleClick = (e) => {
  const clickedCell = parseInt(e.target.id);
  // check that cell is empty
  if (
    !isGameEnd &&
    !selectedByX.includes(clickedCell) &&
    !selectedByO.includes(clickedCell)
  ) {
    // record the cell as marked by current player
    if (currentPlayer === "X") {
      selectedByX.push(clickedCell);
    } else {
      selectedByO.push(clickedCell);
    }
    e.target.textContent = currentPlayer;

    // check possible game states
    if (playerHasWon()) {
      isGameEnd = true;
      gameStatusText.textContent = `Player ${currentPlayer} wins!`;
      return;
    }
    if (gameHasDrawn()) {
      isGameEnd = true;
      gameStatusText.textContent = "Draw!";
      return;
    }

    // continue game
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatusText.textContent = `Player ${currentPlayer}'s turn`;
  }
};

// check whether a player has won
const playerHasWon = () => {
  let selectedToCheck = [];
  if (currentPlayer === "X") {
    selectedToCheck = selectedByX;
  } else {
    selectedToCheck = selectedByO;
  }

  let hasWon = false;
  winSelections.forEach((winCombo) => {
    // does this player's selected cells include all cells from this winning combination?
    if (winCombo.every((cell) => selectedToCheck.includes(cell))) {
      hasWon = true;
    }
  });
  return hasWon;
};

// check whether there is a draw
const gameHasDrawn = () => {
  return selectedByX.length + selectedByO.length === 9;
};

// resets the game to the starting state
const restartGame = () => {
  isGameEnd = false;
  selectedByX = [];
  selectedByO = [];
  currentPlayer = "X";
  gameStatusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
};

cells.forEach((cell) => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
