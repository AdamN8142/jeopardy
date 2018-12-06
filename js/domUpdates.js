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
    cableTV: 'CableTV'
  }
};

$('.input--submit').on('click', instantiatePlayers);

function presentClue(event) {
  let id = event.target.dataset.id;
  let selectedClue = jeopardy.rounds[0].clues[parseInt(id)];
  if (selectedClue.dailyDouble === true) {
    alert('DAILY DOUBLE!\n' + selectedClue.question);
  } else {
    alert(selectedClue.question);
  }
  event.target.innerHTML = '';
  jeopardy.game.cluesRemaining--;
}

function instantiatePlayers(event) {
  event.preventDefault();
  jeopardy.players.push(new Player($('#name-0').val()));
  jeopardy.players.push(new Player($('#name-1').val()));
  jeopardy.players.push(new Player($('#name-2').val()));
  updatePlayersOnDOM();
  this.disabled = true;
  instantiateGame();
}

function updatePlayersOnDOM() {
  jeopardy.players.forEach((player, index) => {
    $(`.h4__player-${index}-name`).text(player.name); 
  });
}

function instantiateGame() {
  jeopardy.game = new Game(1, jeopardy.players[0])
  $('.span--round').text(jeopardy.game.round);
  instantiateClues();
  instantiateRounds();
  $('.main').on('click', presentClue);
}

function instantiateClues() {
  data.clues.forEach(clue => {
    const { question, answer, pointValue, categoryId } = clue;
    jeopardy.clues.push(new Clue(question, answer, pointValue, categoryId));
  });
}

function instantiateRounds() {
  let categories = Object.keys(data.categories);
  randomizeCategories(categories);
  for (let i = 0; i < 2; i++) {
    let roundCategories = categories.splice(0, 4)
    jeopardy.rounds.push(new Round(roundCategories, i + 1));
  }
  jeopardy.rounds.push(new Round([categories[0]], 1));
  configureRounds();
  updateCategoriesOnDOM();
}

function randomizeCategories(cats) {
  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor((Math.random() * (10 - i))) + i;
    [cats[i], cats[randomIndex]] = [cats[randomIndex], cats[i]]
  }
}

function updateCategoriesOnDOM() {
  const currentRound = jeopardy.game.round - 1;
  jeopardy.rounds[currentRound].categories.forEach((category, i) => {
    $(`.article__cat${i}`).text(jeopardy.categoryNames[category]);
  })
}

function configureRounds() {
  jeopardy.rounds.forEach((round, i) => {
    jeopardy.rounds[i].setClues();
    jeopardy.rounds[i].randomizeDailyDoubles();
    jeopardy.rounds[i].setDailyDoubles();
  });
}