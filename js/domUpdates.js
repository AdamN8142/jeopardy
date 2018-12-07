const domUpdates = {
  showStartScreen() {
    let startScreen = $('<section class="section__start-screen"></section>');
    startScreen.css({
      'background-color': 'lightblue',
      height: '100vh',
      width: '100%',
      position: 'absolute'
    });
    startScreen.html(`
      <h2 class="h2">THIS IS</h2>
      <h1 class="h1">JEOPARDY</h1>
      <form class="form">
        <label for="name-0" class="label">Player 1</label>
        <input type="text" id="name-0" class="input--name">
        <label for="name-1" class="label">Player 2</label>
        <input type="text" id="name-1" class="input--name">
        <label for="name-2" class="label">Player 3</label>
        <input type="text" id="name-2" class="input--name">
        <input type="submit" value="Start" class="input--submit">
      </form>
    `)
    $('body').prepend(startScreen);
    $('.input--submit').on('click', instantiatePlayers);
  },

  removeStartScreen() {
    $('.section__start-screen').remove();
  },

  presentClue(event) {
    if (event.target.innerHTML !== '') {
      const id = event.target.dataset.id;
      const selectedClue = jeopardy.rounds[0].clues[parseInt(id)];
      console.log(selectedClue)
      if (selectedClue.dailyDouble === true) {
        domUpdates.showPopUp(selectedClue, true);
      } else {
        domUpdates.showPopUp(selectedClue, false);
      }
      event.target.innerHTML = '';
      jeopardy.game.cluesRemaining--;
    }
  },

  showPopUp(clue, isDailyDouble){
    let popUp = $('<section class="section__pop-up"></section>')
    popUp.css({
     'background-color': 'lightblue',
      height: '100vh',
      width: '100%',
      position: 'absolute'
    });
    popUp.html(`
      ${clue.question} ${isDailyDouble}
      <input type="text" class="input--answer">
      <input type="submit" value="Start" class="input--submit">
    `)
    $('body').prepend(popUp)
    $('.input--submit').on('click', function(){
      domUpdates.showClueFeedback(clue)
    })
  },

  showClueFeedback(clue){
    let userAnswer = $('.input--answer').val()
    console.log(clue, 'testing')
    if(clue.validateAnswer(userAnswer)){
      console.log('You got it')
    }else{
      console.log('NOPE')
    }
  },

  updatePlayersOnDOM() {
    $('.body--hidden').removeClass('body--hidden')
    jeopardy.players.forEach((player, index) => {
      $(`.h4__player-${index}-name`).text(player.name); 
    });
  },

  updateCategoriesOnDOM() {
    const currentRound = jeopardy.game.round - 1;
    jeopardy.rounds[currentRound].categories.forEach((category, i) => {
      $(`.article__cat${i}`).text(category);
    });
  }
}