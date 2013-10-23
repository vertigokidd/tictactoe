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


});


  // it("should be able to play a Song", function() {
  //   player.play(song);
  //   expect(player.currentlyPlayingSong).toEqual(song);

  //   //demonstrates use of custom matcher
  //   expect(player).toBePlaying(song);
  // });

  // describe("when song has been paused", function() {
  //   beforeEach(function() {
  //     player.play(song);
  //     player.pause();
  //   });

  //   it("should indicate that the song is currently paused", function() {
  //     expect(player.isPlaying).toBeFalsy();

  //     // demonstrates use of 'not' with a custom matcher
  //     expect(player).not.toBePlaying(song);
  //   });

  //   it("should be possible to resume", function() {
  //     player.resume();
  //     expect(player.isPlaying).toBeTruthy();
  //     expect(player.currentlyPlayingSong).toEqual(song);
  //   });
  // });

  // // demonstrates use of spies to intercept and test method calls
  // it("tells the current song if the user has made it a favorite", function() {
  //   spyOn(song, 'persistFavoriteStatus');

  //   player.play(song);
  //   player.makeFavorite();

  //   expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  // });

  // //demonstrates use of expected exceptions
  // describe("#resume", function() {
  //   it("should throw an exception if song is already playing", function() {
  //     player.play(song);

  //     expect(function() {
  //       player.resume();
  //     }).toThrow("song is already playing");
  //   });
  // });
// });