// gameBoard module
const gameBoard = (() => {
  const cells = ["", "", "", "", "", "", "", "", ""]

  const cellNodes = document.querySelectorAll("[id^='cell']")

  const changeCell = (index, shape) => {
    cells[index] = shape
  }

  const getIndexes = (player) => {
    return cells.reduce((acc, curr, index) => {
      if (curr === player.shape) {
        acc.push(index)
      }
      return acc
    }, [])
  }

  const reset = () => {
    cells.length = 0
    cells.length = 9
    cells.fill('')

  }

  return { cells, cellNodes, changeCell, getIndexes, reset }
})();


// Player factory function
const Player = (name, shape) => {

  const addMark = (element) => {
    if (element.textContent === "") {
      let index = element.id.slice(-1)
      gameBoard.changeCell(index, shape)
    } else {
      console.log("not changed!")
    }
  };

  return { name, shape, addMark };
}

// displayController module
const displayController = (() => {
  const message = document.querySelector('.message')
  const cellNodes = document.querySelectorAll("[id^='cell']")
  const button = document.querySelector('.restart')

  function showCells() {
    let cellsArray = gameBoard.cells;
    for (let i = 0; i < 9; i++) {
      document.getElementById(`cell${i}`).textContent = cellsArray[i];
    };
  }

  function showWinner(player) {
    message.innerHTML = `${player.name} wins the game!`
  }

  function showAlert() {
    message.textContent = "That's an invalid move, please try again."
  }

  function removeAlert() {
    message.textContent = ''
  }

  function clearDisplay() {
    [...cellNodes].forEach(node => { node.textContent = '' })
    removeAlert()
    button.style.visibility = "hidden"
  }

  function showButton() {
    button.style.visibility = "visible"
  }

  function showTieMessage() {
    message.textContent = "It's a tie game!"
  }

  return { showCells, showWinner, showAlert, removeAlert, cellNodes, button, clearDisplay, showButton, showTieMessage }
})();

// gameLogic module
const game = (() => {
  let circlePlayer = Player('Circle', 'O')
  let crossPlayer = Player('Cross', 'X')
  let currentPlayer = crossPlayer

  const VICTORY_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  function play() {
    round()
  }

  function restart() {
    gameBoard.reset()
    displayController.clearDisplay()
    play()
  }

  function round() {
    let nodes = document.querySelectorAll("[id^='cell']")
    let emptyNodes = [...nodes].filter(node => node.textContent === "")
    emptyNodes.forEach(node => node.addEventListener('click', processClick))
  }

  function processClick(e) {
    if (e.target.textContent !== '') {
      displayController.showAlert()
    } else {
      displayController.removeAlert()
      currentPlayer.addMark(e.target)
      displayController.showCells()
      if (checkVictory() === true) {
        gameOver(currentPlayer)
      } else if (checkDraw() === true) {
        gameOver()
      } else {
        switchPlayer()
      }
    }
  }

  function checkDraw() {
    return !gameBoard.cells.some(cell => cell === '')
  }

  function checkVictory() {
    let markedIndexes = gameBoard.getIndexes(currentPlayer)
    return VICTORY_COMBOS.some(array => {
      return array.every(num => {
        return markedIndexes.includes(num)
      })
    })
  }

  function switchPlayer() {
    currentPlayer = (currentPlayer === crossPlayer) ? circlePlayer : crossPlayer
  }

  function gameOver(winner) {
    [...gameBoard.cellNodes].forEach(node => { node.removeEventListener('click', processClick) })
    if (winner === undefined) {
      displayController.showTieMessage()
    } else {
      displayController.showWinner(winner)
    }
    displayController.showButton()
    displayController.button.addEventListener('click', restart)
  }

  return { play }
})();


game.play()