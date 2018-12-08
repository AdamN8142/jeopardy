class Player {
  constructor(id, name, isActivePlayer = false) {
    this.id = id;
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