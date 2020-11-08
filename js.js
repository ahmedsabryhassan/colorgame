var buttons = document.getElementsByTagName("button");
var squares = document.querySelectorAll(".square");
var spans = document.querySelectorAll("span");
var p = document.querySelector("p");
var overlay = document.querySelector(".overlay");
var a = document.querySelector("a");
var colors = generateRandomColors(1);
var notover = true;
var currentMode = "hard";
var rounds = 1;
var heightScore = 1;
var manyWrogs = 0;
var pickedColor;
//The start of the program

//the start of EventListener of the squares
for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click",
        function () {
            if (notover) {
                var clickedColor = this.style.background;
                if (clickedColor === pickedColor) {
                    manyWrogs = 0;
                    p.textContent = "Correct!";
                    rounds++;
                    spans[0].textContent = rounds;
                    if (rounds >= heightScore) {
                        heightScore = rounds;
                        spans[1].textContent = rounds;
                    }
                    if (currentMode == "hard") {
                        statringOver(false);
                    }
                    if (currentMode == "easy") {
                        statringOver(true);
                    }
                } else {
                    this.classList.add("invisible");
                    p.textContent = "Try agian!";
                    manyWrogs++;
                    if (manyWrogs >= 3 && currentMode == "hard") {
                        resetingWrongs();
                    }
                    if (manyWrogs >= 2 && currentMode == "easy") {
                        resetingWrongs();
                    }
                }
            }
        });
}
statringOver(false);

// Start EvenListenter to bottoms
// start over button
buttons[0].addEventListener("click", function () {
    p.textContent = "";
    spans[0].textContent = 1;
    rounds = 1;
    notover = true;
    manyWrogs = 0;
    if (buttons[1].classList.contains("active")) {
        statringOver(true);
    } else {
        statringOver(false);
    }
})
// easy button
buttons[1].addEventListener("click", function () {
    manyWrogs = 0;
    if (notover) {
        if (currentMode != "easy") {
            currentMode = "easy1";
        }
        this.classList.add("active");
        buttons[2].classList.remove("active");
        if (currentMode != "easy") {
            statringOver(true);
            currentMode = "easy";
        }
    }
});
// hard button
buttons[2].addEventListener("click", function () {
    //manyWrogs = 0;
    if (notover) {
        if (currentMode != "hard") {
            currentMode = "hard1";
        }
        this.classList.add("active");
        buttons[1].classList.remove("active");
        if (currentMode != "hard") {
            statringOver(false);
            currentMode = "hard";
        }
    }
});
// play again button
a.addEventListener("click", function () {
    p.textContent = "";
    spans[0].textContent = 1;
    rounds = 1;
    notover = true;
    manyWrogs = 0;
    if (buttons[1].classList.contains("active")) {
        statringOver(true);
    } else {
        statringOver(false);
    }
    overlay.classList.add("invisible");

})
// End EvenListenter to bottoms
//Start Functions
function resetingWrongs() {
    p.textContent = "";
    spans[2].textContent = heightScore;
    overlay.classList.remove("invisible");
    manyWrogs = 0;
    if (rounds > heightScore) {
        spans[1].textContent = rounds;
    }
    notover = false;
}

function generateRandomColors() {
    var arr = [];
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    arr[0] = "rgb(" + r + ", " + g + ", " + b + ")";
    if ((b + 25) >= 255) {
        b = 255;
    } else {
        b += 25;
    }
    arr[1] = "rgb(" + r + ", " + g + ", " + b + ")";
    return arr;
}

function statringOver(checks) {
    colors = generateRandomColors();
    if (checks) {
        pickedColor = colors[1];
        var random = Math.floor(Math.random() * 3);
        for (var i = 0; i < 3; i++) {
            squares[i].classList.remove("invisible");
            squares[i].style.background = colors[0];
        }
        squares[random].style.background = colors[1];
        for (var i = 3; i < 6; i++) {
            squares[i].classList.add("invisible");
        }
    } else {
        pickedColor = colors[1];
        var random = Math.floor(Math.random() * 6);
        for (var i = 0; i < squares.length; i++) {
            squares[i].classList.remove("invisible");
            squares[i].style.background = colors[0];
        }
        squares[random].style.background = colors[1];
    }
}