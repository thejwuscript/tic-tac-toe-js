// gameBoard module
const gameBoard = (() => {
  const cells = ["", "", "", "", "", "", "", "", ""]

  const changeCell = (index, shape) => {
    cells[index] = shape
  }

  const getIndexes = (player) => {
    return cells.reduce((acc, curr, index) => {
      if (curr === player.getShape()) {
        acc.push(index)
      }
      return acc
    }, [])
  }

  return { cells, changeCell, getIndexes }
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

  const VICTORY_COMBOS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

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
      // assess victory condition
      console.log(assessVictory())
      currentPlayer = (currentPlayer === crossPlayer) ? circlePlayer : crossPlayer
    }))
  }

  const assessVictory = () => {
    let markedIndexes = gameBoard.getIndexes(currentPlayer)
    return VICTORY_COMBOS.some(array => {
      return array.every(num => {
        return markedIndexes.includes(num)
      })
    })
  }

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