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

  const resetGame = () => {
    gameboard.length = 0;
  }

  const render = () => {
    clearGrid();
    drawGrid();
  }

  return {
    render,
    addGamePiece,
    board,
    resetGame,
  };
})();



const Player = (name) => {
  let playerName = name;
  const getName = () => playerName;
  const changeName = (inputName) => {
    playerName = inputName;
    return this;
  };
  const gamesWon = 0; 
  return {getName, gamesWon, changeName};
}



const GamePlay = (() => {
  const {board} = Gameboard;
  const {addGamePiece} = Gameboard;
  const {render} = Gameboard;
  const {resetGame} = Gameboard;
  const oIndex = [];
  const xIndex = [];
  const winModal = document.getElementById('win-modal');
  const startModal = document.getElementById('start-modal');
  const btnGroup = document.querySelectorAll('button');
  
  let moveCount = 1;
  let playerCount = 0;

  const playerName = (name) => {
    if (name === '' || name === undefined) {
      playerCount += 1;
      this.name = `Player ${playerCount}`;
    } else {
      playerCount += 1;
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

  const playAgain = () => {
    moveCount = 1;
    oIndex.length = 0;
    xIndex.length = 0;
    resetGame();
    displayPlayerInfo();
    render();
  }

  const endGame = () => {
    player1.gamesWon = 0;
    player2.gamesWon = 0;
    playAgain();
  }
  
  const checkWinner = () => {
    const oWin = checkWinPattern(oIndex);
    const xWin = checkWinPattern(xIndex);
    const modalHeader = winModal.querySelector('h3');

    if (oWin === true) {
      setTimeout(() => {
        modalHeader.innerHTML = `Congratulations ${player2.getName()}!! You Win!!`;
        winModal.style.display = 'flex';
        player2.gamesWon += 1;
      });
    } else if(xWin === true) {
      setTimeout(() => {
        modalHeader.innerHTML = `Congratulations ${player1.getName()}!! You Win!!`;
        winModal.style.display = 'flex';
        player1.gamesWon += 1;
      });
    } else if ((moveCount === 9) && (xWin === false && oWin === false)){
      setTimeout(() => {
        modalHeader.innerHTML = `Tie Game`;
        winModal.style.display = 'flex';
      });
    }
  }

  // Selects the position chosen by the current player
  const selectPosition = () => {
    board.addEventListener('click', (e) => {  
      if (e.target.innerHTML !== '') {
        return;
      } 
      e.target.innerHTML = (moveCount % 2) === 0 ? 'O' : 'X';
      const selectedPiece = e.target.innerHTML;
      const position = e.target.id;

      if ((moveCount % 2) === 0) {
        e.target.innerHTML = 'O';
        oIndex.push(position.slice(-1));
      } else {
        e.target.innerHTML = 'X';
        xIndex.push(position.slice(-1));
      }
      addGamePiece(selectedPiece, position.slice(-1));    
      if (moveCount > 4) {
        checkWinner();
      }
      moveCount += 1;    
    });
  }
 
  const startGame = () => {
    displayPlayerInfo();
    selectPosition();
    render();
  }  

  btnGroup.forEach(button => {
    button.addEventListener('click', (e) => {
      if (e.target.id === 'yes' || e.target.id === 'reset') {
        winModal.style.display = 'none';
        playAgain();
      }
      if (e.target.id === 'no') {
        winModal.style.display = 'none';
        endGame();
        startModal.style.display = 'flex';
      }
      if (e.target.id === 'start-game') {
        player1.changeName(document.getElementById('player1').value);
        player2.changeName(document.getElementById('player2').value);
        startGame();
        startModal.style.display = 'none';
        console.log(player1.getName());
      }
    });
  });
})();