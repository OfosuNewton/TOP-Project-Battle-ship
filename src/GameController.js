import { Player } from "../src/Player";
export class Game {
    constructor() {
        this.player1 = new Player("Human");
        this.player2 = new Player("Computer"); //changed player 2 argument to receive  computer
        this.currentPlayer = this.player1;
        this.winner = null;
        this.isComputerThinking = false;
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
                const computerCoordinate =
                    this.currentPlayer.getRandomCoordinate();

                const computerHit = this.currentPlayer.attack(
                    this.player1.gameboard,
                    computerCoordinate
                );

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