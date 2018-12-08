const chai = require('chai');
const expect = chai.expect;
const Round = require('../js/Round.js');

describe('Round', function() {
  it('should instantiate a new Round', function() {
    const round = new Round([], 1);
    expect(round.categories).to.deep.equal([]);
    expect(round.clues).to.deep.equal([]);
    expect(round.dailyDoubleCount).to.equal(1);
  });
});