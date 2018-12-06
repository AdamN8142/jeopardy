const chai = require('chai');
const expect = chai.expect;
const Player = require('../js/Player.js');


describe('Player', function() {
  it('should instantiate Player', function() {
    const player =  new Player('Jeo')
    expect(player.name).to.equal('Jeo')
  })

  it('should be able to update score', function() {
    const player = new Player('Adam')
    player.updateScore(1000)
    expect(player.score).to.equal(1000)
  })
})

