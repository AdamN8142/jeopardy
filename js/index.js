const jeopardy = new Game();

$('.input--submit').on('click', startGame);
$('.main--clue-squares').on('click', domUpdates.presentClue);

function startGame(event) {
  event.preventDefault();
  instantiatePlayers();
  instantiateClues();
  instantiateRounds();
  checkGameState();
  domUpdates.removeStartScreen();
  domUpdates.updatePlayerNamesOnDOM();
  domUpdates.updateRoundNumberOnDOM();
}

function instantiatePlayers() {
  jeopardy.addPlayer(new Player($('#name-0').val(), true));
  jeopardy.addPlayer(new Player($('#name-1').val()));
  jeopardy.addPlayer(new Player($('#name-2').val()));
  jeopardy.activePlayer = jeopardy.players[0];
}

function instantiateClues() {
  data.clues.forEach(clue => {
    const { question, answer, pointValue, categoryId } = clue;
    jeopardy.allClues.push(new Clue(question, answer, pointValue, categoryId));
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
  domUpdates.highlightPlayer();
}

if (typeof module !== 'undefined') {
  module.exports = jeopardy;
}