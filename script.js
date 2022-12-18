const Gameboard = (() => {
  const gameboard = [];
  const board = document.getElementById('board');
  const gameArea = document.getElementById('game-area');

  console.log(gameArea);
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

  const displayPlayerInfo = () => {
    const player1Info = gameArea.firstChild.nextSibling;
    const player2Info = gameArea.lastChild.previousSibling;
    player1Info.textContent = 'Test';
    player2Info.textContent = 'Test 2';
    console.log(player1Info);
    console.log(player2Info);
  }

  const render = () => {
    clearGrid();
    drawGrid();
    displayPlayerInfo();
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
  const oIndex = [];
  const xIndex = [];

  let count = 1;
  let playerCount = 0;

  const createPlayer = (name) => {
    if (name === '' || name === undefined) {
      playerCount += 1;
      this.name = `Player ${playerCount}`;
    }
    return this.name;
  }

  const checkWinPattern = (pattern) => {
    const validCombo = [['0','1','2'], ['3','4','5'], ['6','7','8'], ['0','3','6'],
                        ['1','4','7'], ['2','5','8'], ['0','4','8'], ['2','4','6']];

    let result;
    for (let i = 0; i < validCombo.length; i += 1){
     result = validCombo[i].every(v => pattern.includes(v));
     if (result === true){
      return result;
     }
    }
    return result;
  }

  const checkWinner = () => {
    checkWinPattern(oIndex);
    checkWinPattern(xIndex);

    console.log(`O-Index: ${oIndex}`);
    console.log(`X-Index: ${xIndex}`);
    console.log(checkWinPattern(oIndex));
    console.log(checkWinPattern(xIndex));
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
      if (count > 4) {
        checkWinner();
      }
      count += 1;    
    });
  }

  const startGame = () => {
    const player1 = Player(createPlayer());
    const player2 = Player(createPlayer());
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