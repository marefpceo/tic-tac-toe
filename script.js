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
  };
})();


const Player = () => {

}

const GamePlay = (() => {
  
})();

Gameboard.render();