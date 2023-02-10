// alert("Hello World")

// Declare default settings before match
let buttonColors = ['red', 'blue', 'green', 'yellow']
let gamePattern = []
let userPattern = []
let start = false
let level = 0

// Press Any Key To Start
$(document).keydown(function(){
    if (!start) {
        $("#level-title").text(`Level ${level}`)
        nextSequence()
        start = true
    }
})

// When user clicks button, invoke sound+animation+check answer functions
$(".btn").click(function(){
    let userClick = $(this).attr("id")
    userPattern.push(userClick)
    
    playSound(userClick)
    animatePress(userClick)
    
    checkAnswer(userPattern.length-1)
})

// Function to check if game and user inputs are matching, if not, restart game
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {

        if (userPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }
    }

    else {
        playSound("wrong")
        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press Any Key to Restart")

        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200)

        startOver()
    }
}

// Function to pick a random color for the round + calling playSound function
function nextSequence() {
    userPattern = []
    level++
    $("#level-title").text(`Level ${level}`)

    let randomNum = Math.floor(Math.random() * 4)
    let randomColor = buttonColors[randomNum]
    gamePattern.push(randomColor)

    $(`#${randomColor}`).fadeIn(100).fadeOut(100).fadeIn(100)
        
    playSound(randomColor)
}

// Function to play audio
function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`)
    audio.play()
}

// Function to animate click
function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed")
    
    setTimeout(function(){
        $(`#${currentColor}`).removeClass("pressed")
    }, 100)
}

// Created function to restart game
function startOver() {
    level = 0
    gamePattern = []
    start = false
}