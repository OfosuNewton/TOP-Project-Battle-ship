import { gameBoard } from "../src/gamebord_class";
export class Player {
    constructor() {
        this.gameboard = new gameBoard()
    }

    attack(enemyGameboard, coordinate) {
        return enemyGameboard.receiveAttack(coordinate);
    }
}