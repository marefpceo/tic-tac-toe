const Gameboard = (() => {
  const gameboard = [];
  const board = document.getElementById('board');

  const drawGrid = () => {
    for(let i = 0; i < 9; i += 1){
      const div = document.createElement('div');
      div.setAttribute('id',`div-${i}`);
      gameboard.push(board.appendChild(div)); 
    }
  }

  const addGamePiece = (gamePiece, position) => {
    gameboard[position] = gamePiece;
  }

  const clearGrid = () => {
   let div = board.lastElementChild; 
    while (div) {
      board.removeChild(div);
      div = board.lastElementChild;
    }
  }

  const render = () => {
    clearGrid();
    drawGrid();
  }

  return {
    render,
    addGamePiece,
    board,
  };
})();


const Player = (name) => {
  const getName = () => name;

  const gamesWon = 0; 

  const {addGamePiece} = Gameboard;

  return {getName, addGamePiece, gamesWon};
}


const GamePlay = (() => {
  const {board} = Gameboard;
  const {addGamePiece} = Gameboard;
  const {render} = Gameboard;

  let count = 1;
  const oIndex = [];
  const xIndex = [];

  const checkWinPattern = (pattern) => {
    // const validCombo = [['0','1','2'], ['3','4','5']];
    const result = ['0','1','2'].every(i => pattern.includes(i));
    console.log(result);
  }

  const checkWinner = () => {
    // const result = winCombo.every(i => oIndex.includes(i));
    checkWinPattern(oIndex);
    // console.log(oIndex.toString());
    // console.log(oIndex.includes());
  }

  // Selects the position chosen by the current player
  const selectPosition = () => {
    board.addEventListener('click', (e) => {  
      if (e.target.innerHTML !== '') {
        return;
      } 
      e.target.innerHTML = (count % 2) === 0 ? 'O' : 'X';
      const selectedPiece = e.target.innerHTML;
      const position = e.target.id;

      if ((count % 2) === 0) {
        e.target.innerHTML = 'O';
        oIndex.push(position.slice(-1));
      } else {
        e.target.innerHTML = 'X';
        xIndex.push(position.slice(-1));
      }
      addGamePiece(selectedPiece, position.slice(-1));      
      checkWinner();
      count += 1;    
    });
  }

  const startGame = () => {
    selectPosition();
    render();
  }  

  return {
    startGame,
  };
})();



// const player1 = Player('Player1');
// const player2 = Player('Player2');

GamePlay.startGame();