class Round {
  constructor(categories, dailyDoubleCount) {
    this.categories = categories;
    this.clues = [];
    this.dailyDoubleCount = dailyDoubleCount;
    // this.dailyDoubleLocations = [[i, j], [i2, j2]];
  }

  randomizeDailyDoubles() {
    let col = Math.floor(Math.random() * 4)
    let row = Math.floor(Math.random() * 4)
    this.dailyDoubleLocations.push([col, row])
  }

  setClues() {
    this.categories.forEach((cat, i) => {
      let allClues = data.clues.filter(clue => {
        return clue.categoryId === data.categories[cat];
      });
      for (let j = 1; j < 5; j++) {
        let pointValClues = allClues.filter(clue => {
          return clue.pointValue === 100 * j;
        })
        let randIndex = Math.floor(Math.random() * pointValClues.length);
        this.clues.push(pointValClues[randIndex]);
      }
    })
  }

  findHighestPointValue() {

  }
}