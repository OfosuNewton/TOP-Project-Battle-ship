import { Player } from "../Player";
import { gameBoard } from "../gamebord_class"

//testing the case of our instance
// test("Player has a gameboard", () => {
//     const player = new Player();

//     expect(player.gameboard).toBeInstanceOf(gameBoard);
// })

test("player can attack an enemy gameboard", () => {
    const player = new Player();
    const enemyGameboard = new gameBoard();

    
    enemyGameboard.placeShip(2, [[0,0], [0,1]]);

    player.attack(enemyGameboard,[0,0]);

    expect(enemyGameboard.ships[0].hits).toBe(1);
})