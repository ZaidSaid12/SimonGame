var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level = 0
$(document).on("keydown",startGame);

function startGame(){
  if (level === 0) {
    nextSequence();
  }
}
$(".btn").on("click",function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  var audio = new Audio("sounds/"+userChosenColor+".mp3");
  animatePress(userChosenColor);
  playSound(audio);
  console.log("user pattern: "+userClickedPattern);
  checkIfCorrect();

});
function nextSequence(){
  $("#level-title").html("level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var audio = new Audio("sounds/"+randomChosenColor+".mp3");
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(audio);
  level+=1;
}

function playSound(audio){
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){ $("#"+currentColor).removeClass("pressed"); }, 100);
}

function checkIfCorrect(){
  console.log("game pattern: "+gamePattern);
  for (var i = 0; i < userClickedPattern.length; i++) {
    if(gamePattern[i] != userClickedPattern[i]){
      wrongSequence();
      return false;
    }
  }
  if(userClickedPattern.length===gamePattern.length){
    console.log(true);
    userClickedPattern=[];
    setTimeout(nextSequence(), 5000);

  }

}

function wrongSequence(){
$("body").addClass("game-over");
var audio = new Audio("sounds/wrong.mp3");
playSound(audio);
setTimeout(function(){$("body").removeClass("game-over");},100);
restartGame();
}

function restartGame(){
  level = 0;
  $("#level-title").html("Game Over, Press Any key To restart");
  userClickedPattern=[];
  gamePattern=[];
  $(document).on("keydown",startGame);
}
