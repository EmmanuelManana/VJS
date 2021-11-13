const grid = document.querySelector(".grid");
var currentShooterPos = 245;
const screenWidth = 15;
var enemyMovingRight = true;
var direction = 1; // initially moves to the right;

const addingTiles = () => {
  for (let i = 0; i < 255; i++) {
    const square = document.createElement("div");
    // square.value = i;
    // square.innerHTML = i;
    grid.appendChild(square);
  }
};

addingTiles();

// an array of divs
const squares = Array.from(document.querySelectorAll(".grid div"));

// initial positions of the enemy
const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

// test
// const alienInvaders = [
//     0, 1, 2, 3, 4, 5
// ]

const drawEnemies = () => {
  for (let i = 0; i < alienInvaders.length; i++) {
    const targetDiv = squares[alienInvaders[i]];
    targetDiv.classList.add("enemy");
    // targetDiv.innerHTML = 'e'
  }
};

const removeEnemies = () => {
  for (let i = 0; i < alienInvaders.length; i++) {
    const targetDiv = squares[alienInvaders[i]];
    targetDiv.classList.remove("enemy");
    // targetDiv.innerHTML = 'e'
  }
};

const drawShooter = () => {
  squares[currentShooterPos].classList.add("shooter");
};

const draw = () => {
  drawEnemies();
  drawShooter();
};

draw();

const moveShooter = (e) => {
  squares[currentShooterPos].classList.remove("shooter");
  if (e.keyCode === 39) {
    if (currentShooterPos % screenWidth <= 13) {
      console.log(
        "currentShooterPos % screenWidth :",
        currentShooterPos % screenWidth
      );
      currentShooterPos++;
    }
  } else if (e.keyCode === 37) {
    if (currentShooterPos % screenWidth >= 1) {
      console.log(
        "currentShooterPos % screenWidth :",
        currentShooterPos % screenWidth
      );
      currentShooterPos--;
    }
  }
  squares[currentShooterPos].classList.add("shooter");
};

// move the shooter
document.addEventListener("keydown", moveShooter);

const moveEnemies = () => {
  const leftEdge  = alienInvaders[0] % screenWidth === 0;
  const rightEdge = alienInvaders[alienInvaders.length - 1] % screenWidth === screenWidth - 1;
  console.log("rightEdge :", rightEdge);
  removeEnemies();

  if (rightEdge && enemyMovingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += screenWidth + 1;
      enemyMovingRight = false;
      direction = -1;
    }
  }

  if (leftEdge && !enemyMovingRight){
    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += screenWidth - 1;
        enemyMovingRight = true;
        direction = 1;
      }
  }

  // move every enemy to the right.
  for (let i = 0; i < alienInvaders.length; i++) {
    // move in this direction
    alienInvaders[i] += direction;
  }

  drawEnemies();
};
// game loop
setInterval(moveEnemies, 600);
