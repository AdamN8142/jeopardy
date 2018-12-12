const chai = require('chai');
const expect = chai.expect;
global.Clue = require('../js/Clue.js');
const DailyDouble = require('../js/DailyDouble.js');

describe('DailyDouble', function() {
  it('should instantiate a new DailyDouble', function() {
    const dailyDouble = new DailyDouble('q', 'a', 100, 1);
    expect(dailyDouble.question).to.equal('q');
    expect(dailyDouble.answer).to.equal('a');
    expect(dailyDouble.pointValue).to.equal(100);
    expect(dailyDouble.categoryId).to.equal(1);
    expect(dailyDouble.dailyDouble).to.equal(true);
  });

  it('should be able to set its point value', function() {
    const dailyDouble = new DailyDouble('q', 'a', 100, 1);
    dailyDouble.setPointValue(1000);
    expect(dailyDouble.pointValue).to.equal(1000);
  })
});


