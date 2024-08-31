class Pipes {
  constructor(game) {
    this.game = game;
    this.pipes = [];
    this.pipeSpace = 200;
    this.pipeSpeed = 2;
    this.pipeHorizontalSpacing = 200;
    this.columnsOfPipe = 8;

    // 确保初始管道位置适配画布宽度
    for (let i = 0; i < this.columnsOfPipe; i++) {
      let p1 = GuaImage.new(game, "pipe");
      p1.x = this.game.canvas.width + i * this.pipeHorizontalSpacing;
      let p2 = GuaImage.new(game, "pipe");
      p2.flipY = true;
      p2.x = p1.x;
      this.resetPipePosition(p1, p2);
      this.pipes.push(p1);
      this.pipes.push(p2);
    }
  }

  debug() {
    this.pipeSpace = config.pipe_space.value;
    this.pipeHorizontalSpacing = config.pipe_horizontal_spacing.value;
    this.pipeSpeed = config.pipe_speed.value;
  }

  static new(game) {
    return new this(game);
  }

  resetPipePosition(p1, p2) {
    p1.y = randomAtoB(-200, 0);
    p2.y = p1.y + p1.h + this.pipeSpace;
  }

  update() {
    for (let i = 0; i < this.pipes.length / 2; i++) {
      let p1 = this.pipes[i * 2];
      let p2 = this.pipes[i * 2 + 1];

      p1.x -= this.pipeSpeed;
      p2.x -= this.pipeSpeed;

      // 根据画布宽度调整管道重置逻辑
      if (p1.x <= -p1.w) {
        p1.x = this.game.canvas.width + this.pipeHorizontalSpacing;
        p2.x = p1.x;
        this.resetPipePosition(p1, p2);
      }
    }
  }

  draw() {
    let context = this.game.context;

    for (let p of this.pipes) {
      context.save();
      let w2 = p.w / 2;
      let h2 = p.h / 2;
      context.translate(p.x + w2, p.y + h2);
      let scaleX = p.flipX ? -1 : 1;
      let scaleY = p.flipY ? -1 : 1;
      context.scale(scaleX, scaleY);
      context.rotate(p.rotation * Math.PI / 180);
      context.translate(-w2, -h2);
      context.drawImage(p.texture, 0, 0);
      context.restore();
    }
  }
}
