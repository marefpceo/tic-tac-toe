const Gameboard = (() => {
  const gameboard = ['','','','','','','','',''];
  const board = document.getElementById('board');

  const drawGrid = () => {
    for(let i = 0; i < 9; i += 1){
      const div = document.createElement('div');
      const value = document.createTextNode(gameboard[i]);
      div.appendChild(value);
      board.appendChild(div); 
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
  // const {board} = Gameboard;

  const getName = () => name;

  const {addGamePiece} = Gameboard;

  return {getName, addGamePiece};
}


const GamePlay = (() => {
  const {board} = Gameboard;

  const selectPosition = () => {
    board.addEventListener('click', (e) => {
      if (e.target.innerHTML !== '') {
        return;
      } 
      e.target.innerHTML = 'X';
    });
  }

  return {
    selectPosition,
  };
})();



const player1 = Player('Player1');
const player2 = Player('Player2');

GamePlay.selectPosition();
Gameboard.render();