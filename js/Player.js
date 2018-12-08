class Player {
  constructor(name, isActivePlayer = false) {
    this.name = name;
    this.score = 0;
    this.isActivePlayer = isActivePlayer;
  }
  
  updateScore(value) {
    this.score += value;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Player;
}