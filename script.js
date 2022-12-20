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

  return {getName, gamesWon};
}


const GamePlay = (() => {
  const {board} = Gameboard;
  const {addGamePiece} = Gameboard;
  const {render} = Gameboard;
  const oIndex = [];
  const xIndex = [];
  
  let count = 1;
  let playerCount = 0;

  const playerName = (name) => {
    if (name === '' || name === undefined) {
      playerCount += 1;
      this.name = `Player ${playerCount}`;
    } else {
      this.name = name;
    }    
    return this.name;
  }

  const player1 = Player(playerName());
  const player2 = Player(playerName());


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

  const displayPlayerInfo = () => {
    const gameArea = document.getElementById('game-area');
    const player1Info = gameArea.querySelector('div > h3');
    const player2Info = gameArea.querySelector('div:nth-child(3) > h3');

    player1Info.innerHTML = player1.getName();
    player1Info.nextElementSibling.innerHTML = `Wins: ${player1.gamesWon}`;

    player2Info.innerHTML = player2.getName();
    player2Info.nextElementSibling.innerHTML = `Wins: ${player2.gamesWon}`;
  }

  const checkWinner = () => {
    const oWin = checkWinPattern(oIndex);
    const xWin = checkWinPattern(xIndex);

    if (oWin === true) {
      setTimeout(() => {
        alert(`${player2.getName()} wins`);
        player2.gamesWon += 1;
        console.log(player2.gamesWon);
        render();
        displayPlayerInfo();
      });
    } else if(xWin === true) {
      console.log('X wins');
    }
    console.log(oWin);
    console.log(xWin);
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
    displayPlayerInfo();
    selectPosition();
    render();
  }  

  return {
    startGame,
    displayPlayerInfo,
  };
})();

GamePlay.startGame();