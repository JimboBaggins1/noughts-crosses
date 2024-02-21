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

  // switches players
  const SwitchPlayerTurn = function (activePlayer) {
    return activePlayer === players[0] ? players[1] : players[0];
  };

  const ReadMove = function () {
    let playerMove = prompt("Enter your move:");
    // TODO: This will be unnecessary when implementing UI. Remove all whitespace and only take the first two characters
    let playerMoveTrimmed = playerMove.replace(/\s/g, "").slice(0, 2);
    return playerMoveTrimmed;
  };

  const PlayRound = function () {
    console.log(`${currentPlayer.name}'s turn...`);
    let move = ReadMove();
    let newBoard = board.UpdateBoard(currentPlayer, move, currentPlayer.token);
    console.log(newBoard);

    // if (CheckWin(newBoard, currentPlayer.token)) {
    //   console.log(`${currentPlayer.name} wins!`);
    //   return 0;
    // };

    switch (CheckWin(newBoard, currentPlayer.token)) {
      case true:
        console.log(`${currentPlayer.name} wins!`);
        return 0;
      case -1:
        console.log('It\'s a draw!');
        return 0;
      default:
        break;
    }

    currentPlayer = SwitchPlayerTurn(currentPlayer);
  };

  // Check win conditions. Accepts the most recent move, the token ('x' or 'o'), and the current board
  const CheckWin = function (currentBoard, currentToken) {
    // All possible win conditions
    // TODO: Make this smarter
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    numCols = 3;

    // Flatten 2D array to 1D
    const flatBoard = currentBoard.flat();
    // Returns a new array of all the squares currently occupied by the token
    const currentPositions = flatBoard
      .map(function (elem, index) {
        return elem === currentToken ? index : "";
      })
      .filter(String);
    console.log(currentPositions);

    // Check if current board matches any of the possible win conditions
    // Increase count by one each time a number matches
    // A win condition is found if count == 3
    const checkArr = winConditions.map((innerArray) => {
      let count = 0;
      currentPositions.forEach((elem) => {
        if (innerArray.includes(elem)) count++;
      });
      return count;
    });

    if (checkArr.includes(numCols)) {
      return checkArr.includes(numCols);
    } else if (!flatBoard.includes(' ')) {
      return -1;
    } else {
      return false;
    };
  };

  return { PlayRound };
};


const game = GameController();
while (game.PlayRound() !== 0) {
  game.PlayRound();
  //console.log(game.PlayRound);
}
