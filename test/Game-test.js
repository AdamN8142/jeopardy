const chai = require('chai');
const expect = chai.expect;
const Game = require('../js/Game.js');
global.Player = require('../js/Player.js');
global.Round = require('../js/Round.js');
global.data = require('../js/dataset.js');
global.domUpdates = require('../js/domUpdates.js');
const spies = require('chai-spies');
chai.use(spies);

describe('Game', function() {
  var game;
  
  beforeEach(function() {
    game = new Game();
    chai.spy.on(global.domUpdates, [
      'removeStartScreen',
      'updatePlayerNamesOnDOM',
      'updateCategoriesOnDOM',
      'highlightPlayer',
      'goToRound2',
      'goToFinalJeopardy',
    ], () => true);
  });

  afterEach(function() {
    chai.spy.restore(global.domUpdates);
  });
  
  it('should instantiate a new Game', function() {
    expect(game.roundNumber).to.equal(1);
    expect(game.players.length).to.equal(0);
    expect(game.rounds.length).to.equal(0);
    expect(game.allClues.length).to.equal(0);
    expect(game.activePlayerIndex).to.equal(0);
    expect(game.cluesRemaining).to.equal(16);
  });

  it('should be able to start a game', function() {
    game.startGame(['Brittany', 'Pam', 'Robbie']);
    expect(domUpdates.highlightPlayer).to.have.been.called(1);
    expect(domUpdates.removeStartScreen).to.have.been.called(1);
    expect(domUpdates.updatePlayerNamesOnDOM).to.have.been.called(1);
    expect(domUpdates.updateCategoriesOnDOM).to.have.been.called(1);
  });

  it('should be able to add players', function() {
    const player = new Player('Adam');
    game.addPlayer(player);
  });

  it('should be able to change the active player', function() {
    const player1 = new Player('Adam');
    const player2 = new Player('Adam');
    game.addPlayer(player1);
    game.addPlayer(player2);
    game.activePlayer = game.players[0];
    game.changeActivePlayer();
    expect(game.activePlayerIndex).to.equal(1);
  });
});