import { Player } from "../Player";
import { gameBoard } from "../gamebord_class"

//testing the case of our instance
// test("Player has a gameboard", () => {
//     const player = new Player();

//     expect(player.gameboard).toBeInstanceOf(gameBoard);
// })

// test("player can attack an enemy gameboard", () => {
//     const player = new Player();
//     const enemyGameboard = new gameBoard();

    
//     enemyGameboard.placeShip(2, [[0,0], [0,1]]);

//     player.attack(enemyGameboard,[0,0]);

//     expect(enemyGameboard.ships[0].hits).toBe(1);
// })

// test("computer player can generate a random attack coordinate", () => {
//     const computer = new Player("computer");

//     const coordinate = computer.getRandomCoordinate();

//     expect(coordinate).toHaveLength(2);
// });

// test("computer player can generate a random attack coordinate", () => {
//     const computer = new Player("computer");

//     const coordinate = computer.getRandomCoordinate();

//     expect(coordinate).toHaveLength(2);
// });

// test("computer does not attack the same coordinate twice",() => {
//     const computer = new Player("computer");

//     const firstCoordinate = computer.getRandomCoordinate();
//     const secondCoordinate = computer.getRandomCoordinate();

//     expect(secondCoordinate).not.toEqual(firstCoordinate);
// })

// test("computer records its attack coordinate", () => {
//     const computer =  new Player("computer");

//     const coordinate = computer.getRandomCoordinate();

//     expect(computer.attackedCoordinates).toContainEqual(coordinate);
// });

// test("computer can attack an enemy gameboard",() => {
//     const computer = new Player("computer");
//     const enemyGameboard = new gameBoard();
//     const coordinate = computer.getRandomCoordinate();
//     computer.attack(enemyGameboard,coordinate);

//     expect(enemyGameboard.missed_attacks).toContainEqual(coordinate);
// })

// test("computer does not repeat coordinates", () => {
//     const computer = new Player("computer");
//     const coordinates = [];
//     for (let i = 0; i < 100; i ++) {
//         const coordinate = computer.getRandomCoordinate();
//         coordinates.push(coordinate)
//     }
//     const uniqueCoordinates = new Set(coordinates.map((coordinate) => coordinate.toString()))

//     expect(uniqueCoordinates.size).toBe(100);
// })