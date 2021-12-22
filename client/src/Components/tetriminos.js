export const TETROMINOS = {
  0: { shape: [[0]], color: "0, 0, 0" },
  I: {
    shape: [
      ["I", "I", "I", "I"],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "80, 227, 230,0.8",
  },
  J: {
    shape: [
      ["J", 0, 0],
      ["J", "J", "J"],
      [0, 0, 0],
    ],
    color: "36, 95, 223,0.8",
  },
  L: {
    shape: [
      [0, 0, "L"],
      ["L", "L", "L"],
      [0, 0, 0],
    ],
    color: "223, 173, 36,0.8",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "223, 217, 36,0.8",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: "48, 211, 56,0.8",
  },
  T: {
    shape: [
      [0, "T", 0],
      ["T", "T", "T"],
      [0, 0, 0],
    ],
    color: "132, 61, 198,0.8",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: "227, 78, 78,0.8",
  },
  IS: {
    color: "80, 227, 230,0.19",
  },
  JS: {
    color: "36, 95, 223,0.19",
  },
  LS: {
    color: "223, 173, 36,0.19",
  },
  OS: {
    color: "223, 217, 36,0.19",
  },
  SS: {
    color: "48, 211, 56,0.19",
  },
  TS: {
    color: "132, 61, 198,0.19",
  },
  ZS: {
    color: "227, 78, 78,0.19",
  },
  Wall: {
    color: "72, 72, 72,0.8",
  },
};

//Generate random tetrimino
// export const randomTetromino = () => {
//   const tetrominos = "IJLOSTZ";
//   const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
//   return TETROMINOS[randTetromino];
// };
