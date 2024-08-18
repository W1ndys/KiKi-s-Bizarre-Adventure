import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { BackGround } from "./backGround.js";
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./enemies.js";
import { UI } from "./UI.js";

// 添加事件监听
window.addEventListener("load", function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 900;
    canvas.height = 500;

    let currentScreen = "startScreen";
    let selectedCharacter = "kiki";
    let unlockedLevels = [1];
    //let gameInProgress = false;
    let target = 10;

    const screens = [
        "startScreen",
        "characterSelect",
        "levelSelect",
        "story",
        "levelDescriptionPage",
        "storyPage1",
        "storyPage2",
        "storyPage3",
        "storyPage4",
        "storyPage5",
        "level_1_DescriptionPage",
        "level_2_DescriptionPage",
        "level_3_DescriptionPage",
        "level_4_DescriptionPage",
        "level_5_DescriptionPage",
        "continuestory",
        "continuelevelDescriptionPage",
    ];

    // 隐藏所有屏幕的函数
    function hideAllScreens() {
        screens.forEach((screen) => {
            document.getElementById(screen).style.display = "none";
        });
    }

    // 初始化时隐藏所有页面，显示启动页面
    hideAllScreens();
    document.getElementById("startScreen").style.display = "block";

    // 开始按钮事件
    document.getElementById("startButton").addEventListener("click", () => {
        hideAllScreens();
        document.getElementById("characterSelect").style.display = "block";
        currentScreen = "characterSelect";
    });

    // 角色选择按钮事件
    document.querySelectorAll(".character").forEach((button) => {
        button.addEventListener("click", (e) => {
            selectedCharacter = e.currentTarget.getAttribute("data-character");
            hideAllScreens();
            document.getElementById("levelSelect").style.display = "block";
            currentScreen = "levelSelect";
        });
    });

    // 关卡选择按钮事件
    let level = 0;

    document.querySelectorAll(".levelButton").forEach((button) => {
        button.addEventListener("click", (e) => {
            level = parseInt(e.currentTarget.getAttribute("data-level"));
            if (unlockedLevels.includes(level)) {
                hideAllScreens();
                switch (level) {
                    case 1:
                        showStoryPage(level);
                        break;
                    case 2:
                        showStoryPage(level);
                        break;
                    case 3:
                        showStoryPage(level);
                        break;
                    case 4:
                        showStoryPage(level);
                        break;
                    case 5:
                        showStoryPage(level);
                        break;
                }
            }
        });
    });

    // 显示剧情页面
    function showStoryPage(level) {
        hideAllScreens();
        let string = "storyPage" + level;
        document.getElementById(string).style.display = "block";
        document.getElementById("story").style.display = "block";
        document.getElementById("continuestory").style.display = "block";
    }

    // 剧情页面的继续按钮
    document.getElementById("continuestory").addEventListener("click", () => {
        hideAllScreens();
        showLevelDescriptionPage(level);
    });

    // 显示关卡说明页面
    function showLevelDescriptionPage(level) {
        hideAllScreens();
        const string = "level_" + level + "_DescriptionPage";
        document.getElementById(string).style.display = "block";
        document.getElementById("levelDescriptionPage").style.display = "block";
        document.getElementById("continuelevelDescriptionPage").style.display =
            "block";
    }

    // 关卡说明页面的继续按钮
    document
        .getElementById("continuelevelDescriptionPage")
        .addEventListener("click", () => {
            hideAllScreens();
            startGame(level);
        });

    // 启动游戏函数
    function startGame(level) {
        const game = new Game(canvas.width, canvas.height, level);
        let lastTime = 0;
        //gameInProgress = true;

        function animate(timeStamp) {
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.update(deltaTime);
            game.draw(ctx);
            if (game.score >= target) {
                handleGameOver(true);
                target = target + 5;
            }
            else {
                if (!game.gameOver) {
                    requestAnimationFrame(animate);
                } else {
                    handleGameOver(false);
                    // gameInProgress = false;
                }

            }
        }
        animate(0);
    }

    // 处理游戏结束函数
    function handleGameOver(passed) {
        //if (gameInProgress) {
        if (passed) {
            if (!unlockedLevels.includes(level + 1)) {
                unlockedLevels.push(level + 1);
            }
            hideAllScreens();
            document.getElementById("levelSelect").style.display = "block";
            currentScreen = "levelSelect";
        } else {
            const retry = confirm("未达到过关条件，是否重新开始？");
            if (retry) {
                hideAllScreens();
                startGame(level);
            } else {
                hideAllScreens();
                document.getElementById("levelSelect").style.display = "block";
                currentScreen = "levelSelect";
            }
            //}
            //gameInProgress = false;
        }
    }

    class Game {
        constructor(width, height, level) {
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new BackGround(this,level);
            this.player = new Player(this, selectedCharacter);
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.maxParticles = 50;
            this.enemyInterval = 1000;
            this.enemyTimer = 0;
            this.debug = false;
            this.score = 0;
            this.fontColor = "black";
            this.time = 0;
            this.maxTime = 60000;
            this.gameOver = false;
            this.lives = 1;
            this.winningScore = 40;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltaTime) {
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach((enemy) => enemy.update(deltaTime));
            this.floatingMessages.forEach((message) => message.update());
            this.particles.forEach((particle, index) => particle.update());
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }
            this.collisions.forEach((collision, index) =>
                collision.update(deltaTime)
            );
            this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
            this.particles = this.particles.filter(
                (particle) => !particle.markedForDeletion
            );
            this.collisions = this.collisions.filter(
                (collision) => !collision.markedForDeletion
            );
            this.floatingMessages = this.floatingMessages.filter(
                (message) => !message.markedForDeletion
            );
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach((enemy) => enemy.draw(context));
            this.particles.forEach((particle) => particle.draw(context));
            this.collisions.forEach((collision) => collision.draw(context));
            this.floatingMessages.forEach((message) => message.draw(context));
            this.ui.draw(context);
        }
        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.5)
                this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }
});
