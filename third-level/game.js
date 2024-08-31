class GuaGame {
  constructor(fps, images, callback) {
    window.fps = fps;
    this.images = images;
    this.callback = callback;
    this.scene = null;
    this.actions = {};
    this.keywords = {};
    this.canvas = document.querySelector("#id-canvas");
    this.context = this.canvas.getContext("2d");

    // 设置画布大小为1200x800
    this.canvas.width = 1200;
    this.canvas.height = 800;

    var self = this;
    window.addEventListener("keydown", function(event) {
      self.keywords[event.key] = "down";
    });

    window.addEventListener("keyup", function(event) {
      self.keywords[event.key] = "up";
    });
    this.init();
  }

  drawImage(obj) {
    // 绘制图像时需要确保图像在画布内
    if (obj.x < 0 || obj.y < 0 || obj.x > this.canvas.width || obj.y > this.canvas.height) {
      return;
    }
    this.context.drawImage(obj.texture, obj.x, obj.y);
  }

  update() {
    if (window.paused == true) {
      return;
    }
    this.scene.update();
  }

  draw() {
    this.scene.draw();
  }

  registerAction(key, callback) {
    this.actions[key] = callback;
  }

  runloop() {
    var g = this;
    var actions = Object.keys(g.actions);
    for (var i = 0; i < actions.length; i++) {
      var key = actions[i];
      let kc = g.keywords[key];
      if (kc == "down") {
        g.actions[key]("down");
      } else if (kc == "up") {
        g.actions[key]("up");
        g.keywords[key] = null;
      }
    }

    g.update();
    g.context.clearRect(0, 0, g.canvas.width, g.canvas.height);
    g.draw();
    setTimeout(function() {
      g.runloop();
    }, 1000 / window.fps);
  }

  init() {
    var g = this;
    var loads = [];

    var names = Object.keys(g.images);
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      let path = g.images[name];
      let img = new Image();
      img.src = path;

      img.onload = function(e) {
        g.images[name] = img;
        loads.push(1);
        if (loads.length == names.length) {
          g._start();
        }
      };
    }
  }

  textureByName(name) {
    var g = this;
    var img = g.images[name];
    return img;
  }

  runWithScene(s) {
    var g = this;
    g.scene = s;
    setTimeout(function() {
      g.runloop();
    }, 1000 / window.fps);
  }

  replaceScene(s) {
    this.scene = s;
  }

  _start() {
    this.callback(this);
  }
}
