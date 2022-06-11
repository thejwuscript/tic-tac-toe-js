// gameBoard module
const gameBoard = (() => {
  const cells = ["", "X", "", "", "O", "", "", "", ""]

  const changeCell = (index, shape) => {
    cells[index] = shape
  }

  return { cells, changeCell }
})();


// Player factory function
const Player = (name, shape) => {
  const getName = () => name;
  const getShape = () => shape;

  const addMark = (element) => {
    if (element.textContent === "") {
      let index = element.id.slice(-1)
      gameBoard.changeCell(index, shape)
    } else {
      console.log("not changed!")
    }
  };

  return { getName, getShape, addMark };
}

// gameLogic module
const game = (() => {
  let circlePlayer = Player('Circle', 'O')
  let crossPlayer = Player('Cross', 'X')
  let currentPlayer = crossPlayer

  const play = () => {
    setup()
    round()
  }
  
  const setup = () => {
    displayController.showCells()
  }
  
  const round = () => {
    let nodes = document.querySelectorAll("[id^='cell']")
    let emptyNodes = [...nodes].filter(node => node.textContent === "")
    emptyNodes.forEach(node => node.addEventListener('click', (e) => {
      currentPlayer.addMark(e.target)
      displayController.showCells()
      currentPlayer = (currentPlayer === crossPlayer) ? circlePlayer : crossPlayer
    }))
  }

  // assess victory condition after player makes a move
  return { play }
})();

// displayController module
const displayController = (() => {

  function showCells() {
    let cellsArray = gameBoard.cells;
    for (let i = 0; i < 9; i++) {
      document.getElementById(`cell${i}`).textContent = cellsArray[i];
    };
  }
  // show board everytime player makes a move
  // show game result
  // show where player makes the move
  return {
    showCells
  }
})();


game.play()