class Game {
  constructor() {
    this.roundNumber = 1;
    this.players = [];
    this.rounds = [];
    this.allClues = [];
    this.activePlayerIndex = 0;
    this.cluesRemaining = 16;
  }

  startGame(names) {
    this.instantiatePlayers(names);
    this.instantiateClues();
    this.instantiateRounds();
    this.configureRounds();
    this.checkGameState();
    domUpdates.removeStartScreen();
    domUpdates.updatePlayerNamesOnDOM();
    domUpdates.updateCategoriesOnDOM();
  }
  
  instantiatePlayers(names) {
    this.addPlayer(new Player(names[0], true));
    this.addPlayer(new Player(names[1]));
    this.addPlayer(new Player(names[2]));
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
    this.randomizeArray(categories);
    for (let i = 1; i <= 2; i++) {
      const roundCategories = categories.splice(0, 4);
      this.rounds.push(new Round(roundCategories, i));
    }
    this.rounds.push(new Round([categories[0]], 1));
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

  randomizeArray(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      const randomIndex = Math.floor((Math.random() * (arr.length - i))) + i;
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = Game;
}