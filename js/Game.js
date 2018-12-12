class Game {
  constructor() {
    this.roundNumber = 1;
    this.players = [];
    this.rounds = [];
    this.allClues = [];
    this.activePlayerIndex = 0;
    this.cluesRemaining = 16;
  }

  changeActivePlayer() {
    if (this.activePlayerIndex < 2) {
      this.activePlayerIndex++;
    } else {
      this.activePlayerIndex = 0;
    }
    this.activePlayer.isActivePlayer = false;
    this.activePlayer = this.players[this.activePlayerIndex];
    this.activePlayer.isActivePlayer = true;
  }

  addPlayer(player) {
    this.players.push(player);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Game;
}