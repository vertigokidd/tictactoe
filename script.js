// Computer player logic

function Computer(){
  this.moved = false;
}

Computer.prototype.play = function(game, count){
  this.moved = false;
  if (count === 2) {
    this.analyzeCenter(game);
  }
  else {
    this.analyzeLeftDiag(game);
    this.analyzeRightDiag(game);
    this.analyzeRows(game);
    this.analyzeCols(game);
    this.defendCorners(game);
    this.findEmpty(game);
  }  
}

Computer.prototype.fillSquare = function(i){
  if (this.moved === false) {
    var ele = $("td[data-id='" + i + "']");
    $(ele).trigger('click');
  }
}

Computer.prototype.analyzeCenter = function(game){
  if (game.squares[4].letter === null) {
    this.fillSquare(4);
  }
  else {
    this.fillSquare(0);
  }
}

Computer.prototype.analyzeRows = function(game){
  for(var i=0; i<7; i=i+3) {
    var letters = [game.squares[i].letter, game.squares[i+1].letter, game.squares[i+2].letter];
    var xCount = letters.filter(function(value) { return value === 'X' }).length;
    if (xCount === 2) {
      for(var j=i; j<i+3; j++) {
        if (game.squares[j].letter === null) {
          this.fillSquare(j);
          this.moved = true;
          return;
        }
      }
    }
  }
}

Computer.prototype.analyzeCols = function(game){
  for(var i=0; i<3; i++) {
    var letters = [game.squares[i].letter, game.squares[i+3].letter, game.squares[i+6].letter];
    var xCount = letters.filter(function(value) { return value === 'X' }).length;
    if (xCount === 2) {
      for(var j=i; j<i+7; j=j+3) {
        if (game.squares[j].letter === null) {
          this.fillSquare(j);
          this.moved = true;
          return;
        }
      }
    }
  }
}

Computer.prototype.analyzeRightDiag = function(game){
  var letters = [game.squares[2].letter, game.squares[4].letter, game.squares[6].letter];
  var xCount = letters.filter(function(value) { return value === 'X' }).length;
  if (xCount === 2) {
    for(var j=2; j<7; j=j+2) {
      if (game.squares[j].letter === null) {
        this.fillSquare(j);
        this.moved = true;
        return;
      }
    }
  }
}

Computer.prototype.analyzeLeftDiag = function(game){
  var letters = [game.squares[0].letter, game.squares[4].letter, game.squares[8].letter];
  var xCount = letters.filter(function(value) { return value === 'X' }).length;
  if (xCount === 2) {
    for(var j=0; j<9; j=j+4) {
      if (game.squares[j].letter === null) {
        this.fillSquare(j);
        this.moved = true;
        return;
      }
    }
  }
}

Computer.prototype.defendCorners = function(game){
  var corners = [6, 8, 2, 0]
  for (var i=0; i<corners.length; i++) {
    if(game.squares[corners[i]].letter === null) {
      this.fillSquare(corners[i])
      this.moved = true;
      return;
    }
  }
  return;
}

Computer.prototype.findEmpty = function(game) {
  for (var i=0; i<game.squares.length; i++) {
    if(game.squares[i].letter === null) {
      this.fillSquare(i);
      this.moved = true;
      return;
    }
  }
}


// Gameplay mechanics

function Game(){
  this.squares = [];
  this.turn = 'X'
  this.over = false;
}

Game.prototype.playRound = function(){
  this.fillBoard();
  this.changeLetter();
  this.checkRows();
  this.checkCols();
  this.checkDiags();
  this.checkFullness();
}

Game.prototype.fillBoard = function(){
  for(var i=0;i<this.squares.length;i++){
    if(this.squares[i].letter != null){
      var ele = $("td[data-id='" + i +"']");
      $(ele).html(this.squares[i].letter);
    }
  }
}

Game.prototype.changeLetter = function(){
  if(this.turn === 'X'){
    this.turn = 'O';
  }
  else {
    this.turn = 'X';
  }
}

Game.prototype.checkRows = function(){
  for(var i=0; i<7; i=i+3) {
    if (this.squares[i].letter != null &&
        this.squares[i].letter === this.squares[i + 1].letter && 
        this.squares[i + 1].letter === this.squares[i + 2].letter) {
      this.declare(this.squares[i].letter);
    }
  }
}

Game.prototype.checkCols = function(){
  for(var i=0; i<3; i++) {
    if (this.squares[i].letter != null &&
        this.squares[i].letter === this.squares[i + 3].letter && 
        this.squares[i +3].letter === this.squares[i + 6].letter) {
      this.declare(this.squares[i].letter);
    }
  }
}

Game.prototype.checkDiags = function(){
  if (this.squares[0].letter != null &&
      this.squares[0].letter === this.squares[4].letter &&
      this.squares[4].letter === this.squares[8].letter) {
    this.declare(this.squares[0].letter);
  }
  else if (this.squares[2].letter != null &&
           this.squares[2].letter === this.squares[4].letter &&
           this.squares[4].letter === this.squares[6].letter) {
    this.declare(this.squares[2].letter);
  }
}

Game.prototype.checkFullness = function(){
  var empty = true;
  for(var i=0;i<this.squares.length;i++) {
    if (this.squares[i].letter != null) {
      empty = false;
    }
    else {
      empty = true;
      return;
    }
  }
  if (empty === false) {
    this.declare('draw');
  }
}

Game.prototype.declare = function(winner){
  this.over = true;
  if (winner === 'draw') {
    $('.winner p').html('Draw!');
  }
  else {
    $('.winner p').html(winner + ' Wins!');
  }
}
  

// Square object

function Square(id){
  this.id = id;
  this.letter = null;
}


// Document load

var count = 1;

$(document).ready(function(){
  var game = new Game();
  var computer = new Computer();
  
  // Initialize game's squares array with table elements
  $('td').each(function(){
    var square = new Square($(this).data('id'));
    game.squares.push(square);
  });


  // Action for each move
  var markBoard = function(ele, game){
    if ($(ele).html() === '' &&
        $(ele).html() != 'X' &&
        $(ele).html() != 'O' && game.over != true) {
      var cellId = $(ele).data('id');
      game.squares[cellId].letter = game.turn;
      game.playRound();
      count += 1;
    }
  }

  
  // Listen for click on table cell
  $('td').click(function(){
    markBoard(this, game);
    if (count % 2 === 0) {
      computer.play(game, count);
      count += 2;
    }
  });  
  
});