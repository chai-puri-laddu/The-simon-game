let highest = 0;
let level = 0;
let gameSeq = [];
let userSeq = [];
let btns = ["red", "pink", "green", "yellow"];
let bd = document.querySelector("body");
let header = document.querySelector("h2");
let started = false;

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("The game is finally started");
        started = true;
        levelUp();
    }
});

function check(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            highest = Math.max(highest, level); // ✅ correct highest logic
            setTimeout(levelUp, 1000);
        }
    } else {
        console.log("Game over");
        header.innerText = `Game over. Wrong sequence. 
Press any key to start over.
Your score was ${level-1}. Highest score: ${highest}`;
        bd.classList.add("wrong");
        setTimeout(() => {
            bd.classList.remove("wrong");
        }, 150);
        reset();
    }
}

function levelUp() {
    userSeq = [];
    level++;
    header.innerText = `Level ${level}`;
    let random = Math.floor(Math.random() * 4); // ✅ use 4 not 3
    let randomColor = btns[random];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    flash(randomBtn);
}

function flash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    check(userSeq.length - 1);
}

let allBtns = document.querySelectorAll('.box');
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = false;
}
