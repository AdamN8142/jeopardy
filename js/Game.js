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
    // go through the players array
    // find the index active player
    if (this.activePlayerIndex < 2) {
      this.activePlayerIndex++;
    } else {
      this.activePlayerIndex = 0;
    }
    this.activePlayer.isActivePlayer = false;
    this.activePlayer = jeopardy.players[this.activePlayerIndex];
    this.activePlayer.isActivePlayer = true;
    



    // if index is less than 2, increment the index and the player at new index is made active
    // if index is equal to 2, the player at index 0 becomes active
    // also have to change this.activePlayer
  }
}

if (typeof module !== 'undefined') {
  module.exports = Game;
}