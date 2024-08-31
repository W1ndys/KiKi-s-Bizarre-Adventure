class Score {
  constructor(game) {
    this.numberSet = {
      0: game.textureByName('number0'),
      1: game.textureByName('number1'),
      2: game.textureByName('number2'),
      3: game.textureByName('number3'),
      4: game.textureByName('number4'),
      5: game.textureByName('number5'),
      6: game.textureByName('number6'),
      7: game.textureByName('number7'),
      8: game.textureByName('number8'),
      9: game.textureByName('number9'),
    };

    this.score = 0;
    this.textures = [this.numberSet[0]];
    this.game = game;
    this.x = 20;  // Adjusted for better placement
    this.y = 20;  // Adjusted for better placement
  }

  static new(game) {
    return new this(game);
  }

  update() {
    // Update logic if needed
  }

  addScore() {
    this.score += 1;

    let s = this.score;
    let last = this.textures.length - 1;

    while (s > 0) {
      if (last >= 0) {
        this.textures[last] = this.numberSet[s % 10];
        last -= 1;
      } else {
        this.textures.unshift(this.numberSet[s % 10]);
      }

      s = Math.floor(s / 10);
    }
  }

  getScore() {
    return this.score; // 获取当前得分
  }

  draw() {
    const numberWidth = 24; // Width of each number texture
    for (let i = 0; i < this.textures.length; i++) {
      this.game.context.drawImage(this.textures[i], this.x + i * numberWidth, this.y);
    }
  }
}
