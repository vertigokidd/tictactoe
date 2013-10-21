


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
  

function Square(id){
  this.id = id;
  this.letter;
}

$(document).ready(function(){
  var game = new Game();
  
  // Initialize game's squares array with table elements
  $('td').each(function(){
    var square = new Square($(this).data('id'));
    game.squares.push(square);
  });
  
  // Listen for click on table cell
  $('td').click(function(){
    if ($(this).html() === '' && game.over != true) {
      var cellId = $(this).data('id');
      game.squares[cellId].letter = game.turn;
      game.playRound();
      console.log(game);
    }
  });  
  
});