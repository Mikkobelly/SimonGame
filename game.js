const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;


$("body").keypress(() => {
    if (started == false) {
        setTimeout(nextSequence, 500)
    }
    started = true;
})

$("div[type=button]").on("click", function () {
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})


//Make Sound Func
const playSound = (name) => {
    $("#" + name).on("click", () => {
        const audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    })
}

//Button Animation Func
const animatePress = (currentColour) => {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

const nextSequence = () => {
    userClickedPattern = [];
    level += 1;
    $("#level-title").text("Level " + level);
    const randNum = Math.floor(Math.random() * 3) + 1;
    const randomChosenColour = buttonColours[randNum];
    gamePattern.push(randomChosenColour);
    //Make Flash
    $(`div#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

const checkAnswer = (currentLevel) => {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        // Check if the user finished clicking the sequences ↆↆ
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        const audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200)
        $("#level-title").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}

const startOver = () => {
    started = false;
    level = 0;
    gamePattern = [];
}





