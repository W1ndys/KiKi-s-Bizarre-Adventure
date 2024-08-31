class TitleLabel {
  constructor(game, title) {
    this.game = game;
    this.title = title;
    this.setup();
  }

  static new(game, title) {
    return new this(game, title);
  }

  setup() {
    // 默认位置
    this.x = 100;
    this.y = 100;

    // 设置文本样式
    this.font = '30px Arial';
    this.color = 'black';
  }

  draw() {
    let context = this.game.context;
    context.font = this.font;
    context.fillStyle = this.color;
    context.textAlign = 'left'; // 确保文本对齐方式
    context.textBaseline = 'top'; // 确保文本基线对齐方式
    context.fillText(this.title, this.x, this.y);
  }

  update() {
    // 更新逻辑
  }
}
