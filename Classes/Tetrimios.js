class Tetrimios {
  /*
   ** Generate a random tetrimino
   */
  constructor() {}
  generateRandomTetrimino() {
    let randomTetrimino = Math.floor(Math.random() * 7);
    switch (randomTetrimino) {
      case 0:
        return "I";
      case 1:
        return "J";
      case 2:
        return "L";
      case 3:
        return "O";
      case 4:
        return "S";
      case 5:
        return "T";
      case 6:
        return "Z";
    }
  }
  /*
   ** Get array of 10 tetriminos
   */
  getTetriminos() {
    let tetriminos = [];
    for (let i = 0; i < 20; i++) {
      tetriminos.push(this.generateRandomTetrimino());
    }
    return tetriminos;
  }
}

module.exports = Tetrimios;
