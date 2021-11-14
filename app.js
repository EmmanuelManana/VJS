"use strict"
const grid = document.querySelector(".grid");
const score = document.querySelector('.score')
let currentShooterPos = 245;
const screenWidth = 15;
let enemyMovingRight = true;
let direction = 1; // initially moves to the right;
let enemiesLoop;
let enemies = [];
let counter = 0;



let resultsDisplay = document.querySelector('.results')


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

    if (!enemies.includes(i)) {
      const targetDiv = squares[alienInvaders[i]];
      targetDiv.classList.add("enemy");
      // targetDiv.innerHTML = 'e'
    }

  }
};

drawEnemies();

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

drawShooter()


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
  const leftEdge = alienInvaders[0] % screenWidth === 0;
  const rightEdge = alienInvaders[alienInvaders.length - 1] % screenWidth === screenWidth - 1;
  removeEnemies();

  if (rightEdge && enemyMovingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += screenWidth + 1;
      direction = -1;
      enemyMovingRight = false;
    }
  }

  if (leftEdge && !enemyMovingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += screenWidth - 1;
      direction = 1;
      enemyMovingRight = true;
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    // move in this direction
    alienInvaders[i] += direction;
  }

  drawEnemies()

  // console.log(squares[currentShooterPos].classList.contains('enemy', 'shooter'))
  if (squares[currentShooterPos].classList.contains('enemy')) {

    resultsDisplay.innerHTML = 'GAME OVER'
    clearInterval(enemiesLoop)
  }
  if (enemies.length === alienInvaders.length){
    resultsDisplay.innerHTML = "You win";
    clearInterval(enemiesLoop)
  }
};


// game loop
enemiesLoop = setInterval(moveEnemies, 500);

const shoot = (e) => {
  let laserLoop;
  let currentLaserPos = currentShooterPos;


  const moveLaser = () => {
    squares[currentLaserPos].classList.remove('laser')
    currentLaserPos -= screenWidth;
    squares[currentLaserPos].classList.add('laser')

    if (squares[currentLaserPos].classList.contains('enemy')) {
      squares[currentLaserPos].classList.remove('enemy')
      squares[currentLaserPos].classList.remove('laser')

      // TODO: add explosion on collision.
    
      clearInterval(laserLoop)
      let removedEnemy = alienInvaders.indexOf(currentLaserPos)
      enemies.push(removedEnemy)
      counter++;
      console.log("enemies shot: ", enemies)
    }

  }
  score.innerHTML = counter;

 
  switch (e.key) {
    case 'ArrowUp':
      laserLoop = setInterval(moveLaser, 100)
  }

}

document.addEventListener('keydown', shoot)
