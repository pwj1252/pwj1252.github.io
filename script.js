const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-btn");
const endButton = document.getElementById("end-btn"); // 获取结束按钮
const difficultySelect = document.getElementById("difficulty"); // 获取难度选择
const nightModeButton = document.getElementById("night-mode-toggle"); // 获取夜间模式切换按钮

let score = 0;
let gameInterval;
let balloonInterval;
let floatSpeed = 5; // 默认浮动速度，表示简单难度

// 更新分数
function updateScore() {
    scoreDisplay.textContent = score;
}

// 生成随机位置
function randomPosition() {
    const x = Math.random() * (gameArea.offsetWidth - 50); // 减去气球宽度
    return x;
}

// 设置气球的浮动速度
function setBalloonSpeed() {
    const difficulty = difficultySelect.value;

    if (difficulty === "easy") {
        floatSpeed = 5; // 简单
    } else if (difficulty === "medium") {
        floatSpeed = 3; // 困难
    } else if (difficulty === "hard") {
        floatSpeed = 2; // 地狱
    }
}

// 创建气球
function createBalloon() {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = `${randomPosition()}px`; // 使用反引号修正拼接
    balloon.style.animationDuration = `${floatSpeed + Math.random() * 2}s`; // 使用反引号修正拼接

    // 点击气球得分
    balloon.addEventListener("click", () => {
        score++;
        updateScore();
        balloon.remove(); // 移除被点击的气球
    });

    // 当气球离开视图时自动移除
    balloon.addEventListener("animationend", () => {
        balloon.remove();
    });

    gameArea.appendChild(balloon);
}

// 开始游戏
function startGame() {
    score = 0;
    updateScore();
    startButton.style.display = "none"; // 隐藏开始按钮
    endButton.style.display = "inline-block"; // 显示结束按钮

    // 设置游戏难度
    setBalloonSpeed();

    // 开始生成气球
    balloonInterval = setInterval(createBalloon, 1000);

    // 游戏定时结束（30秒）
    gameInterval = setTimeout(() => {
        endGame(); // 自动结束游戏
    }, 30000);
}

// 结束游戏
function endGame() {
    // 停止气球生成
    clearInterval(balloonInterval); // 停止生成气球
    clearTimeout(gameInterval); // 清除定时器

    // 隐藏所有气球
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach(balloon => {
        balloon.remove(); // 移除所有气球
    });

    // 显示游戏结束信息
    alert(`游戏结束！您的得分是：${score}`); // 使用模板字符串修正

    // 重置按钮显示
    startButton.style.display = "inline-block"; // 显示开始按钮
    endButton.style.display = "none"; // 隐藏结束按钮
}

// 切换夜间模式
nightModeButton.addEventListener("click", () => {
    document.body.classList.toggle("night-mode");
});

// 点击开始按钮启动游戏
startButton.addEventListener("click", () => {
    startGame();
});

// 点击结束按钮停止游戏
endButton.addEventListener("click", () => {
    endGame();
});
