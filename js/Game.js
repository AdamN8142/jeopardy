class Game {
  constructor(activePlayer) {
    this.round = 1;
    this.activePlayer = activePlayer;
    this.clues = [];
    this.cluesRemaining = 16;
  }

  reset() {

  }

  changeActivePlayer() {
    
  }
}

if (typeof module !== 'undefined') {
  module.exports = Game;
}