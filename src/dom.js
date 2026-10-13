import { Game } from "./GameController.js";

const game = new Game();
//addding predetermined ships
// game.player1.gameboard.placeShip(2,[[0,0],[0,1]]);
const computerShips = [
    {length: 5, axis: 'horizontal'},
    { length: 4, axis: 'vertical' },
    { length: 3, axis: 'horizontal' },
    { length: 3, axis: 'vertical'},
    { length: 2, axis: 'horizontal' },
];

computerShips.forEach((ship) => {
    const coordinates = getRandomShipCoordinates(ship.length,ship.axis);

    game.player2.gameboard.placeShip(ship.length,coordinates);
});

// Random Ship placement for computer
function getRandomCoordinate() {
    const row = Math.floor(Math.random()* 10);
    const column = Math.floor(Math.random() * 10);
    return [row, column];
}

function getRandomShipCoordinates(length,axis) {
    let [row,column] = getRandomCoordinate();
    let coordinates = [];

    while ((axis === 'vertical' && row + length > 10) || (axis === 'horizontal' && column + length > 10)) {
        [row,column] = getRandomCoordinate();
    }

    for (let i = 0; i < length; i++) {
        if (axis === 'vertical') {
            coordinates.push([row + i, column])
        } else {
            coordinates.push([row, column + i])
        }
    }
    while (doesOverlap(coordinates,game.player2.gameboard.coordinates)) {
        [row,column] = getRandomCoordinate();

        while ((axis === 'vertical' && row + length > 10) || (axis === 'horizontal' && column + length > 10)) {
        [row,column] = getRandomCoordinate();
        }

        coordinates = [];

        for (let i = 0; i < length; i++) {
            if (axis === 'vertical') {
                coordinates.push([row + i, column])
            } else {
                coordinates.push([row,column + i])
            }
        }
    }
    return coordinates
}


const playerBoard = document.querySelector('#player-board');
const computerBoard = document.querySelector('#computer-board');
const gameStatus = document.querySelector('#game_status');

const axisToggle = document.querySelector('.axis');
const startGameButton = document.querySelector('.startGame');
const shipOptions = document.querySelectorAll('.ship-option');

let shipAxis = 'vertical';
let placedShips = [];
let draggedShip = null;
let gameStarted = false;

axisToggle.addEventListener('click', () => {
    if (shipAxis === 'vertical') {
        shipAxis = 'horizontal';
    } else {
        shipAxis = 'vertical'
    }

    axisToggle.textContent = `Axis: ${shipAxis}`;
})

//draggability
shipOptions.forEach((ship) =>  {
    ship.addEventListener('dragstart',(event) => {
        draggedShip = ship;
        event.dataTransfer.setData('text/plain',
            ship.dataset.ship
        );
    });
    ship.addEventListener('dragend',()=> {
        draggedShip = null;
    });
})

//helper function 
function getShipCoordinates(row,column,length,axis) {
    const coordinates =  [];
    for(let i=0; i<length; i++) {
        if (axis === 'vertical') {
            coordinates.push([row + i, column]);
        } else {
            coordinates.push([row, column + i]);
        }
    }
    return coordinates
}

//check if the ship fit in the cell
function isWithinBoard(coordinates) {
    return coordinates.every(([row,column]) => {
        return row >= 0 && row < 10 && column >= 0 && column < 10;
    });
}

//handle overlapp
function doesOverlap(newCoordinates,existingCoordinates) {
    return newCoordinates.some(([newRow,newColumn]) => {
        return existingCoordinates.some((shipCoordinates) => {
            return shipCoordinates.some(([row,column]) => {
                return row === newRow && column === newColumn;
            });
        });
    });
}
//Render board function
function renderBoard(gameBoard,container,player_type) {
    for (let i = 0; i < 100; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        // cell.textContent = `hello`
        container.appendChild(cell);

        //programming the board to accept incoming ships
        if (player_type === 'Human') {
            cell.addEventListener('dragover',(event) => {
                event.preventDefault();
            })
        }

        cell.addEventListener('drop', (event) => {
            event.preventDefault();
            if (player_type !== 'Human' || !draggedShip) {
                return;
            }
            const row = Number(cell.dataset.row);
            const column = Number(cell.dataset.column);

            const shipLength = Number(draggedShip.dataset.length);
            const shipName = draggedShip.dataset.ship;

            if (placedShips.includes(shipName)) {
                gameStatus.textContent = "This.ship has already been Deployed!";
                return;
            }

            const coordinates = getShipCoordinates(
                row,
                column,
                shipLength,
                shipAxis
            );
            
            if(!isWithinBoard(coordinates)) {
                gameStatus.textContent = "Ships doesn't fit in opponent's territory.";
                return;
            }
            if (doesOverlap(coordinates,game.player1.gameboard.coordinates)) {
                gameStatus.textContent ="Ships cannot overlap!";
                return;
            }

            game.player1.gameboard.placeShip(shipLength,coordinates)
            coordinates.forEach(([row,column]) =>{
                const shipCell =  playerBoard.querySelector(`[data-row="${row}"][data-column="${column}"]`)
                console.log("Coordinates: ", row,column);
                console.log("Player board;", playerBoard);
                console.log("found cell;", playerBoard.querySelector(`[data-row="${row}"][data-column="${column}"]`))
                shipCell.classList.add('ship');
            });
            draggedShip.draggable = false;
            draggedShip.classList.add('placed');

            placedShips.push(shipName);
            document.querySelector('#ships-remaining').textContent = 5 - placedShips.length;
            if (placedShips.length === 5) {
                startGameButton.disabled = false;
            }

            gameStatus.textContent = `${shipName} deployed successfully!`;
        });

        const row = Math.floor(i / 10);
        const column = i % 10;
        cell.dataset.row = row;
        cell.dataset.column = column;

        const hasShip = gameBoard.coordinates.some((shipCoordinates)=> {
            return shipCoordinates.some((shipCoordinate) => {
                return shipCoordinate[0] === row && shipCoordinate[1] === column;
            });
        });

        if (hasShip && player_type === "Human") {
            cell.classList.add('ship');
        }

        if (player_type === "Computer") {
            cell.addEventListener('click', () => {
                if (!gameStarted || game.winner || game.isComputerThinking) {
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
                    if (game.winner) {
                        gameStatus.textContent = game.winner === game.player1 ? "You win!" : "Computer wins!"
                    } else {
                        gameStatus.textContent = "Your turn! Fire at the enemies's crew!"
                    }
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

startGameButton.addEventListener('click',()=> {
    if (placedShips.length !== 5) {
        return;
    }
    gameStarted = true;
    gameStatus.textContent = "Battle started Fire at the computer's board"
});
