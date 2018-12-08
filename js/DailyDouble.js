class DailyDouble extends Clue {
  constructor(question, answer, pointValue, category) {
    super(question, answer, pointValue, category, true);
  }

  setPointValue(userWager) {
    this.pointValue = userWager;
  }
}

if (typeof module !== 'undefined') {
  module.exports = DailyDouble;
}