const chai = require('chai');
const expect = chai.expect;
const Game = require('../js/Game.js');
global.domUpdates = require('../js/domUpdates.js');

describe('Game', function() {
  it('should instantiate new Game', function() {
    const game =  new Game();
    expect(game.roundNumber).to.equal(1);
    expect(game.players.length).to.equal(0);
    expect(game.rounds.length).to.equal(0);
    expect(game.allClues.length).to.equal(0);
    expect(game.activePlayerIndex).to.equal(0);
    expect(game.cluesRemaining).to.equal(16);
  });
});