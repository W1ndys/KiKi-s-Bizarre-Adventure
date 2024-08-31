const config = {
  pipe_space: {
    _comment: '魔柱垂直方向间距',
    value: 250,  // 增加魔柱间距以适应更大的画布
    min: 0,
    max: 400,   // 增加最大值以适应更宽画布
  },
  '魔柱横向间距': {
    _comment: '魔柱横向间距',
    value: 350,  // 增加横向间距以适应更大的画布
    min: 0,
    max: 500,   // 增加最大值以适应更宽画布
  },
  bird_speed: {
    _comment: 'kiki速度',
    value: 40,   // 调整速度以适应更大的画布和可能的游戏速度调整
    min: 0,
    max: 80,    // 增加最大值以适应更大的画布范围
  },
  pipe_speed: {
    _comment: '魔柱速度',
    value: 10,   // 调整魔柱速度以适应更大的画布和更宽的游戏范围
    min: 0,
    max: 15,    // 增加最大值以适应更大的画布范围
  },
};
