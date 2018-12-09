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
  domUpdates.updateCategoriesOnDOM();
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
  randomizeArray(categories);
  for (let i = 0; i < 2; i++) {
    const roundCategories = categories.splice(0, 4);
    jeopardy.rounds.push(new Round(roundCategories, i + 1));
  }
  jeopardy.rounds.push(new Round([categories[0]], 1));
  configureRounds();
}

function randomizeArray(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    const randomIndex = Math.floor((Math.random() * (arr.length - i))) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
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
  if(jeopardy.cluesRemaining === 0 && jeopardy.roundNumber === 1){
    jeopardy.cluesRemaining = 16;
    jeopardy.roundNumber++
    domUpdates.goToRound2();
  } else if (jeopardy.cluesRemaining === 0 && jeopardy.roundNumber === 2){
    jeopardy.cluesRemaining = 1;
    jeopardy.roundNumber++;
    domUpdates.goToFinalJeopardy();
  }
}


if (typeof module !== 'undefined') {
  module.exports = jeopardy;
}