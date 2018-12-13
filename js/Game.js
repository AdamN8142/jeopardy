class Game {
  constructor() {
    this.roundNumber = 1;
    this.players = [];
    this.rounds = [];
    this.allClues = [];
    this.activePlayerIndex = 0;
    this.cluesRemaining = 16;
  }

  startGame(event) {
    event.preventDefault();
    jeopardy.instantiatePlayers();
    jeopardy.instantiateClues();
    jeopardy.instantiateRounds();
    jeopardy.checkGameState();
    domUpdates.removeStartScreen();
    domUpdates.updatePlayerNamesOnDOM();
    domUpdates.updateCategoriesOnDOM();
  }
  
  instantiatePlayers() {
    this.addPlayer(new Player($('#name-0').val(), true));
    this.addPlayer(new Player($('#name-1').val()));
    this.addPlayer(new Player($('#name-2').val()));
    this.activePlayer = this.players[0];
  }
  
  instantiateClues() {
    data.clues.forEach(clue => {
      const { question, answer, pointValue, categoryId } = clue;
      this.allClues.push(new Clue(question, answer, pointValue, categoryId));
    });
  }
  
  instantiateRounds() {
    const categories = Object.keys(data.categories);
    randomizeArray(categories);
    for (let i = 1; i <= 2; i++) {
      const roundCategories = categories.splice(0, 4);
      this.rounds.push(new Round(roundCategories, i));
    }
    this.rounds.push(new Round([categories[0]], 1));
    this.configureRounds();
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

  checkGameState() {
    domUpdates.highlightPlayer();
    if (this.cluesRemaining === 0 && this.roundNumber === 1) {
      this.cluesRemaining = 16;
      this.roundNumber++
      domUpdates.goToRound2();
    } else if (this.cluesRemaining === 0 && this.roundNumber === 2) {
      this.cluesRemaining = 1;
      this.roundNumber++;
      domUpdates.goToFinalJeopardy();
    }
  }

  configureRounds() {
    this.rounds.forEach(round => {
      round.setClues(this);
      round.randomizeDailyDoubles();
      round.setCategoryNames();
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = Game;
}