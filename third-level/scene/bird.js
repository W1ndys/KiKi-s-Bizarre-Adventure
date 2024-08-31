class Bird extends GuaAnimation {
  constructor(game, x, y) {
    super(game);
    this.x = x;
    this.y = y;
    this.speed = 8;
  }

  static new(game, x, y) {
    return new this(game, x, y);
  }

  update() {
    super.update();
    let scene = this.game.scene;

    // 确保 getCollider 适应新的画布大小
    scene.getCollider(this, rectIntersects, () => {
      scene.changeGameState(scene.GameState.over);
    });

    // 确保 Bird 在画布范围内
    if (this.y > this.game.canvas.height - this.h) {
      this.y = this.game.canvas.height - this.h; // 限制在画布高度范围内
      this.vy = 0;  // 停止下落
    }
  }

  jump() {
    this.rotation = -45;
    this.vy = -this.speed;
  }

  debug() {
    // 确保速度值在合理范围内
    this.speed = config.bird_speed.value;
  }
}
