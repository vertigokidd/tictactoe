$(document).ready(function(){
  var count = 0;
  $('td').click(function(){
    count += 1;
    if(count % 2 === 0) {
      $(this).html('X');
    }
    else {
      $(this).html('O');
    }
  })
});