var debugControl = function(game, turn) {
  if (turn === false) {
    return;
  }

  window.addEventListener("keydown", function(e) {
    var k = e.key;
    if (k === 'p') {
      window.paused = !window.paused;
    } else if ("123456".includes(k)) {
      // blocks = loadlevel(game, k); // 调用 loadlevel 函数
    }
  });

  var fpsControl = document.querySelector("#fpsControl");

  fpsControl.addEventListener('input', function(e) {
    window.fps = parseInt(fpsControl.value, 10);
  });
};

// 加载指定关卡并生成关卡中的所有方块
var loadlevel = function(game, n) {
  n = n - 1;
  let level = levels[n];
  let blocks = [];
  for (let i = 0; i < level.length; i++) {
    let block = Block(level[i], game); // 确保 Block 函数已定义
    blocks.push(block);
  }
  console.log(blocks);
  return blocks;
};

var blocks = [];

var __main__ = function() {
  var images = {
    bird0: 'img/kiki.png',
    bg: 'img/background.png',
    ground: 'img/ground.png',
    pipe: 'img/pipe.png',

    number0: 'img/number/number0.jpg',
    number1: 'img/number/number1.jpg',
    number2: 'img/number/number2.jpg',
    number3: 'img/number/number3.jpg',
    number4: 'img/number/number4.jpg',
    number5: 'img/number/number5.jpg',
    number6: 'img/number/number6.jpg',
    number7: 'img/number/number7.jpg',
    number8: 'img/number/number8.jpg',
    number9: 'img/number/number9.jpg',

  };

  var game = new GuaGame(60, images, function(g) {
    var scene = new TitleScene(game);
    g.runWithScene(scene);
  });

  debugControl(game, true);
};

__main__();
