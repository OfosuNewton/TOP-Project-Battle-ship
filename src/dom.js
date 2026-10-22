import { Game } from "./GameController.js";
import  explosionSrc  from "../src/sounds/explosion1.wav";
import missSrc from "./sounds/miss.wav";
import sunkSrc from "./sounds/sunk.wav";
import winSrc from "./sounds/win.wav";
import mainSrc from "./sounds/main.mp3";
import explosion2Src from "./sounds/explosion2.wav";
import gameStartSrc from "./sounds/game_start.mp3";
import gameOverSrc from "./sounds/game_over.mp3";



let game = new Game();
const gameOverOverlay = document.querySelector('#game-over')
const gameOverTitle = document.querySelector('#game-over-title');
const gameOverMessage = document.querySelector('#game-over-message');
const retry_again = document.querySelector('#play-again')

function showGameOver() {
    if (!game.winner) {
        return;
    }
    gameOverOverlay.classList.remove('hidden');
    if (game.winner === game.player1) {
        gameOverTitle.textContent = "VICTORY! 🏆";
        gameOverMessage.textContent = 'Congratulations! You sank the entire enemy fleet.';
    } else {
        gameOverTitle.textContent = 'DEFEAT! 💥';
        gameOverMessage.textContent = 'Your fleet has been destroyed. Better luck next time!'
    }
    if (!retry_again) {
        return
    } else {
        retry_again.addEventListener('click', () => {
            window.location.reload();

        })
    }
}

const computerShips = [
    {name: 'Carrier', length: 5, axis: 'horizontal'},
    {name: 'BattleShip', length: 4, axis: 'vertical' },
    {name: 'Cuiser', length: 3, axis: 'horizontal' },
    {name: 'Submarine', length: 3, axis: 'vertical'},
    {name: 'Destroyer', length: 2, axis: 'horizontal' },
];

computerShips.forEach((ship) => {
    const coordinates = getRandomShipCoordinates(ship.length,ship.axis);

    game.player2.gameboard.placeShip(ship.length,coordinates,ship.name);
    
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

//handle audio
const sounds = {
    hit: new Audio(explosionSrc),
    miss: new Audio(missSrc),
    sunk: new Audio(sunkSrc),
    win: new Audio(winSrc),
    hit2: new Audio(explosion2Src),
    main_song: new Audio(mainSrc),
    game_start: new Audio(gameStartSrc),
    game_over: new Audio(gameOverSrc)
}
sounds.main_song.loop = true;
sounds.main_song.volume = 0.4
function playSound(name, maxMs = 1000) {
    const s = sounds[name];
    s.currentTime = 0;
    s.play();
    setTimeout(() => s.pause(), maxMs);
}

sounds.main_song.play().catch(() => {
    document.addEventListener('pointerdown', () => {
        sounds.main_song.play().catch(console.error);
    }, { once: true });
});

// handle SunkedShip
function markSunkShip(shipSunk,boardContainer) {
    if (!shipSunk) {
        return;
    }
    shipSunk.coordinates.forEach(([row,column]) => {
        const cell = boardContainer.querySelector(`[data-row="${row}"][data-column="${column}"]`);
        if (cell) {
            cell.classList.add('sunk');
            playSound("sunk", 2150);
        }
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
                gameStatus.textContent ="Ships cannot overlap. Choose another position!";
                return;
            }

            game.player1.gameboard.placeShip(shipLength,coordinates,shipName)
            
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
                const result = game.attack(coordinate, (computerCoordinate, computerHit,computerShipSunk) => {
                    const [row, column] = computerCoordinate;

                    const computerCell = playerBoard.querySelector(
                        `[data-row="${row}"][data-column="${column}"]`
                    );

                    if (computerHit) {
                        playSound("hit2", 1150);
                        computerCell.classList.add('hit');
                    } else {
                        playSound("miss");
                        computerCell.classList.add('miss');
                    };

                    if (computerShipSunk) {
                        markSunkShip(computerShipSunk,playerBoard);
                        gameStatus.textContent = `Computer Destroyed ${computerShipSunk.ship.name}!`;

                    } 
                    else if (game.winner) {
                        gameStatus.textContent = game.winner === game.player1 ? "You win, All enemies Eliminated!" : "Computer wins"
                        showGameOver();
                        playSound("game_over", 2150);
                        sounds.main_song.pause();
                        sounds.main_song.currentTime = 0;
                        playSound("win", 4000)

                    } else {
                        gameStatus.textContent = `Your turn, fire at enemies fleet`;
                    }

               
                    
                    
                });

                if (!result) {
                    return;
                }

                if (result.hit) {
                    cell.classList.add('hit');
                    playSound("hit",1150);
                } else {
                    cell.classList.add('miss');
                    playSound("miss");
                }

                if (result.shipSunk) {
                    markSunkShip(result.shipSunk,computerBoard);
                    gameStatus.textContent = `Target ${result.shipSunk.ship.name} Eliminated`
                    playSound("sunk", 1500);
                }

                if (game.winner) {
                    gameStatus.textContent = game.winner === game.player1 ? "You win, All enemies Eliminated!" : "Computer wins"
                    playSound("game_over", 2150);
                    showGameOver();
                    sounds.main_song.pause();
                    sounds.main_song.currentTime = 0;
                    playSound("win", 4000)
                }
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
    document.querySelector('.ships-remaining').textContent = '';
    gameStarted = true;
    if (startGameButton) {
        playSound("game_start", 4000)
    }
    
    gameStatus.textContent = "Battle started Fire at the computer's board"
});
