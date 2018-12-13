const jeopardy = new Game();

$('.input--submit').on('click', (event) => {
  event.preventDefault()
  const playersNames = [
    $('#name-0').val(),
    $('#name-1').val(),
    $('#name-2').val()
  ];
  jeopardy.startGame(playersNames);
});

$('.main--clue-squares').on('click', domUpdates.presentClue);