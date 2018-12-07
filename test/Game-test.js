const chai = require('chai');
const expect = chai.expect;
const Game = require('../js/Game.js');

describe('Game', function() {
  it('should instantiate new Game', function() {
    const game =  new Game(1, {});
    expect(game.round).to.equal(1);
    expect(game.activePlayer).to.deep.equal({});
    expect(game.cluesRemaining).to.equal(16);
  });
});