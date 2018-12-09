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
    const maxWager = domUpdates.calculateMaxWager(jeopardy.activePlayer);
    let popUp = $('<section class="section__pop-up"></section>');
       console.log(maxWager)
    popUp.html(`
      <p class="p--question">
        Daily Double! Enter a wager between 5 and ${maxWager}!
        <input type="number" class="input--wager">
        <input type="submit" value="Submit" class="input--submit-wager">
      </p>
    `);
    $('body').prepend(popUp);
    $('.input--submit').disabled = false;
    $('.input--submit-wager').on('click', function() {
      domUpdates.validateWager(maxWager, clue);
    });
  },

  calculateMaxWager(player) {
    const maxPointValue = Math.max(...Array.from($('.article__clue'))
      .map(square => {
        return parseInt(square.textContent);
      })
      .filter(num => {
        return !isNaN(num);
      }));
    return Math.max(player.score, maxPointValue);
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
        <ul class="ul--answer-buttons">
        ${domUpdates.generateAnswerButtons(clue)}
        </ul>
      </p>
    `);
    $('body').prepend(popUp);
    $('.input--submit').on('click', function() {
      domUpdates.showClueFeedback(clue, this);
    });
  },

  generateAnswerButtons(selectedClue) {
    let choices = domUpdates.generateMultipleAnswers(selectedClue);
    choices = choices.map(clue => {
      return `<li><input type="submit" value="${clue.answer}" class="input--submit"></li>`
    }).join('');
    return choices;
  },

  generateMultipleAnswers(selectedClue){
    let choices = [selectedClue];
    const sameCategory = jeopardy.allClues.filter(clue => {
      return clue.categoryId === selectedClue.categoryId && clue.answer !== selectedClue.answer;
    })
    const diffCategory = jeopardy.allClues.filter(clue => {
      return clue.categoryId !== selectedClue.categoryId;;
    })
    randomizeArray(sameCategory);
    randomizeArray(diffCategory);
    choices.push(... sameCategory.slice(0,4), ...diffCategory.slice(0,3));
    randomizeArray(choices);
    return choices;
  },

  showClueFeedback(clue, button){
    $('.ul--answer-buttons').remove();
    let userAnswer = button.value;
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
      domUpdates.updateScoresOnDOM();
      checkGameState()
    });
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
    jeopardy.players.forEach((player, index) => {
      if  (player.isActivePlayer === true) {
        $(`.section__player-${index}`).addClass('section--highlighted')
      } else {
        $(`.section__player-${index}`).removeClass('section--highlighted')
      };
    })    
  },

  goToRound2() {
    jeopardy.rounds[1].multiplyPoints();
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

  goToFinalJeopardy() {
    let popUp = $('<section class="section__pop-up"></section>');
    let popUpHTML = `
      <h1>Final Jeopardy</h1>
      <p>Category: ${jeopardy.rounds[2].categories[0]}</p>
    `;
    let finalPlayerCount = 0;
    jeopardy.players.forEach((player, index) => {
      if (player.score > 5) {
        popUpHTML += `
          <p>${player.name}, enter a wager between 5 and ${player.score}</p>
          <input type="number" class="input--wager" data-player="${index}">
        `;
        finalPlayerCount++;
      } else {
        popUpHTML += `
          <p>Sorry ${player.name}. You do not have enough points to play Final Jeopardy.</p>
        `;
      }
    });
    popUpHTML += `
      <input type="submit" value="Submit" class="input--submit-all-wagers">
    `;
    popUp.html(popUpHTML);
    $('body').prepend(popUp);
    $('.input--submit-all-wagers').on('click', function() {
      domUpdates.validateFinalWagers(finalPlayerCount);
    });
  },

  validateFinalWagers(finalPlayerCount) {
    const finalPlayers = [];
    for (let i = 0; i < finalPlayerCount; i++) {
      const index = $('.input--wager').eq(i).data().player;
      const player = jeopardy.players[index];
      const wager = parseInt($('.input--wager').eq(i).val());
      if (wager >= 5 && wager <= player.score) {
        player.wager = wager;
        finalPlayers.push(player);
      }
    }
    const validWagerCount = jeopardy.players.filter(player => {
      return (player.wager !== undefined)
    }).length;
    if (finalPlayerCount === validWagerCount) {
      $('.section__pop-up').remove();
      domUpdates.showFinalClue(finalPlayers);
    }
  },
  
  showFinalClue(finalPlayers) {
    const finalClue = jeopardy.rounds[2].clues.find(clue => {
      return clue.dailyDouble === true;
    });
    console.log(finalClue);
    const finalAnswerButtons = domUpdates.generateAnswerButtons(finalClue);
    let popUp = $(`
      <section class="section__pop-up">
        <p class="p--question">
          ${finalClue.question}
        </p>
      </section>`);
    $('body').prepend(popUp);
    finalPlayers.forEach((player, index) => {
      $('.p--question').append(`
        <article class="article--player-choices">
          ${player.name}, choose your answer:
          <ul class="ul--answer-buttons" data-player="${index}">
          ${finalAnswerButtons}
          </ul>
        </article>
      `);
    });
    $('.input--submit').addClass('input--submit-final');
    $('.input--submit').removeClass('input--submit');
    $('.input--submit-final').on('click', function() {
      domUpdates.validateFinalAnswers(finalPlayers, finalClue, this);
    });
  },

  validateFinalAnswers(finalPlayers, finalClue, button) {
    const index = $(button).closest('.ul--answer-buttons').data().player;
    const userAnswer = $(button).val();
    if (finalClue.validateAnswer(userAnswer)) {
      finalPlayers[index].finalScore = finalPlayers[index].score + finalPlayers[index].wager;
    } else {
      finalPlayers[index].finalScore = finalPlayers[index].score - finalPlayers[index].wager
    }
    $(button).closest('.ul--answer-buttons').find('.input--submit-final').prop("disabled",true);
    const finalAnswerCount = finalPlayers.filter(player => {
      return player.finalScore !== undefined;
    }).length;
    if (finalAnswerCount === finalPlayers.length) {
      $('.section__pop-up').remove()
      domUpdates.goToWinnerScreen(finalPlayers);
    }
  },

  goToWinnerScreen(finalPlayers) {
    const highestScore = Math.max(...finalPlayers.map((player) => {
      return player.finalScore;
    }));
    const winner = finalPlayers.find(player => {
      return player.finalScore === highestScore;
    });
    let popUp = $(`<section class="section__pop-up"></section>`);
    popUp.html(`<h1>Congratulations ${winner.name}! You won with a score of ${winner.finalScore}</h1>`);
    $('body').prepend(popUp);
  }
}