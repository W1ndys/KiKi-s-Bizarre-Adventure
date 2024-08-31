class GuaScene {
  constructor(game) {
    this.game = game;
    this.elements = [];
    this.debugModeEnabled = false;
  }

  draw() {
    for (let e of this.elements) {
      e.draw();
    }
  }

  update() {
    if (this.debugModeEnabled) {
      for (let e of this.elements) {
        if (e.debug) {
          e.debug();
        }
      }
    }

    for (let e of this.elements) {
      e.update();
    }
  }

  addElement(obj) {
    obj.scene = this;
    this.elements.push(obj);
  }

  delElement(obj) {
    let index = this.elements.indexOf(obj);
    if (index !== -1) {
      this.elements.splice(index, 1);
    }
  }
}
