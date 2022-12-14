const Gameboard = (() => {
  const gameboard = ['X','O',' ','O',' ','X','O','X','X'];
  const board = document.getElementById('board');

  const drawGrid = () => {
    for(let i = 0; i < 9; i += 1){
      const div = document.createElement('div');
      const value = document.createTextNode(gameboard[i]);
      div.appendChild(value);
      board.appendChild(div);
    }
  }

  return {
    drawGrid,
  };
})();

Gameboard.drawGrid();

const Player = () => {

}

const GamePlay = () => {
  
}