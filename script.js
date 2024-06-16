const DOMgrid = document.querySelectorAll('.cell')
const gameBoxDom = document.querySelector('.gameBox')
const statusMessage = document.getElementById('statusMessage')

//SCORES
const playerOneNameDom = document.querySelector('.name1')
const playerOneScoreDom = document.querySelector('.score1')

const playerTwoNameDom = document.querySelector('.name2')
const playerTwoScoreDom = document.querySelector('.score2')

//Reset Buttons
const resetScores = document.getElementById('resetScores')



function Player(name, marker,) {
  this.name = name;
  this.marker = marker;
  this.score = 1;
  this.winner = function() {
    console.log(`${this.name} is the winner`)
    let theScore = this.score++
    return theScore
  };
  this.resetScore = ()=>{
    console.log(this.winner())
     return this.score = 0;
  }
}

const player1 = new Player('Player One', 'X',);
const player2 = new Player('Player Two', 'O',);





let scoreX =0;
let scoreO =0;


function gameBoard(){
  let board = ['','','',  '','','', '','','']; 

function resetBoard(board){
  board = ['','','',  '','','', '','','']; 
  gameDisplay(board)
  return board
}
function resetScores(){

}

function gameDisplay(board){
  DOMgrid.forEach(cell => {
    const index = parseInt(cell.getAttribute('data-index'));
    cell.innerHTML = board[index]
  });
}

return {board, resetBoard, gameDisplay, resetScores}
}

const getBoard = gameBoard().board
const getReset = gameBoard().resetBoard(getBoard)



//GAME FUNCTION FUNCION
function gameFunctions(){

    let scoresArray = [player1.score, player2.score]

  function scoreCounter(gameOver){
    if(gameOver === 'X'){
      scoreDom('X', player1.score++, scoresArray[1])
    
    }else if(gameOver === 'O'){
      scoreDom('O', scoresArray[0], scoresArray[1]++) 

    }
  }

  function scoreDom(x, scoreX, scoreO){
    if(x === 'X'){
      playerOneNameDom.innerHTML = `${player1.name} (${player1.marker})`
      playerOneScoreDom.innerHTML = scoreX
    }else{
      playerTwoNameDom.innerHTML = `${player2.name} (${player2.marker})`
      playerTwoScoreDom.innerHTML =  scoreO
    }
  }

  function animateCells(indexes, color1, color2, duration,) {
    indexes.forEach(index => {
      const cell = document.querySelector(`.cell[data-index="${index}"]`);
      if (cell) {
        let isColor1 = true;
        let font = true
        const intervalId = setInterval(() => {
          cell.style.backgroundColor = isColor1 ? color1 : color2;
          cell.style.fontSize = font ? '5rem' : '3rem';
        
          statusMessage.innerHTML =` ${cell.textContent } is the winner`;

          isColor1 = !isColor1;
          font = !font

        }, 500);

        setTimeout(() => {
          clearInterval(intervalId);

          cell.style.backgroundColor = ''; 
        }, duration);
      }
    });
  }

  const checkForWins = (board) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const positions of winningCombos) {
      const [a, b, c] = positions;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const theWinIndex = [a, b, c]; 
        animateCells(theWinIndex, 'rgb(39, 76, 74)', 'lightseagreen', 2000);
        return board[a]
      }
    }
      if (board.every(cell => cell !== "")) {
      console.log('tIe') 
      statusMessage.innerText = 'A TIE';
      return true
    }
      return false
  };



return {checkForWins, scoreCounter}
}

 statusMessage.innerText = 'Play'
//GAME PLAY FUNCTION
function gamePlay(){

  let activePlayer = player1;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
    statusMessage.innerText = 'Start'
    statusMessage.innerText = `${activePlayer.marker} is your Turn`
    
  }

  const getActivePlayer = () => activePlayer

  function gameOverFunc(gameOver, board) {
    if (gameOver) {
  
      // Reset board after 2 seconds
      setTimeout(() => {
        resetBoard(board);
      }, 2000);
  
      // Reset scores immediately
      resetScore();
    }
  }
  
  function resetBoard(board) {
    // Clear the board array
    board.forEach((_, index) => {
      board[index] = '';
    });
  
    // Update the UI to reflect the cleared board
    gameBoard().resetBoard(board)
  }



  function playerInsertMarker(board){
    gameBoxDom.addEventListener('click', (e)=>{
      const clickedGrid = e.target
      const index = parseInt(clickedGrid.getAttribute('data-index'));

      if(board[index] !== ""){
        board[index]= board[index]
      }else{
        board[index] = getActivePlayer().marker
        switchPlayerTurn()
      }     

   

      const gameDisplay = () => gameBoard().gameDisplay(board)
      gameDisplay(board)

      
      let gameOver = gameFunctions().checkForWins(board)
      gameFunctions().scoreCounter(gameOver);

      
        
      gameOverFunc(gameOver, board)

      
      
    }) 

  }

  

  function playRound(board){
  playerInsertMarker(board)


  }


  function resetScore(){
    scoreX =0;
    scoreO =0;

  }
  resetScores.addEventListener('click', ()=>{
  
    let scoresArray = [0, 0]

   
   })


  return{playRound,playerInsertMarker, getActivePlayer, switchPlayerTurn, resetScore}
}



const game = gamePlay()


game.playRound(getBoard)





