# Poker Solver Lab

一个本地运行的德州扑克学习和练习工具，适合平时刷起手牌范围、动作建议和基础赔率判断。

## 功能

- 6-max / 100BB 预设训练
- 按位置和局面练习起手牌决策
- 范围矩阵查看
- pot odds / outs 练习
- 本地静态页面，启动快

## 启动

```powershell
node server.js
```

然后打开：

`http://127.0.0.1:4173/`

## 文件

- `index.html`: 页面结构
- `styles.css`: 样式
- `app.js`: 训练逻辑
- `server.js`: 本地静态服务器
