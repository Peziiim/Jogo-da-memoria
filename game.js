var frm = document.querySelector("html");
var btn = $(".btn");
var sound;
var count = 0
var level = 0
let colorChanger = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = colorChanger[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#".concat(randomChosenColor)).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)


    $("h1").text("Level " + level)
    level++

}


$(document).on("keydown", () => {
    if (count == 0) {
        nextSequence()
        count++
    }
})

btn.on("click", (e) => {
    var userChosenColor = e.target.id
    userClickedPattern.push(userChosenColor)
    console.log(userClickedPattern)

    playSound(userChosenColor)

    animatePress(userChosenColor)
    checkPattern(userClickedPattern.length - 1)
})

function playSound(name) {
    audio = new Audio("./sounds" + "/" + name + ".mp3")
    audio.play()
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")

    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed")
    }, 100)
}

function checkPattern(currentLevel) {
    if (gamePattern[currentLevel] != userClickedPattern[currentLevel]) {
        
        $("body").addClass("game-over")
        $("h1").text("Game Over, Pressione qualquer tecla para recomeçar")
        playSound("wrong")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200)

        startOver()
    } 


    if (gamePattern.length == userClickedPattern.length && count > 0) {
        setTimeout(() => {
            nextSequence()
            userClickedPattern = []
        }, 1000)
    }
}

function startOver() {
    level = 0
    count = 0
    gamePattern = []
    userClickedPattern = []
}
