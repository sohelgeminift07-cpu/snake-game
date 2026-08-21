const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const gameOverEl = document.getElementById('game-over');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restartBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gameLoop;

highScoreEl.textContent = highScore;

function drawGame() {
  clearCanvas();
  drawSnake();
  drawFood();
  moveSnake();

  if (checkCollision()) {
    endGame();
    return;
  }

  if (snake[0].x === food.x && snake[0].y === food.y) {
    score += 10;
    scoreEl.textContent = score;
    growSnake();
    placeFood();
  }
}

function clearCanvas() {
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // subtle grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  for (let i = 0; i < tileCount; i++) {
    ctx.beginPath();
    ctx.moveTo(i * gridSize, 0);
    ctx.lineTo(i * gridSize, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * gridSize);
    ctx.lineTo(canvas.width, i * gridSize);
    ctx.stroke();
  }
}

function drawSnake() {
  snake.forEach((segment, index) => {
    if (index === 0) {
      // Head
      const gradient = ctx.createLinearGradient(
        segment.x * gridSize,
        segment.y * gridSize,
        (segment.x + 1) * gridSize,
        (segment.y + 1) * gridSize
      );
      gradient.addColorStop(0, '#00f260');
      gradient.addColorStop(1, '#0575e6');
      ctx.fillStyle = gradient;
    } else {
      // Body
      ctx.fillStyle = `rgba(0, 242, 96, ${0.9 - index * 0.02})`;
    }

    ctx.fillRect(
      segment.x * gridSize + 1,
      segment.y * gridSize + 1,
      gridSize - 2,
      gridSize - 2
    );

    // rounded corners effect
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(
      segment.x * gridSize + 1,
      segment.y * gridSize + 1,
      gridSize - 2,
      gridSize - 2
    );
  });
}

function drawFood() {
  const pulse = Math.sin(Date.now() / 200) * 2 + 2;
  ctx.fillStyle = '#ff4d4d';
  ctx.beginPath();
  ctx.arc(
    food.x * gridSize + gridSize / 2,
    food.y * gridSize + gridSize / 2,
    gridSize / 2 - 2 + pulse / 4,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // glow
  ctx.shadowColor = '#ff4d4d';
  ctx.shadowBlur = 15;
  ctx.fill();
  ctx.shadowBlur = 0;
}

function moveSnake() {
  if (dx === 0 && dy === 0) return;

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Only remove tail if we didn't just eat
  if (!(head.x === food.x && head.y === food.y)) {
    snake.pop();
  }
}

function growSnake() {
  // Tail is already kept because we didn't pop in moveSnake when eating
}

function placeFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } while (snake.some(seg => seg.x === newFood.x && seg.y === newFood.y));

  food = newFood;
}

function checkCollision() {
  const head = snake[0];

  // Wall collision
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    return true;
  }

  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

function endGame() {
  gameRunning = false;
  clearInterval(gameLoop);

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('snakeHighScore', highScore);
    highScoreEl.textContent = highScore;
  }

  finalScoreEl.textContent = score;
  gameOverEl.classList.remove('hidden');
}

function startGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 0;
  dy = 0;
  score = 0;
  scoreEl.textContent = score;
  placeFood();
  gameOverEl.classList.add('hidden');
  gameRunning = true;

  if (gameLoop) clearInterval(gameLoop);
  gameLoop = setInterval(drawGame, 100);
}

function changeDirection(e) {
  if (!gameRunning && (e.key.startsWith('Arrow') || ['w','a','s','d','W','A','S','D'].includes(e.key))) {
    startGame();
  }

  const LEFT = ['ArrowLeft', 'a', 'A'];
  const RIGHT = ['ArrowRight', 'd', 'D'];
  const UP = ['ArrowUp', 'w', 'W'];
  const DOWN = ['ArrowDown', 's', 'S'];

  if (LEFT.includes(e.key) && dx !== 1) {
    dx = -1; dy = 0;
  } else if (RIGHT.includes(e.key) && dx !== -1) {
    dx = 1; dy = 0;
  } else if (UP.includes(e.key) && dy !== 1) {
    dx = 0; dy = -1;
  } else if (DOWN.includes(e.key) && dy !== -1) {
    dx = 0; dy = 1;
  }
}

// Event listeners
document.addEventListener('keydown', changeDirection);
restartBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', startGame);

// Initial draw
clearCanvas();
drawSnake();
drawFood();
