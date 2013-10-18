function Game(){
  this.squares = [];
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
    game.squares[cellId].letter = 'X';
    console.log(game.squares[cellId].letter);
  })
});