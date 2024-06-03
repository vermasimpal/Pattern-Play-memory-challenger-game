let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "blue", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

tsParticles.load("tsparticles", {
   
        particles: {
            number: {
                value: 0, // Initially set to 0, we will change it dynamically
                density: {
                    enable: true,
                    value_area: 800
                }
            },
        color: {
            value: ["#ADD8E6", "#90EE90","FFB6C1", "#FFFE0", "#E6E6FA"]
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.8
        },
        size: {
            value: 6
        },
        move: {
            enable: true,
            speed: 2,
            direction: "bottom",
            outMode: "out"
        }
    },
    interactivity: {
        events: {
            onClick: {
                enable: false
            },
            onHover: {
                enable: false
            }
        }
    },
    retina_detect: true
});



document.addEventListener("keypress", function() {
    if (!started) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function playBtnSound() {
    document.getElementById("BtnSound").play();
}
function playGameOver() {
    document.getElementById("GameOver").play();
}
function playLevelComplete() {
    document.getElementById("LevelComplete").play();
}

function btnFlash(btn) {
    btn.classList.add("flash");
    btn.classList.add("shadow");
    setTimeout(function() {
        btn.classList.remove("shadow");
    }, 300);
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 300);
}
function gameflash(btn) {
    playBtnSound();
    btn.classList.add("shadow");
    setTimeout(function() {
        btn.classList.remove("shadow");
    }, 240);
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
    btn.classList.add("rotate");
    setTimeout(function() {
        
        btn.classList.remove("rotate");
    }, 500); 
}
function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randombtn = document.querySelector(`.${randomColor}`);
    gameseq.push(randomColor);
    btnFlash(randombtn);
    triggerParticles();
}
function shakeBackground() {
    document.body.classList.add("shake");
    setTimeout(() => {
        document.body.classList.remove("shake");
    }, 500);
}
function btnpress() {
    console.log(this);
    let btn = this;
    gameflash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length - 1);
}
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnpress);
}
function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
let highestScore = 0;

function updateHighestScore() {
    if (level > highestScore) {
        highestScore = level;
        displayHighestScore();
        triggerParticles();
    }
}

function displayHighestScore() {
    let highestScoreElement = document.getElementById("highest-score");
    highestScoreElement.innerText = `Highest Score: ${highestScore}`;
}

function triggerParticles() {
    const particles = tsParticles.domItem(0); // Get the particle instance
    if (particles) {
        particles.options.particles.number.value = 100; // Adjust the number of particles
        particles.options.particles.move.enable = true;
        particles.refresh();
    
        setTimeout(() => {
            particles.options.particles.number.value = 0;
            particles.options.particles.move.enable = false;
            particles.refresh();
        }, 2000); // Duration of particle effect
    }
}



function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            function handleSoundEnd() {
                playLevelComplete();
                btnSound.removeEventListener("ended", handleSoundEnd);
            }
            let btnSound = document.getElementById("BtnSound");
            btnSound.addEventListener("ended", handleSoundEnd);
            setTimeout(() => {
                levelUp();
                updateHighestScore();
            }, 1000);
        }
    } else {
        playGameOver();
        shakeBackground();
       
        h2.innerHTML = `Game Over! Your Score Was <b><u>${level}</u></b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
        updateHighestScore();
    }
}

window.onload = function() {
    displayHighestScore();
};
