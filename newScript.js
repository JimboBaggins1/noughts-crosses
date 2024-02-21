//newScript.js

const Gameboard = function () {
  //store the game board as an array
  const rows = 3;
  const cols = 3;
  const board = [];
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(" ");
    }
  }

  const UpdateBoard = function (activePlayer, move, token) {
    // move will be read in as 2 digit string, i.e. '12'
    // need to separate into two 1 digit strings i.e. '1' and '2'
    // these will be used as coords for the move
    const coord1 = move.substr(0, 1);
    const coord2 = move.substr(1, 1);

    board[coord1][coord2] = token;
    return board;
  };
  return { UpdateBoard };
};

const GameController = function () {
  // define play board
  const board = Gameboard();

  // define players
  // TODO: clean this up.
  const playerOneName = "Player One";
  const playerTwoName = "Player Two";

  const players = [
    {
      name: playerOneName,
      token: "o",
    },
    {
      name: playerTwoName,
      token: "x",
    },
  ];

  // set first player in game
  let currentPlayer = players[0];
}
