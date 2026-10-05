import { Game } from "../GameController";
import { Player } from "../Player";
import { gameBoard } from "../gamebord_class";

// test("game has two players", () => {
//     const game  = new Game();
//     expect(game.player1).toBeInstanceOf(Player);
//     expect(game.player2).toBeInstanceOf(Player);
// })

//testing our starting player
// test("game starts with player1", () => {
//     const game = new Game();
//     expect(game.currentPlayer).toBe(game.player1);
    
// })

// testing the switch method
// test("game switches turns", () => {
//     const game = new Game();

//     game.switchTurn();

//     expect(game.currentPlayer).toBe(game.player2);

//     game.switchTurn();

//     expect(game.currentPlayer).toBe(game.player1);
// });

// test("current player attacks opponent and turn switches", () => {
//     const game = new Game();

//     game.player2.gameboard.placeShip(2, [[0, 0], [0, 1]]);

//     game.attack([0, 0]);

//     expect(game.player2.gameboard.ships[0].hits).toBe(1);
//     expect(game.currentPlayer).toBe(game.player2);
// });


// test("attack sets the winner when all enemy ships are sunk", () => {
//     const game = new Game();

//     game.player2.gameboard.placeShip(1, [[0, 0]]);

//     game.attack([0, 0]);

//     expect(game.winner).toBe(game.player1);
// });

// test("turn does not switch when the game ends", () => {
//     const game = new Game();

//     game.player2.gameboard.placeShip(1, [[0, 0]]);

//     game.attack([0, 0]);

//     expect(game.winner).toBe(game.player1);
//     expect(game.currentPlayer).toBe(game.player1);
// });

// test("cannot attack after there is a winner", () => {
//     const game = new Game();

//     game.player2.gameboard.placeShip(1, [[0, 0]]);

//     // Player 1 wins
//     game.attack([0, 0]);

//     // Player 2 would normally be the current player,
//     // but the game is already over.
//     game.attack([5, 5]);

//     expect(game.winner).toBe(game.player1);
//     expect(game.player2.gameboard.missed_attacks).toEqual([]);
// });

// test("Player 2 is the computer", () => {
//     const game = new Game()
//     expect(game.player2.type).toBe('Computer')
// })

test("computer attacks when it is the computer's turn", () => {
    const game = new Game();

    game.player1.gameboard.placeShip(1,[[5,5]]);
    game.player2.gameboard.placeShip(2, [[0, 0],[0,1]]);

    game.attack([0,0])
    expect(game.player1.gameboard.missed_attacks.length).toBe(1);
})
