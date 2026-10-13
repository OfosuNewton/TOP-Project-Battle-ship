import { Player } from "../src/Player";
export class Game {
    constructor() {
        this.player1 = new Player("Human");
        this.player2 = new Player("Computer"); //changed player 2 argument to receive  computer
        this.currentPlayer = this.player1;
        this.winner = null;
        this.isComputerThinking = false;
        this.computerHits = [];
        this.computerTargetQueue = [];
    }

    getAdjacentCoordinates([row,column]) {
        return [
            [row - 1, column],
            [row + 1, column],
            [row, column - 1],
            [row, column +1]
        ].filter(([row, column]) => {
            const withinBoard = row >= 0 && row < 10 && column >= 0 && column < 10;
            const alreadyAttacked = this.player2.attackedCoordinates.some(([attackedRow,attackedColumn]) => {
                return attackedRow === row && attackedColumn === column;
            });
            const alreadyQueued = this.computerTargetQueue.some(
                ([queuedRow,queuedColumn]) => {
                    return queuedRow === row && queuedColumn === column;
                }
            );
            return withinBoard && !alreadyAttacked && !alreadyQueued;
        });
    }

    switchTurn() {
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }
    }

    attack(coordinate, onComputerMove) {
        if (this.winner) {
            return;
        }
        if (this.isComputerThinking) {
            return;
        }
        
        const enemyPlayer =
            this.currentPlayer === this.player1
                ? this.player2
                : this.player1;

        const hit = this.currentPlayer.attack(enemyPlayer.gameboard, coordinate);
        if (hit === undefined) {
            return;
        }
        


        if (enemyPlayer.gameboard.allShipsSunk()) {
            this.winner = this.currentPlayer;
            return {
                hit,
                computerCoordinate: null,
                computerHit: null
            }
        }


        this.switchTurn();

        if (this.currentPlayer === this.player2) {
            this.isComputerThinking = true;
            setTimeout(() => {
                let computerCoordinate;

                while (this.computerTargetQueue.length > 0 && !computerCoordinate) {
                    const target = this.computerTargetQueue.shift();

                    const alreadyAttacked = this.player2.attackedCoordinates.some(([row,column]) => row === target[0] && column === target[1]) ;
                    if (!alreadyAttacked) {
                        computerCoordinate = target;
                    }
                }
                if (!computerCoordinate) {
                    computerCoordinate = this.currentPlayer.getRandomCoordinate()
                }
                const computerHit = this.currentPlayer.attack(
                    this.player1.gameboard,
                    computerCoordinate
                );

                if (computerHit) {
                    this.computerHits.push(computerCoordinate);
                }

                if (computerHit) {
                    const adjacentCoordinates = this.getAdjacentCoordinates(computerCoordinate);

                    this.computerTargetQueue.push(...adjacentCoordinates);
                }

                if (this.player1.gameboard.allShipsSunk()) {
                    this.winner = this.player2;
                }

                this.switchTurn();

                this.isComputerThinking = false;
                onComputerMove(computerCoordinate, computerHit);
            }, 1000);
        }

        return { hit };

        
        // return  {
        //     hit,
        //     computerCoordinate,
        //     computerHit
            
        // }
    }
}