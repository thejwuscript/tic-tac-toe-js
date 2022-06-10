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
  
  const setup = () => {}
  
  const round = () => {
    // loop
    // rotate event listeners for spots that are empty
    changeEventListeners(currentPlayer)
    // get rid of listeners after player plays a move

  }

  const changeEventListeners = (player) => {
    // get all nine DOM elements in an array.
    let nodes = document.querySelectorAll("[id^='cell']")
    // Filter out the ones that have a mark already.
    let emptyNodes = [...nodes].filter(node => node.textContent === "")
    // for each DOM element in the above array, add new listener with the once option.
    emptyNodes.forEach(node => node.addEventListener('click', (e) => {
      player.addMark(e.target);
      displayController.showCells();
    }, { once: true }))
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

displayController.showCells()
game.play()