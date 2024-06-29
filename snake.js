// 获取画布和上下文
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 设置单元格大小和初始位置
const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let dx = gridSize;
let dy = 0;
let foodX, foodY;
let score = 0;
const initialSnakeLength = 5;
const schoolName = "上海商学院";
let snakeLength = initialSnakeLength;

// 生成随机食物位置
function createFood() {
    foodX = gridSize * Math.floor(Math.random() * (canvas.width / gridSize));
    foodY = gridSize * Math.floor(Math.random() * (canvas.height / gridSize));
}

// 绘制贪吃蛇和食物
function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#4CAF50";
    ctx.font = "16px Arial";

    // 绘制蛇的每一节
    for (let i = 0; i < snake.length; i++) {
        ctx.fillText(schoolName[i % schoolName.length], snake[i].x, snake[i].y + gridSize);
    }

    // 绘制食物
    ctx.fillStyle = "#FF5722";
    ctx.fillRect(foodX, foodY, gridSize, gridSize);
}

// 移动蛇
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // 处理边界穿越
    if (head.x >= canvas.width) {
        head.x = 0;
    } else if (head.x < 0) {
        head.x = canvas.width - gridSize;
    }
    if (head.y >= canvas.height) {
        head.y = 0;
    } else if (head.y < 0) {
        head.y = canvas.height - gridSize;
    }

    snake.unshift(head);

    // 如果吃到食物
    if (head.x === foodX && head.y === foodY) {
        score++;
        snakeLength++;
        createFood();
    } else {
        // 移除蛇尾
        snake.pop();
    }
}

// 碰撞检测
function checkCollision() {
    // 撞到自己
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// 游戏结束
function gameOver() {
    clearInterval(gameLoop);
    alert("游戏结束！得分：" + score);
    location.reload(); // 刷新页面重新开始游戏
}

// 控制蛇移动方向
document.addEventListener("keydown", function(event) {
    const keyPressed = event.key;

    if (keyPressed === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -gridSize;
    } else if (keyPressed === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = gridSize;
    } else if (keyPressed === "ArrowLeft" && dx === 0) {
        dx = -gridSize;
        dy = 0;
    } else if (keyPressed === "ArrowRight" && dx === 0) {
        dx = gridSize;
        dy = 0;
    }
});

// 初始化游戏
function initGame() {
    snake = [{ x: 200, y: 200 }];
    dx = gridSize;
    dy = 0;
    score = 0;
    snakeLength = initialSnakeLength;
    createFood();

    // 游戏循环
    gameLoop = setInterval(function() {
        if (checkCollision()) {
            gameOver();
        } else {
            moveSnake();
            drawSnake();
        }
    }, 100);
}

// 开始游戏
initGame();
