class Clue {
  constructor(question, answer, pointValue, categoryId, dailyDouble = false) {
    this.question = question;
    this.answer = answer;
    this.pointValue = pointValue;
    this.categoryId = categoryId;
    this.dailyDouble = dailyDouble;
  }

  validateAnswer(userAnswer) {
    if (userAnswer === this.answer) {
      return true;
    } else {
      return false; 
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = Clue;
}