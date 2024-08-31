class Ground extends GuaImage {
  constructor(game) {
    super(game, 'ground');
    this.vx = 3;
    // 确保初始位置在画布范围内
    this.x = 0;
    this.y = game.canvas.height - this.h; // 更新为新的画布高度
  }

  update() {
    super.update();
    this.x -= this.vx;

    // 根据画布宽度调整重置逻辑
    if (this.x < -this.w) {
      this.x = this.game.canvas.width;
    }
  }
}
