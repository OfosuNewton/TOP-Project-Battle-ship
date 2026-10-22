import { Ship } from "./ship_class.js"
export class gameBoard {
    constructor (ships = [], missed_attacks = []) {
        this.ships = ships
        this.missed_attacks = missed_attacks
        this.coordinates = []
    }
    placeShip(ship_length, coordinates,ship_name) {
        const created_ship = new Ship(ship_length,ship_name);
        this.ships.push(created_ship);

        this.coordinates.push(coordinates)
    }

    receiveAttack(coordinate) {
        let shipSunk = null;
        const hit = this.coordinates.some((shipCoordinates,index) => {
            return shipCoordinates.some((shipCoordinate) => {
                // comparison here
                if (shipCoordinate[0] === coordinate[0] && shipCoordinate[1] === coordinate[1]) {
                    const ship = this.ships[index];
                    ship.hit();
                    if (ship.isSunk()) {
                        shipSunk = {
                            ship,
                            coordinates: this.coordinates[index]
                        };
                    }
                    return true;
                }
                return false;
        })        
    })
    if (!hit) {
        this.missed_attacks.push(coordinate);
    }
    return {
        hit,
        shipSunk
    }

}
allShipsSunk() {
    return this.ships.every((ship) => {
        return ship.isSunk();
    })
 }
}