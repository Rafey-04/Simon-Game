var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 1;
var called = false;


$(document).keydown(function() {
    if (called === false) {
        nextSequence();
        called = true;
    }
})

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    $("#"+userChosenColor).addClass("pressed");
    setTimeout(function() {
        $("#"+userChosenColor).removeClass("pressed");
    }, 100);
    checkAnswer(userClickedPattern.length-1)
});

function nextSequence() {
    userClickedPattern = []
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    $("#level-title").text("Level "+level);
    level+=1;
    var chosenColor = buttonColors[randomNumber];
    gamePattern.push(chosenColor);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        } 
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 1;
    gamePattern = [];
    called = false;
}

function playSound(block) {
    var sound = new Audio("sounds/"+block+".mp3");
    sound.play();
}