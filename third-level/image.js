class GuaImage {
  constructor(game, name) {
    this.game = game;
    this.texture = game.textureByName(name);
    this.x = 0;
    this.y = 0;
    this.w = this.texture.width;
    this.h = this.texture.height;
  }

  static new(game, name) {
    var i = new this(game, name);
    return i;
  }

  draw() {
    // 确保图像不会超出画布边界
    const canvasWidth = this.game.canvas.width;
    const canvasHeight = this.game.canvas.height;

    // 确保图像的 x 和 y 不超出画布边界
    const x = Math.max(0, Math.min(this.x, canvasWidth - this.w));
    const y = Math.max(0, Math.min(this.y, canvasHeight - this.h));

    // 创建一个新的对象，传递正确的 x 和 y
    const adjustedImage = {
      ...this,
      x: x,
      y: y
    };

    this.game.drawImage(adjustedImage);
  }

  update() {
    // 这里可以添加图像的更新逻辑
  }
}
