const domUpdates = {
  removeStartScreen() {
    $('.body--hidden').removeClass('body--hidden');
    $('.section__start-screen').remove();
  },

  presentClue(event) {
    const target = $(event.target);
    if (target.is('.article__clue') && target.html() !== '') {
      jeopardy.cluesRemaining--;
      const roundIndex = jeopardy.roundNumber - 1;
      const id = target[0].id;
      const selectedClue = jeopardy.rounds[roundIndex].clues[parseInt(id)];
      console.log(selectedClue);
      if (selectedClue.dailyDouble === true) {
        domUpdates.showWagerScreen(selectedClue);
      } else {
        domUpdates.showClueScreen(selectedClue);
      }
      target.html('');
    }
  },

  showWagerScreen(clue) {
    const maxWager = domUpdates.calculateMaxWager(jeopardy.activePlayer);
    const html = `
      <p class="p--wager-prompt">
        Daily Double! Enter a wager between 5 and ${maxWager}!
      </p>
      <input type="number" class="input--wager">
      <input type="submit" value="Submit"
        class="input--submit input--submit-wager">
    `;
    domUpdates.createPopUp(html);
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

  validateWager(maxWager, clue) {
    if ($('.input--wager').val() >= 5 && $('.input--wager').val() <= maxWager) {
      const userWager = parseInt($('.input--wager').val())
      clue.setPointValue(userWager);
      $('.section__pop-up').remove();
      $('.article__clue').removeClass('body--hidden');
      domUpdates.showClueScreen(clue);
    }
  },

  showClueScreen(clue) {
    const html = `
      <p class="p--question">
        ${clue.question}
        <ul class="ul--answer-buttons">
          ${domUpdates.generateAnswerButtons(clue)}
        </ul>
      </p>
    `;
    domUpdates.createPopUp(html);
    $('.input--submit').on('click', function() {
      domUpdates.showClueFeedback(clue, this);
    });
  },

  generateAnswerButtons(selectedClue) {
    let choices = domUpdates.generateMultipleAnswers(selectedClue);
    choices = choices.map(clue => {
      return `
        <li class="li">
          <input type="submit" value="${clue.answer}"
            class="input--submit input--submit-answers">
        </li>
      `;
    }).join('');
    return choices;
  },

  generateMultipleAnswers(selectedClue) {
    let choices = [selectedClue];
    const sameCategory = jeopardy.allClues.filter(clue => {
      return (clue.categoryId === selectedClue.categoryId
        && clue.answer !== selectedClue.answer);
    });
    const diffCategory = jeopardy.allClues.filter(clue => {
      return clue.categoryId !== selectedClue.categoryId;
    });
    randomizeArray(sameCategory);
    randomizeArray(diffCategory);
    if (sameCategory.length > 8) {
      choices.push(...sameCategory.slice(0, 7));
    } else {
      choices.push(...sameCategory.slice(0, 4), ...diffCategory.slice(0, 3));
    }
    randomizeArray(choices);
    return choices;
  },

  showClueFeedback(clue, button) {
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
    $('.p--question').append(
      $('<button class="button--exit">Go back to main screen</button>')
    );
    $('.button--exit').on('click', function() {
      $('.section__pop-up').remove();
      $('.article__clue').removeClass('body--hidden');
      domUpdates.updateScoresOnDOM();
      checkGameState();
    });
  },

  updatePlayerNamesOnDOM() {
    jeopardy.players.forEach((player, index) => {
      $(`.h4__player-${index}-name`).text(player.name); 
    });
  },

  updateRoundNumberOnDOM() {
    const adjective = jeopardy.roundNumber < 3 ? 'DOUBLE' : 'FINAL';
    $('.span--round-descriptor').text(adjective);
  },

  updateCategoriesOnDOM() {
    const currentRound = jeopardy.roundNumber - 1;
    jeopardy.rounds[currentRound].categories.forEach((category, i) => {
      $(`.span__cat${i}`).html(category);
    });
  },

  updateScoresOnDOM() {
    jeopardy.players.forEach((player, index) => {
      $(`.span__player-${index}-score`).text(player.score); 
    });   
  },

  highlightPlayer() {
    jeopardy.players.forEach((player, index) => {
      if  (player.isActivePlayer === true) {
        $(`.section__player-${index}`).addClass('section--highlighted');
      } else {
        $(`.section__player-${index}`).removeClass('section--highlighted');
      }
    })    
  },

  goToRound2() {
    jeopardy.rounds[1].multiplyPoints();
    domUpdates.updateCategoriesOnDOM();
    domUpdates.updateRoundNumberOnDOM();
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
    domUpdates.updateRoundNumberOnDOM();
    domUpdates.showFinalCategory();
    let html = '';
    let finalPlayerCount = 0;
    jeopardy.players.forEach((player, index) => {
      if (player.score > 5) {
        html += `
          <p class="p--final-wager-prompt">
            ${player.name}, enter a wager between 5 and ${player.score}
          </p>
          <input type="number"
            class="input--final-wager" data-player="${index}">
        `;
        finalPlayerCount++;
      } else {
        html += `
          <p class="p--final-wager-prompt">
            Sorry ${player.name},
            you do not have enough points to play Final Jeopardy.
          </p>
        `;
      }
    });
    html += `
      <input type="submit" value="Submit"
        class="input--submit input--submit-all-wagers">
    `;
    domUpdates.createPopUp(html);
    $('.input--submit-all-wagers').on('click', function() {
      domUpdates.validateFinalWagers(finalPlayerCount);
    });
  },

  showFinalCategory() {
    $('.main__section').eq(0).addClass('main__section-single-col');
    $('.main__section').eq(0).removeClass('main__section');
    $('.article__header').remove();
    $('.main__section-single-col').append(`
      <article class="article article__cat-final article__header">
      ${jeopardy.rounds[2].categories[0]}
      </article>
    `);
  },

  validateFinalWagers(finalPlayerCount) {
    const finalPlayers = [];
    for (let i = 0; i < finalPlayerCount; i++) {
      const index = $('.input--final-wager').eq(i).data().player;
      const player = jeopardy.players[index];
      const wager = parseInt($('.input--final-wager').eq(i).val());
      if (wager >= 5 && wager <= player.score) {
        player.wager = wager;
        $('.input--final-wager').eq(i).prop("disabled", true);
        finalPlayers.push(player);
      }
    }
    const validWagerCount = jeopardy.players.filter(player => {
      return (player.wager !== undefined)
    }).length;
    if (finalPlayerCount === validWagerCount) {
      $('.section__pop-up').remove();
      $('.article__clue').removeClass('body--hidden');
      domUpdates.showFinalClue(finalPlayers);
    }
  },
  
  showFinalClue(finalPlayers) {
    const finalClue = jeopardy.rounds[2].clues.find(clue => {
      return clue.dailyDouble === true;
    });
    console.log(finalClue);
    const finalAnswerButtons = domUpdates.generateAnswerButtons(finalClue);
    const html = `
      <p class="p--question">
       ${finalClue.question}
      </p>
      <article class="article--final-choices"></article>
    `;
    domUpdates.createPopUp(html);
    finalPlayers.forEach((player, index) => {
      $('.article--final-choices').append(`
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
      finalPlayers[index].score += finalPlayers[index].wager;
      finalPlayers[index].finishedPlaying = true;
    } else {
      finalPlayers[index].score -= finalPlayers[index].wager;
      finalPlayers[index].finishedPlaying = true;
    }
    $(button).closest('.ul--answer-buttons')
      .find('.input--submit-final').prop("disabled", true);
    const finalAnswerCount = jeopardy.players.filter(player => {
      return player.finishedPlaying === true;
    }).length;
    if (finalAnswerCount === finalPlayers.length) {
      $('.section__pop-up').remove();
      $('.article__clue').removeClass('body--hidden');
      domUpdates.goToWinnerScreen(finalPlayers);
    }
  },

  goToWinnerScreen(finalPlayers) {
    domUpdates.updateScoresOnDOM();
    const highestScore = Math.max(...finalPlayers.map((player) => {
      return player.score;
    }));
    const winner = finalPlayers.find(player => {
      return player.score === highestScore;
    });
    const html = `
      <h1>Congratulations ${winner.name}!
        You won with a score of ${winner.score}
      </h1>
    `;
    domUpdates.createPopUp(html);
  },

  createPopUp(text) {
    const popUp = $('<section class="section__pop-up"></section>');
    popUp.html(text);
    $('.main--clue-squares').prepend(popUp);
    $('.article__clue').addClass('body--hidden');
  }
}