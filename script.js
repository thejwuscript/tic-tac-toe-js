const gameBoard = (() => {
  const cells = ["O", "X", "O", "O", "X", "X", "X", "O", "O"]
  return { cells }
})();

const Player = (name, shape) => {
  const getName = () => name;
  const getShape = () => shape;
  return {getName, getShape};
}

const gameLogic = (() => {
  // some variables and functions
  // assess victory condition after player makes a move
  // return an object
})();

const displayController = (() => {
  // get a reference to each cell and store them in an array
  //const cell0 = document.getElementById('cell0')
  //const cell1 = document.getElementById('cell1')
  //const cell2 = document.getElementById('cell2')
  //const cell3 = document.getElementById('cell3')
  //const cell4 = document.getElementById('cell4')
  //const cell5 = document.getElementById('cell5')
  //const cell6 = document.getElementById('cell6')
  //const cell7 = document.getElementById('cell7')
  //const cell8 = document.getElementById('cell8')
  //const cell9 = document.getElementById('cell9')
  
  const showCells = () => {
    let cellsArray = gameBoard.cells
    for ( let i = 0; i < 9; i++) {
      document.getElementById(`cell${i}`).textContent = cellsArray[i]
      console.log(cellsArray[i]);
    };
  };
  // show board everytime player makes a move
  // show game result
  // show where player makes the move
  // return an object
  return {
    showCells
  }
})();


displayController.showCells();
