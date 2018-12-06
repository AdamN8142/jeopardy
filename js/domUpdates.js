const players = [];
const clues = [];
const rounds = [];
let game;

$('.input--submit').on('click', createPlayers);
$('.main').on('click', presentClue);

function presentClue(event) {
  console.log(event.target)
  let colRow = event.target.dataset.colrow;
  console.log(colRow);
  let selectedClue = rounds[0].clues[parseInt(colRow)];
  console.log(selectedClue)
  alert(selectedClue.question);
}

function createPlayers(event) {
  event.preventDefault();
  players.push(new Player($('#name-0').val()));
  players.push(new Player($('#name-1').val()));
  players.push(new Player($('#name-2').val()));
  updatePlayersOnDOM();
  startGame();
}

function updatePlayersOnDOM() {
  players.forEach((player, index) => {
    $(`.h4__player-${index}-name`).text(player.name); 
  });
}

function startGame() {
  game = new Game(1, players[0])
  $('.span--round').text(game.round);
  getClues();
  makeRounds();
}

function getClues() {
  data.clues.forEach(clue => {
    const { question, answer, pointValue, categoryId } = clue;
    clues.push(new Clue(question, answer, pointValue, categoryId));
  });
}

function makeRounds() {
  const cats = Object.keys(data.categories);
  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor((Math.random() * (10 - i))) + i;
    [cats[i], cats[randomIndex]] = [cats[randomIndex], cats[i]]
  }
  for (let i = 0; i < 2; i++) {
    let roundCats = cats.splice(0, 4)
    rounds.push(new Round(roundCats, i + 1));
    rounds[i].setClues();
  }
}

