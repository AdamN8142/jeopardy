const domUpdates = {
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