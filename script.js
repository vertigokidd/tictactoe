function Game(){
  this.squares = [];
  this.turn = 'X'
  this.over = false;
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
  for(var i=0; i<3;i=i+2) {
    
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
  

  $('td').click(function(){
    if (game.over != true) {
      var cellId = $(this).data('id');
      game.squares[cellId].letter = game.turn;
      game.fillBoard();
      game.changeLetter();
      console.log(game);
      game.checkRows();
      game.checkCols();
      game.checkDiags();
      game.checkFullness();
    }
  });  
  
});