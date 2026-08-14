import { Ship } from "../ship_class.js"
//test for a newly(ship 1) created ship with 0 hits
// test('newly created destroyer should return 0', () => {
//     let destroyer = new Ship(1)
//     expect(destroyer.hit()).toBe(1);
//     expect(destroyer.hit()).toBe(2);
//     expect(destroyer.hit()).toBe(3);

// })

//ship 2
// test('next hit should change this.hits to 2', () => {
//     let destroyer = new Ship(2)
//     expect(destroyer.hit()).toBe(1)
//     expect(destroyer.hit()).toBe(2)
//     expect(destroyer.hit()).toBe(3)

// })

//test for isSunk
test('check if a ship has enough hit to sink', () => {
    let destroyer = new Ship(2);
    expect(destroyer.hit()).toBe(1)
    expect(destroyer.isSunk()).toBe(false);
})

//test for isSunk ship 2
test('check if a ship has enough hit to sink(ship 2)', () => {
    let destroyer = new Ship(2);
    expect(destroyer.hit()).toBe(1);
    expect(destroyer.hit()).toBe(2);
    expect(destroyer.isSunk()).toBe(true);
})






