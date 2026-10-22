# Ultimate Battleship

A browser-based Battleship game built with JavaScript as the final project for **The Odin Project's Intermediate JavaScript course**. The project focuses on object-oriented programming, modular JavaScript, test-driven development, DOM manipulation, and Webpack.

Players deploy their fleet, target the computer's ships, and compete to sink the opposing fleet before their own ships are destroyed.

## Table of Contents
 
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Architecture](#project-architecture)
- [Game Rules](#game-rules)
- [Getting Started](#getting-started)
- [Development and Build](#development-and-build)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Learning Objectives](#learning-objectives)
- [Acknowledgements](#acknowledgements)

## Overview

Ultimate Battleship is an interactive implementation of the classic Battleship strategy game. It features a 10 × 10 grid for each player, draggable ship placement, a computer-controlled opponent, turn-based attacks, and visual feedback for hits, misses, and destroyed ships.

The project separates the core game logic from the user interface to make the code easier to test, maintain, and extend. Webpack is used to bundle the JavaScript modules and project assets.


<img width="1600" height="900" alt="Live_preview" src="https://github.com/user-attachments/assets/37c98831-c3e7-4c0d-bcb1-9a6e412a87b3" />
Live Demo
[Play the game here] https://ofosunewton.github.io/TOP-Project-Battle-ship/


## Features

### Gameplay

- Two 10 × 10 game boards representing the player's territory and the computer's territory.
- Five ships with different lengths:
  - Carrier — 5 cells
  - Battleship — 4 cells
  - Cruiser — 3 cells
  - Submarine — 3 cells
  - Destroyer — 2 cells
- Drag-and-drop ship placement.
- Horizontal and vertical ship orientation.
- Validation to prevent ships from overlapping or extending outside the board.
- Randomized legal ship placement for the computer opponent.
- Turn-based attacks with duplicate attacks prevented.
- Random computer attacks with a delay before the computer makes its move.
- Computer targeting that can prioritize nearby cells after a successful hit.
- Automatic ship-sinking detection and winner determination.
- Victory and defeat screens with a play-again option.

### User Interface

- Interactive game boards with distinct visual states for ships, hits, misses, and sunk ships.
- Status messages indicating the current turn and game events.
- Ship deployment controls and remaining-ship information.
- Sound effects for attacks, misses, sinking ships, game starts, and game endings.
- Background music with browser autoplay handling.
- Animated visual feedback and a styled game-screen interface.
- Responsive layout adjustments for different screen sizes.
- CSS styling for the background, screen frame, controls, and board cells.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Game structure and interface |
| CSS3 | Layout, styling, animations, and responsive design |
| JavaScript (ES6+) | Game logic, classes, modules, and interactions |
| Webpack | Bundling JavaScript modules and project assets |
| Jest | Unit testing of the core game logic |
| npm | Dependency and script management |
| Git and GitHub | Version control and source-code management |

## Project Architecture

The game is organized around separate modules responsible for ships, game boards, players, game flow, and DOM interactions.

### 1. Ship

The `Ship` class represents an individual ship.

Responsibilities include:

- Storing the ship's length and name.
- Tracking the number of hits received.
- Determining whether the ship has sunk.

Key methods:

- `hit()` — increments the ship's hit count.
- `isSunk()` — determines whether the number of hits has reached the ship's length.

### 2. Gameboard

The `gameBoard` class manages the state of an individual player's board.

Responsibilities include:

- Storing ships and their coordinates.
- Placing ships on the board.
- Processing incoming attacks.
- Recording missed attacks.
- Identifying sunk ships.
- Determining whether all ships have been sunk.

Key methods:

- `placeShip()` — creates and places a ship.
- `receiveAttack()` — checks an attack against ship coordinates and updates the appropriate state.
- `allShipsSunk()` — determines whether every ship on the board has sunk.

### 3. Player

The `Player` class represents a human player or computer opponent.

Responsibilities include:

- Maintaining a gameboard.
- Recording previously attacked coordinates.
- Attacking an opponent's gameboard.
- Generating random legal attack coordinates for the computer.

The player logic helps prevent repeated attacks against coordinates that have already been targeted.

### 4. Game Controller

The `Game` class manages the overall game flow.

Responsibilities include:

- Creating the human and computer players.
- Tracking the current player and game winner.
- Switching turns.
- Processing attacks.
- Triggering the computer's delayed response.
- Managing computer targeting behavior.
- Preventing further gameplay once a winner is determined.

### 5. DOM and Interface

The DOM module connects the game logic to the browser interface.

Responsibilities include:

- Rendering both game boards.
- Handling ship drag-and-drop interactions.
- Managing ship orientation and placement validation.
- Responding to attacks on the computer's board.
- Updating visual states for hits, misses, and sunk ships.
- Displaying game status and end-of-game messages.
- Managing sound effects and background music.

This separation keeps the core game rules independent of the DOM, allowing the underlying logic to be tested without relying on browser rendering.

## Game Rules

1. The player deploys all five ships before starting the game.
2. Each ship must fit within the board and cannot overlap another ship.
3. The player selects a cell on the computer's board to launch an attack.
4. An attack is classified as a hit or a miss.
5. The computer responds after a short delay.
6. Previously attacked coordinates cannot be targeted again.
7. A ship sinks when all its cells have been hit.
8. The game ends when one player's entire fleet has been sunk.

## Getting Started

### Prerequisites

Install the following software before running the project:

- [Node.js](https://nodejs.org/)
- npm, which is included with Node.js
- Git, if you intend to clone the repository

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate into the project directory:

```bash
cd <your-project-directory>
```

Install the project dependencies:

```bash
npm install
```

### Run the Project

Use the development command defined in `package.json`. For a project configured with Webpack Dev Server, this is commonly:

```bash
npm start
```

If your project uses a different script name, use the corresponding command from `package.json`.

## Development and Build

Webpack bundles the project's JavaScript modules and handles configured assets, such as audio files and other imported resources.

For a typical Webpack configuration, the production build command is:

```bash
npm run build
```

The generated output is placed in the configured build directory, commonly `dist/`.

Available commands depend on the scripts defined in `package.json` and the project's Webpack configuration. Check those files for the exact commands and output directory.

## Testing

The project uses Jest to test the core game logic independently of the DOM.

The main areas of testing include:

- Ship hit tracking and sinking behavior.
- Ship placement and coordinate management.
- Successful and unsuccessful attacks.
- Recording missed attacks.
- Determining whether all ships have sunk.
- Preventing repeated attacks.
- Player turn switching and winner detection.

Run the configured test command:

```bash
npm test
```

This command assumes that a `test` script is defined in `package.json`.

The testing approach follows the principles of test-driven development (TDD): write tests for expected behavior, implement the required logic, and refactor while keeping the tests passing.

## Project Structure

The following is a representative structure based on the project's modules and assets. Adjust filenames and folders to match the final repository.

```text
ultimate-battleship/
├── src/
│   ├── ship_class.js
│   ├── gameboard_class.js
│   ├── player_class.js
│   ├── GameController.js
│   ├── dom.js
│   └── index.js
├── tests/
│   ├── ship_class.test.js
│   ├── gameboard_class.test.js
│   └── player_class.test.js
├── img/
│   └── war.jpeg
├── package.json
├── package-lock.json
├── webpack.config.js
├── .gitignore
└── README.md
```

Webpack configuration, test files, asset locations, and source filenames may differ in the actual repository.

## Learning Objectives

This project demonstrates practical application of the following JavaScript concepts and development practices:

- Object-oriented programming with classes and instances.
- ES modules and separation of concerns.
- Array methods such as `some()` and `every()`.
- Coordinate-based grid logic and state management.
- Event handling and DOM manipulation.
- Asynchronous behavior using `setTimeout()`.
- Test-driven development with Jest.
- Module bundling and asset management with Webpack.
- CSS layout, animation, and responsive interface design.
- Debugging, refactoring, and maintaining an evolving codebase.

## Acknowledgements

- [The Odin Project](https://www.theodinproject.com/) — for the curriculum, project requirements, and learning resources.
- The JavaScript, Jest, and Webpack documentation — for technical references used during development.

---

**Project:** Ultimate Battleship  
**Course:** The Odin Project — Intermediate JavaScript  
**Status:** Final project in development
