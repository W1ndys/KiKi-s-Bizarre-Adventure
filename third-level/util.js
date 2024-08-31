// 选择文档中的元素
var e = sel => document.querySelector(sel);

// 将日志输出到文本区域
var log = function(s) {
  e("#text-log").value += '\n' + s;
};

// 从路径创建图像对象
var imageFromPath = function(path) {
  var img = new Image();
  img.src = path;
  return img;
};

// 判断一个值是否在两个值之间
var aInb = function(a, b1, b2) {
  return a >= b1 && a <= b2;
};

// 检查两个矩形是否相交
var rectIntersects = function(o, b) {
  // 确保 o 和 b 是有效的矩形对象
  if (!o || !b) return false;

  // 判断矩形 o 和 b 是否相交
  if (aInb(o.x, b.x, b.x + b.w) || aInb(b.x, o.x, o.x + o.w)) {
    if (aInb(o.y, b.y, b.y + b.h) || aInb(b.y, o.y, o.y + o.h)) {
      return true;
    }
  }
  return false;
};

// 生成范围内的随机整数
var randomAtoB = function(a, b) {
  return Math.floor(Math.random() * (b - a)) + a;
};
