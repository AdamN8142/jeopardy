const chai = require('chai');
const expect = chai.expect;
const Player = require('../js/Player.js');

describe('Player', function() {
  it('should instantiate a new Player', function() {
    const player = new Player('Jeo');
    expect(player.name).to.equal('Jeo');
    expect(player.score).to.equal(0);
    expect(player.isActivePlayer).to.equal(false);
  });

  it('should be able to update its score', function() {
    const player = new Player('Jeo');
    player.updateScore(100);
    expect(player.score).to.equal(100);
  });
});

