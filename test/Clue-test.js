const chai = require('chai');
const expect = chai.expect;
const Clue = require('../js/Clue.js');

describe('Clue', function() {
  it('should instantiate a new clue', function() {
    const clue = new Clue('q', 'a', 100, 1)
    expect(clue.question).to.equal('q')
    expect(clue.answer).to.equal('a')
    expect(clue.pointValue).to.equal(100)
    expect(clue.categoryId).to.equal(1)
    expect(clue.dailyDouble).to.equal(false)
  })
});