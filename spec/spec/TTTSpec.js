describe("Page", function() {
  
  it("should have variable count", function() {
    expect(count).toBeTruthy();
  });

  it("should have variable game", function() {
    expect(game).toBeTruthy();
  });

  it("should have variable computer", function() {
    expect(computer).toBeTruthy();
  });

  it("should have function markBoard", function() {
    expect(markBoard).toBeTruthy();
  });

});

describe("Marking", function() {

  it("should increment count by 1", function() {
    markBoard($('td').first(), game);
    expect(count).toEqual(2);
  });

  it("should call playRound on a game when called", function() {
    spyOn(game, 'playRound');
    markBoard($('td')[1], game);
    expect(game.playRound).toHaveBeenCalled();
  });

});


describe("Game", function() {

  it("should create a new game instance on page load", function() {
    expect(game).toBeTruthy();
  });

  it("should load up the game object with squares", function() {
    expect(game.squares.length).toEqual(9);
  });

  it("should contain an array of square objects", function() {
    expect(typeof game.squares[0]).toEqual('object');
  });

  it("should respond to click on td element", function() {
    $('td').first().trigger('click');
    expect(game.squares[0].letter).toEqual('X');
  });

  it("should change letters between turns", function() {
    game.changeLetter();
    expect(game.turn).toEqual('X');
  })

  it("should call fillBoard when playRound is called", function() {
    spyOn(game, 'fillBoard');
    markBoard($('td')[2], game);
    expect(game.fillBoard).toHaveBeenCalled();
  });

  it("should put a token in the square object when td is clicked", function() {
    expect(game.squares[0].letter).toEqual('X');
  })

  it("should put a token in a square when td is clicked", function() {
    expect($('td').first().html()).toEqual('X');
  });

  it("should keep game over status as false if board is not full", function() {
    game.checkFullness();
    expect(game.over).toEqual(false);
  });

  it("should change game over status to true if board is full", function() {
    for(i=0;i<game.squares.length;i++) {
      game.squares[i].letter = 'X';
    }
    game.checkFullness();
    expect(game.over).toEqual(true);
  });

});

describe("Game Row Checking", function() {

  beforeEach(function() {
    game.squares[3].letter = 'X';
    game.squares[4].letter = 'X';
    game.squares[5].letter = 'X';
  });

  it("should call declare if winning row", function() {
    spyOn(game, 'declare');
    game.checkRows();
    expect(game.declare).toHaveBeenCalled();
  });

  it("should call declare with the winning token for row", function() {
    spyOn(game, 'declare');
    game.checkRows();
    expect(game.declare).toHaveBeenCalledWith('X');
  });

});

describe("Game Col Checking", function() {

  beforeEach(function() {
    game.squares[1].letter = 'O';
    game.squares[4].letter = 'O';
    game.squares[7].letter = 'O';
  });

  it("should call declare if winning column", function() {
    spyOn(game, 'declare');
    game.checkCols();
    expect(game.declare).toHaveBeenCalled();
  });

  it("should call declare with the winning token for column", function() {
    spyOn(game, 'declare');
    game.checkCols();
    expect(game.declare).toHaveBeenCalledWith('O');
  });

});

describe("Game Diag Checking", function() {

  beforeEach(function() {
    game.squares[0].letter = 'X';
    game.squares[4].letter = 'X';
    game.squares[8].letter = 'X';
  });

  it("should call declare if winning diagonal", function() {
    spyOn(game, 'declare');
    game.checkDiags();
    expect(game.declare).toHaveBeenCalled();
  });

  it("should call declare with the winning token for column", function() {
    spyOn(game, 'declare');
    game.checkDiags();
    expect(game.declare).toHaveBeenCalledWith('X');
  });

});

describe("Computer Logic", function() {


});