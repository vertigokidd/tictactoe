function Game(){
  this.squares = [];
  this.turn = 'X'
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

function Square(id){
  this.id = id;
  this.letter;
}

$(document).ready(function(){
  var game = new Game();
  
  $('td').each(function(){
    var square = new Square($(this).data('id'));
    game.squares.push(square);
  });

  console.log(game);
  
  var count = 0;
  $('td').click(function(){
    // count += 1;
    // if(count % 2 === 0) {
    //   $(this).html('X');
    // }
    // else {
    //   $(this).html('O');
    // }
    var cellId = $(this).data('id');
    console.log(cellId);
    game.squares[cellId].letter = game.turn;
    console.log(game);
    game.fillBoard();
    game.changeLetter();
  })
});