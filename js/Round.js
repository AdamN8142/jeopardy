class Round {
  constructor(categories, dailyDoubleCount) {
    this.categories = categories;
    this.clues = [];
    this.dailyDoubleCount = dailyDoubleCount;
  }

  randomizeDailyDoubles() {
    for (let i = 0; i < this.dailyDoubleCount; i++) {
      let index = Math.floor(Math.random() * this.clues.length);
      if (i === 0) {
        const { question, answer, pointValue, categoryId } = this.clues[index];
        this.clues[index] = new DailyDouble(question, answer, pointValue, categoryId);
      } else {
        while (this.clues[index].dailyDouble === true) {
          index = Math.floor(Math.random() * this.clues.length);
        }
        const { question, answer, pointValue, categoryId } = this.clues[index];
        this.clues[index] = new DailyDouble(question, answer, pointValue, categoryId);
      }
    }
  }

  setClues() {
    this.categories.forEach(category => {
      const categoryClues = jeopardy.clues.filter(clue => {
        return clue.categoryId === data.categories[category];
      });
      for (let i = 1; i < 5; i++) {
        const pointValueClues = categoryClues.filter(clue => {
          return clue.pointValue === 100 * i;
        });
        const randomIndex = Math.floor(Math.random() * pointValueClues.length);
        this.clues.push(pointValueClues[randomIndex]);
      }
    });
  }

  findHighestPointValue() {

  }
}

if (typeof module !== 'undefined') {
  module.exports = Round;
}