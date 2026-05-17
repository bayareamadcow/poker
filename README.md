# Poker Solver Lab

一个本地运行、也能通过 GitHub Pages 直接打开的德州扑克学习和练习工具，适合平时刷起手牌范围、锦标赛随机题、动作建议和基础赔率判断。

## 功能

- 6-max / 8-max 训练切换
- 5BB 到 80BB 锦标赛随机题
- 按位置和局面练习起手牌决策
- 面对开池、3-bet 时显示位置、尺度、底池和跟注量
- 范围矩阵查看
- pot odds / outs 练习
- 网页评论入口，反馈保存在 GitHub
- 本地静态页面，启动快

## 启动

```powershell
node server.js
```

然后打开：

`http://127.0.0.1:4173/`

## Public page

`https://bayareamadcow.github.io/poker/`

## 文件

- `index.html`: 页面结构
- `styles.css`: 样式
- `app.js`: 训练逻辑
- `server.js`: 本地静态服务器
