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

  describe("Row Checking", function() {

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

  describe("Col Checking", function() {

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

  describe("Diag Checking", function() {

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

});

describe("Computer", function() {

  beforeEach(function() {
    resetGame();
    computer.moved = false;
  });

  it("should have an attribute called moved that is false", function() {
    expect(computer.moved).toEqual(false);
  });

  it("should click td with appropriate index when fillSquare is called", function() {
    computer.fillSquare(0);
    expect($('td').first().html()).toEqual('X');
  });

  it("should call analyzeCenter when count is 2", function() {
    spyOn(computer, 'analyzeCenter');
    computer.play(game, 2);
    expect(computer.analyzeCenter).toHaveBeenCalled();
  });

  it("should call findEmpty when count is greater than 2", function() {
    spyOn(computer, 'findEmpty');
    computer.play(game, 4);
    expect(computer.findEmpty).toHaveBeenCalled();
  });

  describe("find empty", function() {

    it("should fill in the first empty space it finds", function() {
      computer.findEmpty(game);
      expect(game.squares[0].letter).toEqual('X');
    })

  });

  describe("analyze center", function() {

    it("should call fillSquare with the right index when center is empty", function() {
      spyOn(computer, 'fillSquare')
      computer.analyzeCenter(game);
      expect(computer.fillSquare).toHaveBeenCalledWith(4);
    });

    it("should fill a corner if center square is taken", function() {
      $($('td')[4]).trigger('click');
      expect($('td').first().html()).toEqual('O');
    });

  });

  describe("analyze diagonal", function() {

    it("should call fillSquare with the right index when opponent can win left diag", function() {
      spyOn(computer, 'fillSquare');
      game.squares[0].letter = 'X';
      game.squares[4].letter = 'X';
      computer.analyzeLeftDiag(game, 'X');
      expect(computer.fillSquare).toHaveBeenCalledWith(8);
    });

    it("should call fillSquare with the right index when opponent can win right diag", function() {
      spyOn(computer, 'fillSquare');
      game.squares[2].letter = 'X';
      game.squares[4].letter = 'X';
      computer.analyzeRightDiag(game, 'X');
      expect(computer.fillSquare).toHaveBeenCalledWith(6);
    });

  });

});

describe("Reset", function() {

  beforeEach(function() {
    resetGame();
  });

  it("should reset the play count to 1", function() {
    expect(count).toEqual(1);
  });
  
  it("should reset game over status to false", function() {
    expect(game.over).toEqual(false);
  });

  it("should reset all squares' letter values to null", function() {
    var letters = [];
    for(i=0;i<game.squares.length;i++) {
      letters.push(game.squares[i].letter);
    }
    var letterValues = letters.filter(function(value) { return value === null }).length;
    expect(letterValues).toEqual(9);
  });

  it("should set the current turn to 'X'", function() {
    expect(game.turn).toEqual('X');
  });

  it("should clear the board's td cells", function() {
    var tdEls = [];
    $('td').each(function(i){
      tdEls.push($(this).html());
    });
    var tdValues = tdEls.filter(function(value) { return value != '' }).length;
    expect(tdValues).toEqual(0);
  })

});