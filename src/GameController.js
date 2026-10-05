import { Player } from "../src/Player";
export class Game {
    constructor() {
        this.player1 = new Player("Human");
        this.player2 = new Player("Computer"); //changed player 2 argument to receive  computer
        this.currentPlayer = this.player1;
        this.winner = null;
    }

    switchTurn() {
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }
    }

    attack(coordinate) {
        if (this.winner) {
            return;
        }
        
        const enemyPlayer =
            this.currentPlayer === this.player1
                ? this.player2
                : this.player1;

        this.currentPlayer.attack(enemyPlayer.gameboard, coordinate);

        if (enemyPlayer.gameboard.allShipsSunk()) {
            this.winner = this.currentPlayer;
            return;
        }

        this.switchTurn();

        if (this.currentPlayer === this.player2) {
            const coordinate = this.currentPlayer.getRandomCoordinate()
            this.currentPlayer.attack(this.player1.gameboard, coordinate);
        }
    }
}