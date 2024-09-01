class TitleScene extends GuaScene {
  constructor(game, onLevelComplete) {
    super(game);
    this.onLevelComplete = onLevelComplete; // 添加回调函数
    this.setup();
    this.setInputs();
    this.debugModeEnabled = false;
  }

  setup() {
    let bg = GuaImage.new(this.game, 'bg');
    this.player = Bird.new(this.game, 200, 350); // 调整玩家初始位置
    this.pipes = Pipes.new(this.game);
    this.score = Score.new(this.game);
    this.ground = Ground.new(this.game);
    this.collider = this.pipes.pipes.concat([this.ground]);

    //this.ready = GuaImage.new(this.game, 'ready');
    //this.ready.x = 600;
    //this.ready.y = 300;

    this.addElement(bg);
    this.addElement(this.pipes);
    this.addElement(this.ground);
    this.addElement(this.player);
    //this.addElement(this.ready);
    this.addElement(this.score);

    let self = this;
    this.GameState = {
      'ready': () => {
        self.ground.update();
      },
      'run': self.rungame,
      'over': () => {
        self.player.update();
        // 游戏失败时跳转到指定URL
        window.location.href = '/index.html';  // 替换为目标URL
      },
      'win': () => {
        self.showWinScreen();
      },
    };

    this.gameCurrentState = this.GameState.ready;
  }

  setInputs() {
    let self = this;

    this.game.registerAction('a', function (state) {
      self.player.move(-2, state);
    });

    this.game.registerAction('d', function (state) {
      self.player.move(2, state);
    });

    window.addEventListener('keydown', function (event) {
      if (event.code === 'Space') { // 空格键按下事件
        if (self.gameCurrentState === self.GameState.ready) {
          self.gameCurrentState = self.GameState.run;
          self.delElement(self.ready);
        }

        if (self.gameCurrentState === self.GameState.run) {
          self.player.jump();
        }
      }
    });
  }

  update() {
    this.gameCurrentState && this.gameCurrentState();
  }

  rungame() {
    super.update();

    let pipes = this.pipes.pipes;
    for (let i = 0; i < pipes.length; i += 2) {
      let p = pipes[i];
      if (Math.abs(p.x - this.player.x) <= 1) {
        this.score.addScore();
      }
    }

    // 检查得分是否达到5
    if (this.score.getScore() >= 5) {
      this.changeGameState(this.GameState.over); // 改变游戏状态到 'over'
      window.localStorage.setItem('unlockedLevels', JSON.stringify([1, 2, 3, 4]));
      alert("恭喜，你赢了！游戏结束！");

      // 调用回调函数通知关卡完成
      if (this.onLevelComplete) {
        this.onLevelComplete(true);
      }

      // 重定向到指定页面
      setTimeout(() => {
        window.location.href = "/index.html"; // 替换为你想重定向到的 URL
      }, 1000); // 延迟1秒以确保提示框可以看到
    }
  }

  getCollider(actor, collide, callback) {
    for (let p of this.collider) {
      if (collide(actor, p)) {
        callback();
      }
    }
  }

  changeGameState(state) {
    this.gameCurrentState = state;
  }
}
