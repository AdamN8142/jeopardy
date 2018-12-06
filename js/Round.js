class Round {
  constructor(categories, dDCount) {
    this.categories = categories;
    this.clues = [];
    this.dDCount = dDCount;
    this.dDLocations = [];
  }

  randomizeDailyDoubles() {
    for (let i = 0; i < this.dDCount; i++) {
      const index = Math.floor(Math.random() * this.clues.length);
      this.dDLocations.push(index);
    }
    if (this.dDCount === 2 && this.dDLocations[0] === this.dDLocations[1]) {
      while (this.dDLocations[0] === this.dDLocations[1]) {
        const index = Math.floor(Math.random() * this.clues.length);
        this.dDLocations[1] = index;
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

  setDailyDoubles() {
    for (let i = 0; i < this.dDCount; i++) {
      const index = this.dDLocations[i]
      const { question, answer, pointValue, categoryId } = this.clues[index];
      const dD = new DailyDouble(question, answer, pointValue, categoryId);
      this.clues.splice(index, 1, dD);
    }
  }

  findHighestPointValue() {

  }
}


if (typeof module !== 'undefined') {
  module.exports = Round;
}