import { Game } from "./GameController.js";

const game = new Game();
//addding predetermined ships
game.player1.gameboard.placeShip(2,[[0,0],[0,1]]);
game.player2.gameboard.placeShip(2, [[5,5],[5,6]])

const playerBoard = document.querySelector('#player-board');
const computerBoard = document.querySelector('#computer-board');
const gameStatus = document.querySelector('#game_status');

//Render board function
function renderBoard(gameBoard,container,player_type) {
    for (let i = 0; i < 100; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        // cell.textContent = `hello`
        container.appendChild(cell);

        const row = Math.floor(i / 10);
        const column = i % 10;
        cell.dataset.row = row;
        cell.dataset.column = column;

        const hasShip = gameBoard.coordinates.some((shipCoordinates)=> {
            return shipCoordinates.some((shipCoordinate) => {
                return shipCoordinate[0] === row && shipCoordinate[1] === column;
            });
        });

        if (hasShip) {
            cell.classList.add('ship');
        }

        if (player_type === "Computer") {
            cell.addEventListener('click', () => {
                if (game.winner || game.isComputerThinking) {
                    return
                }
                const coordinate = [row, column];

                gameStatus.textContent = "Computer is thinking..."
                const result = game.attack(coordinate, (computerCoordinate, computerHit) => {
                    const [row, column] = computerCoordinate;

                    const computerCell = playerBoard.querySelector(
                        `[data-row="${row}"][data-column="${column}"]`
                    );

                    if (computerHit) {
                        computerCell.classList.add('hit');
                    } else {
                        computerCell.classList.add('miss');
                    }
                    gameStatus.textContent = "Fire Rocket"
                });

                if (!result) {
                    return;
                }

                if (result.hit) {
                    cell.classList.add('hit');
                } else {
                    cell.classList.add('miss');
                }

                if (game.winner) {
                    gameStatus.textContent = game.winner === game.player1 ? "You win!" : "Computer wins"
                }

                // if (result.computerCoordinate) {
                //     const [row,column] = result.computerCoordinate;
                //     const computerCell =  playerBoard.querySelector(`[data-row="${row}"][data-column="${column}"]`)
                //     if (result.computerHit) {
                //         computerCell.classList.add('hit');
                //     } else {
                //         computerCell.classList.add('miss');
                //     }
                // }
            });
        }

        
    }


}
renderBoard(game.player1.gameboard, playerBoard, "Human");
renderBoard(game.player2.gameboard, computerBoard, "Computer");
