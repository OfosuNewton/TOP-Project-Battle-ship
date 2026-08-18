import { Ship } from "../src/ship_class.js"
export class gameBoard {
    constructor (ships = [], missed_attacks = []) {
        this.ships = ships
        this.missed_attacks = missed_attacks
        this.coordinates = []
    }
    placeShip(ship_length, coordinates) {
        const created_ship = new Ship(ship_length);
        this.ships.push(created_ship);

        this.coordinates.push(coordinates)
    }
}