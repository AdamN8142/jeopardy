const domUpdates = {
  removeStartScreen() {
    $('.body--hidden').removeClass('body--hidden');
    $('.section__start-screen').remove();
  },

  presentClue(event) {
    if (event.target.innerHTML !== '') {
      jeopardy.cluesRemaining--;
      const roundIndex = jeopardy.roundNumber - 1
      const id = event.target.id;
      const selectedClue = jeopardy.rounds[roundIndex].clues[parseInt(id)];
      console.log(selectedClue)
      if (selectedClue.dailyDouble === true) {
        domUpdates.showWagerScreen(selectedClue);
      } else {
        domUpdates.showClueScreen(selectedClue);
      }
      event.target.innerHTML = '';
    }
  },

  showWagerScreen(clue) {
    // figure out the max wager the player is allowed
    const maxPointValue = Math.max(...Array.from($('.article__clue'))
      .map(square => {
        return parseInt(square.textContent);
      })
      .filter(num => {
        return !isNaN(num);
      }))
    const maxWager = Math.max(jeopardy.activePlayer.score, maxPointValue);
    // have an input box 
       let popUp = $('<section class="section__pop-up"></section>');
       console.log(maxWager)
    popUp.html(`
      <p class="p--question">
        Enter a wager between 5 and ${maxWager}!
        <input type="number" class="input--wager">
        <input type="submit" value="Submit" class="input--submit-wager">
      </p>
    `);
    $('body').prepend(popUp);
    $('.input--submit').disabled = false;
    $('.input--submit-wager').on('click', function() {
      domUpdates.validateWager(maxWager, clue);
    });
  
    // change the pointValue of the dailydouble to their wager
  },

  validateWager(maxWager, clue){
    if($('.input--wager').val() >= 5 && $('.input--wager').val() <= maxWager){
      const userWager = parseInt($('.input--wager').val())
      clue.setPointValue(userWager);
      $('.section__pop-up').remove();
      domUpdates.showClueScreen(clue);
    }
  },

  showClueScreen(clue) {
    let popUp = $('<section class="section__pop-up"></section>');
    popUp.html(`
      <p class="p--question">
        ${clue.question}
        <input type="text" class="input--answer">
        <input type="submit" value="Submit" class="input--submit">
      </p>
    `);
    $('body').prepend(popUp);
    $('.input--submit').on('click', function() {
      domUpdates.showClueFeedback(clue);
    });
  },

  showClueFeedback(clue){
    let userAnswer = $('.input--answer').val()
    let feedback;
    if (clue.validateAnswer(userAnswer)) {
      jeopardy.activePlayer.score += clue.pointValue;
      feedback = $('<p class="p--feedback">Correct</p>')
    } else {
      jeopardy.activePlayer.score -= clue.pointValue;
      feedback = $('<p class="p--feedback">NOPE</p>')
      jeopardy.changeActivePlayer();
    }
    $('.p--question').append(feedback);
    $('.p--question').append($('<button class="button--exit">Go back to main screen</button>'))
    $('.button--exit').on('click', function() {
      $('.section__pop-up').remove();
    });
    checkGameState()
    domUpdates.updateScoresOnDOM();
  },

  updatePlayerNamesOnDOM() {
    jeopardy.players.forEach((player, index) => {
      $(`.h4__player-${index}-name`).text(player.name); 
    });
  },

  updateRoundNumberOnDOM() {
    $('.span--round').text(jeopardy.roundNumber);
  },

  updateCategoriesOnDOM() {
    const currentRound = jeopardy.roundNumber - 1;
    jeopardy.rounds[currentRound].categories.forEach((category, i) => {
      $(`.article__cat${i}`).text(category);
    });
  },

  updateScoresOnDOM() {
    jeopardy.players.forEach((player, index) => {
      $(`.span__player-${index}-score`).text(player.score); 
    });   
  },

  highlightPlayer(player) {
    jeopardy.players.forEach((player, i) => {
      if  (player.isActivePlayer === true) {
        $(`.section__player-${i}`).addClass('section--highlighted')
      } else {
        $(`.section__player-${i}`).removeClass('section--highlighted')
      };
    })    
  },

  goToRound2() {
    domUpdates.updateCategoriesOnDOM();
    domUpdates.updateRoundNumberOnDOM()
    $('.article__clue').each(function(index) {
      if (index < 4) {
        $(this).text(200);
      } else if (index < 8) {
        $(this).text(400);
      } else if (index < 12) {
        $(this).text(600);
      } else {
        $(this).text(800);
      }
    });
  },

  goToFinalJeopardy(){
    // make new (3) pop up screen
    //Each screen has to display category
    //Each has an input box 
    //Change active player as we go through screens
    //Give new property (.wager), and assign it to their wager amount 
  }




//







}