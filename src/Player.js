import { gameBoard } from "../src/gameboard_class";
export class Player {
    constructor(type) {
        this.gameboard = new gameBoard();
        this.type = type;
        this.attackedCoordinates = [];
    }

    attack(enemyGameboard, coordinate) {
        const alreadyAttacked = this.attackedCoordinates.some((attackedCoordinate) => {
            return attackedCoordinate[0] === coordinate[0] &&
                attackedCoordinate[1] === coordinate[1];
        });

        if (alreadyAttacked) {
            return;
        }

        this.attackedCoordinates.push(coordinate);

        return enemyGameboard.receiveAttack(coordinate);
    }

    getRandomCoordinate() {
        let coordinate;

        do {
            coordinate = [
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10)
            ];
        } while (this.attackedCoordinates.some((attackedCoordinate) => {
            return attackedCoordinate[0] === coordinate[0] && attackedCoordinate[1] === coordinate[1];
        }))
        this.attackedCoordinates.push(coordinate);
        return coordinate;
}
}