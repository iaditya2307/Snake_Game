let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
//height n width ka kaam karega for each cell
let cellSize = 50;
let boardHeight = 600;
let boardWidth = 1000;
// 2d array to store the starting point of snake ka rectangle
let snakeCells = [[0, 0]];
let direction = "right";
let gameOver = false; // wall se touch hone ke baad ho jae true

let foodCells = generateFood(); //bcz we need two values x and y
let score = 0;

// baar baar repeat
let intervalId = setInterval(() => {
  update();
  draw();
}, 150);

// keydown event is triggered
document.addEventListener("keydown", function (event) {
  if (event.key == "ArrowDown") {
    direction = "down";
  } else if (event.key == "ArrowUp") {
    direction = "up";
  } else if (event.key == "ArrowLeft") {
    direction = "left";
  } else {
    direction = "right";
  }
});

// function to draw snake
function draw() {
  if (gameOver === true) {
    // clearInterval accepts intervalId which is returned by setInterval Function
ctx.fillStyle='red';
ctx.font='50px monospace';
ctx.fillText('GAME OVER',360,300);

    clearInterval(intervalId);
    return;
  }
  ctx.clearRect(0, 0, boardWidth, boardHeight);
  for (let cell of snakeCells) {
    ctx.fillStyle = "red";
    ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
    ctx.strokeStyle = "orange";
    ctx.strokeRect(cell[0], cell[1], cellSize, cellSize);
  }
  // draw food
  ctx.fillStyle = "green";
  ctx.fillRect(foodCells[0], foodCells[1], cellSize, cellSize);

  // draw score
  ctx.font='24px monospace'
  ctx.fillText(`Score: ${score}`,20,25)
}

// function to updatesnake
function update() {
  let headX = snakeCells[snakeCells.length - 1][0];
  let headY = snakeCells[snakeCells.length - 1][1];

  let newHeadX;
  let newHeadY;

  if (direction === "right") {
    newHeadX = headX + cellSize;
    newHeadY = headY;
    if (newHeadX === boardWidth ||khagayakhudko(newHeadX,newHeadY)) {
      gameOver = true;
    }
  } else if (direction === "left") {
    newHeadX = headX - cellSize;
    newHeadY = headY;
    if (newHeadX < 0 ||khagayakhudko(newHeadX,newHeadY)) {
      gameOver = true;
    }
  } else if (direction === "up") {
    newHeadX = headX;
    newHeadY = headY - cellSize;
    if (newHeadY < 0 ||khagayakhudko(newHeadX,newHeadY)) {
      gameOver = true;
    }
  } else {
    newHeadX = headX;
    newHeadY = headY + cellSize; 
    if (newHeadY === boardHeight  || khagayakhudko(newHeadX,newHeadY)) {
      gameOver = true;
    }
  }

  snakeCells.push([newHeadX, newHeadY]);

  if (newHeadX === foodCells[0] && newHeadY === foodCells[1]) {
    foodCells = generateFood();
    score += 1;
  } else {
    snakeCells.shift();
  }
}

function generateFood() {
  return [
    Math.round((Math.random() * (boardWidth - cellSize)) / cellSize) * cellSize,
    Math.round((Math.random() * (boardHeight - cellSize)) / cellSize) *
      cellSize,
  ];
}


function khagayakhudko(newHeadX,newHeadY){
  for(let item of snakeCells){
    if(item[0]=== newHeadX && item[1]===newHeadY){
      return true;
    }

  }
  return false;

}