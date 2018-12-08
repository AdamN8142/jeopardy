$( document ).ready(domUpdates.showStartScreen);

const jeopardy = {
  players: [],
  rounds: [],
  game: {},
};

function instantiatePlayers(event) {
  event.preventDefault();
  jeopardy.players.push(new Player(0, $('#name-0').val(), true));
  jeopardy.players.push(new Player(1, $('#name-1').val()));
  jeopardy.players.push(new Player(2, $('#name-2').val()));
  domUpdates.removeStartScreen();
  domUpdates.updatePlayersOnDOM();
  // this.disabled = true;
  instantiateGame();
}

function instantiateGame() {
  jeopardy.game = new Game();
  $('.span--round').text(jeopardy.game.round);
  instantiateClues();
  instantiateRounds();
  checkGameState();
  $('.main').on('click', domUpdates.presentClue);
}

function instantiateClues() {
  data.clues.forEach(clue => {
    const { question, answer, pointValue, categoryId } = clue;
    jeopardy.game.allClues.push(new Clue(question, answer, pointValue, categoryId));
  });
}

function instantiateRounds() {
  const categories = Object.keys(data.categories);
  randomizeCategories(categories);
  for (let i = 0; i < 2; i++) {
    const roundCategories = categories.splice(0, 4);
    jeopardy.rounds.push(new Round(roundCategories, i + 1));
  }
  jeopardy.rounds.push(new Round([categories[0]], 1));
  configureRounds();
  domUpdates.updateCategoriesOnDOM();
}

function randomizeCategories(cats) {
  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor((Math.random() * (10 - i))) + i;
    [cats[i], cats[randomIndex]] = [cats[randomIndex], cats[i]];
  }
}

function configureRounds() {
  jeopardy.rounds.forEach((round, i) => {
    jeopardy.rounds[i].setClues();
    jeopardy.rounds[i].randomizeDailyDoubles();
    jeopardy.rounds[i].setCategoryNames();
  });
}

function checkGameState() {
  // check who the active player is
  
  // call a function from domUpdates to indicate who that player is
  domUpdates.highlightPlayer()
  // check how many clues are left
  // go to the next round when there are zero clues left 
}