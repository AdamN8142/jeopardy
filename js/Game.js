class Game {
  constructor() {
    this.roundNumber = 1;
    this.allClues = [];
    this.activePlayerIndex = 0;
    this.activePlayer = jeopardy.players[0]
    this.cluesRemaining = 16;
  }

  reset() {

  }

  changeActivePlayer() {
    if (this.activePlayerIndex < 2) {
      this.activePlayerIndex++;
    } else {
      this.activePlayerIndex = 0;
    }
    this.activePlayer.isActivePlayer = false;
    this.activePlayer = jeopardy.players[this.activePlayerIndex];
    this.activePlayer.isActivePlayer = true;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Game;
}