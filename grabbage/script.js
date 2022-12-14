// Canvas Setup
let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 1250;
cnv.height = 850;

// Global Variables
spaceIsPressed = false;
let mouseIsPressed = false;
let handImg = document.createElement("img");
handImg.src = "images/hand2.png";
let mouseX, mouseY, mouseW, mouseH;
let block;
let platform;
let confetti;
let onPlatform = false;
let confettiArray = [];
let gameState = "game";
let cornerText = "Place the block onto the yellow platform.";
let randColor;
objects();
// Draw
window.addEventListener("load", draw);
function draw() {
    if (gameState === "game") {
        drawGameComponents();
        blockPhysics();
        checkwin()
        console.log(onPlatform);
    }

    requestAnimationFrame(draw);
}

function drawGameComponents() {
    // background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    //floor
    ctx.fillStyle = "black";
    ctx.fillRect(0, 750, cnv.width, 2);
    // cube
    ctx.fillStyle = "cyan";
    ctx.fillRect(block.x, block.y, block.w, block.h);
    // platform
    ctx.fillStyle = "rgb(255, 255, 0)"
    ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
    // instructions
    ctx.fillStyle = "black";
    ctx.font = "30px Times New Roman";
    ctx.fillText(`${cornerText}`, 30, 40);

    // cursor grabbage
    if (mouseIsPressed) {
        document.body.style.cursor = "grabbing";
    } else if (mouseIsPressed === false) {
        document.body.style.cursor = "grab";
    }
}

function blockPhysics() {
    // block grabbability
    if (mouseX >= block.x - 15 && mouseY >= block.y - 15 && mouseX <= block.x + block.w + 15 && mouseY <= block.y + block.h + 15 && mouseIsPressed) {
        block.x = mouseX - 15;
        block.y = mouseY - 15;
    }
    // block gravity
    if (block.y + block.h <= 750) {
        block.y += 8.5;
    }
    // block floor collision
    if (block.y + block.h > 750) {
        block.y = 750 - block.h;
    }

}

function checkwin() {
    // block on platform check
    if (block.y + block.h > platform.y && block.x + block.w > platform.x && block.x < platform.x + platform.w) {
        block.y = platform.y - block.h;
        onPlatform = true;
    } else {
        onPlatform = false;
        cornerText = "Place the block onto the yellow platform.";
        confettiArray = [];
    }

    if (onPlatform) {
        cornerText = "YOU WIN!!!!!!! VERY COOL!!!!!!";
       confettifunc();
    }
}

function confettifunc() {
    let randNum = RanDec(0, 9);
        
        if (randNum === 0) {
            randColor = '#ff1100';
        } else if (randNum === 1) {
            randColor = '#ff9d00';
        } else if (randNum === 2) {
            randColor = '#e9f018';
        } else if (randNum === 3) {
            randColor = '#16c20a';
        } else if (randNum === 4) {
            randColor = '#1db8ad';
        } else if (randNum === 5) {
            randColor = '#1d41b8';
        } else if (randNum === 6) {
            randColor = '#601db8';
        } else if (randNum === 7) {
            randColor = '#e413e8';
        } else if (randNum === 8) {
            randColor = '#e8132b';
        } else if (randNum === 9) {
            randColor = '#9c8e13';
        }
confettiArray.push(confetti);
for (let i = 0; i < confettiArray.length; i++) {
    ctx.fillStyle = `${randColor}`;
    ctx.fillRect(Math.random() * 1250, confettiArray[i].y, confettiArray[i].w, confettiArray[i].h);
    confettiArray[i].y += Math.random();
}
}

// reset function
function objects() {
    block = { x: 10, y: 10, w: 30, h: 30 };
    platform = { x: 1100, y: 730, w: 100, h: 20 };
    confetti = { x: Math.random() * 1250, y: 0, w: 20, h: 20};
}

// random number function
function RanDec(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}


// Key Event Functions
document.addEventListener("keyup", keyupHandler);
document.addEventListener("keydown", keydownHandler);

function keydownHandler(event) {
    console.log(event);
    if (event.keyCode === 32) {
        spaceIsPressed = true;
    } else if (event.keyCode === 87) {
        keyWPressed = true;
    } else if (event.keyCode === 65) {
        keyAPressed = true;
    } else if (event.keyCode === 83) {
        keySPressed = true;
    } else if (event.keyCode === 68) {
        keyDPressed = true;
    }
}

function keyupHandler(event) {
    console.log(event);
    if (event.keyCode === 32) {
        spaceIsPressed = false;
    } else if (event.keyCode === 87) {
        keyWPressed = false;
    } else if (event.keyCode === 65) {
        keyAPressed = false;
    } else if (event.keyCode === 83) {
        keySPressed = false;
    } else if (event.keyCode === 68) {
        keyDPressed = false;
    }
}

document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);
document.addEventListener("mousemove", mousemoveHandler);
function mousedownHandler() {
    mouseIsPressed = true;
}

function mouseupHandler() {
    mouseIsPressed = false;
}

function mousemoveHandler(event) {
    let cnvRect = cnv.getBoundingClientRect();
    mouseX = event.x - cnvRect.x;
    mouseY = event.y - cnvRect.y;
    mouseW = event.w - cnvRect.w;
    mouseH = event.h - cnvRect.h;
}