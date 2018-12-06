class Player {
  constructor(name, score = 0) {
    this.name = name;
    this.score = score;
  }
  
  updateScore(value) {
    this.score += value;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Player;
}