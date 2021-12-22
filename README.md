# Red-tetris-42Network
The objective of this project is to develop a networked multiplayer tetris game from a stack of software exclusively Full Stack Javascript

There also is a classic solo mode with a leaderboard.

Everything is in real time thanks to socket.io.

The code is entirely unit tested with jest.
<!-- 
You can try it out **[here](https://tetris-orange.herokuapp.com/#)**.
It can take some time to load the app, heroku servers must wake up. -->

## Built with

### Front-end

* React.js + Redux Thunk
* Socket.io

### Back-end

* Node.js
* Socket.io
<!-- * Deployed with heroku -->

## Project preview
### Home page
<img src="https://github.com/Ysrbolles/Red-tetris-42Network/blob/main/images/Home.png" />

### Lobby 
<img src="https://github.com/Ysrbolles/Red-tetris-42Network/blob/main/images/Rooms.png" />

### Solo game 
<img src="https://github.com/Ysrbolles/Red-tetris-42Network/blob/main/images/Solo.png" />

### In a 'battle' game (2 players)
<img src="https://github.com/Ysrbolles/Red-tetris-42Network/blob/main/images/Game.png" />

### Game Over screen
<img src="https://github.com/Ysrbolles/Red-tetris-42Network/blob/main/images/Gameover.png" />

### Winner screen
<img src="https://github.com/Ysrbolles/Red-tetris-42Network/blob/main/images/Winner.png" />

## General instructions

The project must be written totally in Javascript and especially in its es2015 (ES6)
version.

The client code (browser) must be written without a call to "this" in the purpose
of pushing you to use functional constructs and not object. You have the choice of the
functional library (lodash, ramda, ...) to use it or not.

The handling logic of the heap and pieces must be implemented as "pure functions".
An exception to this rule: "this" can be used to define its own subclasses of "Error".
On the opposite, the server code must use object-oriented programming (prototype).
We want to find there at least the (ES6) Player, Piece and Game classes.

The client application must be built from the React and Redux libraries.

HTML code must not use TABLE elements, but must be built exclusively from
a layout flexbox.

Prohibition to use:
* A DOM manipulation library like jQuery
* Canvas
* SVG (Scalable Vector Graphics)
  
There is no need to directly manipulate the DOM.
## Skills

* Object-oriented programming 
* Web 
* Functional programming 
* Technology integration 

## Usage
  After Cloned the repo you must install the packages with the command:
  ```
  npm i

  ```
  Then you can run the server && client with the command:
  ```
  npm run dev
  ```
  
  The server is running on port 1337.
  The client is running on port 3000.

