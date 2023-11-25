var start = false;
var level = 0;
var buttonColors = ["white", "blue", "orange", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];



$(document).keypress(function() {
    
    if (!start) {
        $("#instructionsOrScore").text("Level " + level);
        $("#instructionsOrScore").css("color","greenyellow");
        nextSequence();
        start = true;
    }
    })

$("#frogGroup1 img, #frogGroup2 img").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    console.log(userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel) {
    if (!start) {
        

    } else if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#instructionsOrScore").html("Game Over");
        $("#description").html("");
        
        startOver();


    }

}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#instructionsOrScore").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 5);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    playSequence(gamePattern);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".wav")
    audio.play();
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 200);
}

function startOver() {
    level = 0
    gamePattern = [];
    start = false;
    $("#instructionsOrScore").html("Press Any Key to Start");
    $("#instructionsOrScore").css("color","yellow");    
    $("#description").html("Instructions: Memorize the frog sequence. Click the right frogs in the correct order.");

}

function playSequence(sequence) {
    // Iterate through the sequence and simulate button clicks
    for (var i = 0; i < sequence.length; i++) {
        (function(index) {
            setTimeout(function() {
                $("#" + sequence[index]).addClass("pressed2");
                playSound(sequence[index]);
                setTimeout(function() {
                    $("#" + sequence[index]).removeClass("pressed2");
                }, 200);
            }, 400 * index);
        })(i);
    }
}




