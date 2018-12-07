
const jeopardy = {
  players: [],
  clues: [],
  rounds: [],
  game: {},
  categoryNames: {
    unitedStatesHistory: 'United States History',
    lifeSciences: 'Life Sciences',
    publicHealth: 'Public Health',
    educationJargon: 'Education Jargon',
    nameThatBoardGame: 'Name That Board Game',
    americanLiterature: 'American Literature',
    biographies: 'Biographies',
    americanCities: 'American Cities',
    food: 'Food',
    cableTV: 'Cable TV'
  }
};

$('.input--submit').on('click', instantiatePlayers);

function instantiatePlayers(event) {
  event.preventDefault();
  jeopardy.players.push(new Player($('#name-0').val()));
  jeopardy.players.push(new Player($('#name-1').val()));
  jeopardy.players.push(new Player($('#name-2').val()));
  domUpdates.updatePlayersOnDOM();
  this.disabled = true;
  instantiateGame();
}

function instantiateGame() {
  jeopardy.game = new Game(jeopardy.players[0]);
  $('.span--round').text(jeopardy.game.round);
  instantiateClues();
  instantiateRounds();
  $('.main').on('click', domUpdates.presentClue);
}

function instantiateClues() {
  data.clues.forEach(clue => {
    const { question, answer, pointValue, categoryId } = clue;
    jeopardy.clues.push(new Clue(question, answer, pointValue, categoryId));
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
  });
}