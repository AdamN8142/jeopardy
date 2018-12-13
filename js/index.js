const jeopardy = new Game();

$('.input--submit').on('click', jeopardy.startGame);
$('.main--clue-squares').on('click', domUpdates.presentClue);

function randomizeArray(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    const randomIndex = Math.floor((Math.random() * (arr.length - i))) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
}