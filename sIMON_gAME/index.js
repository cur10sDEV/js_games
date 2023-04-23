// ----------- Variables ------------
userClickedPattern = [];
gamePattern = [];

buttonColours = ["red", "blue", "green", "yellow"];

level = 0;
started = false;
heading = $("#level-title");


$(document).keypress(function () {

	if (!started) {
		nextSequence();
		heading.text(`Level ${level}`);
		started = true;
	}
});




$(".buttons").click(function(e){
	
	userChosenColour = e.currentTarget.id;
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length-1);

});

// NextSequence
function nextSequence() {

	level++;

	randomNumber = Math.floor(Math.random()*4);

	let randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	heading.text(`Level ${level}`);

	selectedButton = $(`#${randomChosenColour}`);
	selectedButton.fadeIn(100).fadeOut(100).fadeIn(100);

	// Audio Department
	playSound(randomChosenColour);
}


// play sounds when user clicks and animate clicked button
function playSound(name) {
	let sound = new Audio(`sounds/${name}.mp3`);
	sound.play();
}

function animatePress(currentColour) {
	$(`#${currentColour}`).addClass("pressed");
	setTimeout(() => $(`#${currentColour}`).removeClass("pressed"), 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
      	setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
    	playSound("wrong");
      	$("body").addClass("game-over");
      	heading.text("Game Over, Press Any Key to Restart");

      	setTimeout(function () {
        $("body").removeClass("game-over");
    	}, 200);

      	startOver();
    }
}






