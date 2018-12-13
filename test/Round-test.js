const chai = require('chai');
const expect = chai.expect;
const Round = require('../js/Round.js');
const Game = require('../js/Game.js');
const Clue = require('../js/Clue.js');
global.DailyDouble = require('../js/DailyDouble.js');
global.data = require('../js/dataset.js');
global.domUpdates = require('../js/domUpdates.js');

describe('Round', function() {
  var round;

  beforeEach(function() {
    round = new Round([
      'unitedStatesHistory',
      'lifeSciences',
      'publicHealth',
      'educationJargon'
    ], 1);
    const game = new Game();
    data.clues.forEach(clue => {
      const { question, answer, pointValue, categoryId } = clue;
      game.allClues.push(new Clue(question, answer, pointValue, categoryId));
    });
    round.setClues(game);
  })

  it('should instantiate a new Round', function() {
    const round = new Round([], 1);
    expect(round.categories).to.deep.equal([]);
    expect(round.clues).to.deep.equal([]);
    expect(round.dailyDoubleCount).to.equal(1);
  });

  it('should be able to set clues', function() {
    expect(round.clues.length).to.equal(16);
  });

  it('should be able to set category names', function() {
    round.setCategoryNames();
    expect(round.categories[0]).to.equal('United States History');
  });

  it('should be able to multiply points', function() {
    round.multiplyPoints();
    expect(round.clues[0].pointValue).to.equal(200);
  });

  it('should be able to randomize daily doubles', function() {
    round.randomizeDailyDoubles();
    const dailyDouble = round.clues.filter(clue => {
      return clue.dailyDouble;
    });
    expect(dailyDouble.length).to.equal(1);
  });
});