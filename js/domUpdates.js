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
      if (selectedClue.dailyDouble === true) {
        
        alert('DAILY DOUBLE!\n' + selectedClue.question);
      } else {
        alert(selectedClue.question);
      }
      event.target.innerHTML = '';
      jeopardy.game.cluesRemaining--;
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