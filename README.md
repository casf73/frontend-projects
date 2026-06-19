# Frontend Projects

记录我的前端学习项目。

## 项目列表

# 1. Text Reveal Animation

## 项目简介

这是一个基于 HTML、CSS 和 JavaScript 实现的文字图片动画效果项目。

页面加载后，中央的大标题会先以“图片填充文字”的形式显示，随后文字逐渐缩小并移动到页面上方，同时背景图片渐渐显示出来，最终标题变成白色并添加阴影效果。

## 项目效果

* 页面初始显示大号文字
* 文字内部显示背景图片纹理
* 文字缩小并移动到页面上方
* 背景图片渐显
* 标题变为白色并添加阴影

## 技术栈

* HTML
* CSS
* JavaScript

## 主要技术点

### 1. 文字背景裁剪

使用 `background-clip: text` 和 `color: transparent`，实现图片填充文字的效果。

### 2. CSS 过渡动画

使用 `transition` 控制文字位置、大小、颜色和背景透明度的变化。

### 3. JavaScript 控制动画状态

通过 `setTimeout()` 延迟执行动画步骤，并使用 `classList.add()` 给元素添加类名，从而触发 CSS 动画。

## 项目结构

```txt
project
├── index.html
├── css
│   └── style.css
├── js
│   └── main.js
└── assets
    └── images
        └── background.jpg
```

## 运行方式

1. 下载或克隆项目到本地
2. 使用 VS Code 打开项目文件夹
3. 使用 Live Server 打开 `index.html`
4. 在浏览器中查看动画效果


## 项目预览

初始状态：
<img src="/TextRevealAnimation/assets/images/初始状态.png">

最终状态:
<img src="/TextRevealAnimation/assets/images/最终状态.png">
---

### 2. Coming Soon...
