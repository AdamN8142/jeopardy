const Clue = require('../js/Clue.js');

class DailyDouble extends Clue {
  constructor(question, answer, pointValue, category) {
    super(question, answer, pointValue, category, true);
  }

  setPointValue() {
    
  }
}



if (typeof module !== 'undefined') {
  module.exports = DailyDouble;
}