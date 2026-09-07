import { gameBoard } from "../gamebord_class.js";
// import { Ship } from "../Test/ship.test.js";


// Test for a newly created Gameboard
// test('Test to show number of ships a newly created gameboard has', () => {
//     let board = new gameBoard()
//     expect(board.ships).toEqual([])
// })

// //Testing if placeship places a ship on the board
// test('Testing if placeship method places a ship onto the board', () => {
//     let board = new gameBoard();
//     board.placeShip(2);
//     expect(board.ships.length).toBe(1);
// })

// // Testing if the placed ship has the correct length
// test('Testing if the placedship has the correct length', () => {
//     let board = new gameBoard();
//     board.placeShip(2);
//     expect(board.ships[0].length).toBe(2)
// })

// // Testing if the placed ships coordinates were recorded
// test('checking if the coordinates for the placed ship was recorded', () => {
//     let board = new gameBoard();
//     board.placeShip(2,[[2,3],[2,4]]);
//     expect(board.coordinates).toEqual([[[2,3],[2,4]]])

// })

//expecting the ship to have 1 hit count after calling the recieve attack function on it
// test('expecting the ship to have 1 hit after calling recieve attack',() => {
//    let board = new gameBoard();
//    board.placeShip(2,[[2,3],[2,4]]);
//    board.placeShip(3,[[1,2],[3,6],[4,5]]);
//    board.receiveAttack([2,4]);
//    expect(board.ships[0].hits).toEqual(1);
// })

test('expecting the ship to record missed into missed_attacks ', () => {
   let board = new gameBoard();
   board.placeShip(3, [[1, 2], [3, 6], [4, 5]]);
   board.receiveAttack([5,5]);
   expect(board.missed_attacks).toContainEqual([5,5]);;
})