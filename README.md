# Frontend Projects

记录我的前端学习项目。

## 项目列表

# vue3-qzone-clone

## 项目简介

`vue3-qzone-clone` 是一个基于 Vue 3 开发的类 QQ 空间前端练习项目，主要用于学习和实践Vue组件化开发、前端路由管理、状态管理以及浏览器本地存储等技术

项目以社交空间场景为基础，包含注册、登录、个人主页、好友列表、动态发布等页面与功能，模拟了一个简化版社交平台的核心业务流程。开发过程中采用组件化设计思想，通过拆分页面模块提升代码的复用性与可维护性，并结合pinia与localStorage实现用户状态管理和数据持久化存储，但同时受限于个人后端技术的缺失，部分功能还无法实现，后续学习中依旧会完善该项目。

当前项目仍在持续完善中，现阶段重点已经覆盖：

- 用户注册与登录
- 用户头像上传与本地保存
- 当前登录用户信息持久化存储
- 个人主页信息展示
- 动态发布与本地持久化
- 关注状态切换
- 基于Vue Router的页面路由管理
- 基于pinia的状态管理

计划完善：
- 动态评论功能
- 点赞功能
- 动态删除与编辑
- Axios接口请求封装
- 前后端接口联调
- 数据库支持

## 项目效果

当前版本已完成用户注册、登录、个人主页展示、好友列表浏览以及动态发布等核心功能，基本是实现了一个简化版社交空间平台的前端交互流程。

### 1. 用户注册

- 支持输入账号、密码、姓名等基本信息
- 支持上传本地图片作为头像
- 使用 `FileReader.readAsDataURL()` 将头像图片转换为 Base64 字符串
- 注册成功后将用户信息保存到浏览器本地存储

### 2. 用户登录

- 根据本地存储中的用户数据进行登录校验
- 登录成功后同步当前用户状态
- 用户信息同时写入Pinia状态来源于LocalStorage
- 为后续页面提供统一的数据来源

### 3. 个人主页

- 展示用户头像、姓名、关注数等基本信息
- 支持关注 / 取消关注状态切换
- 支持发布个人动态
- 动态内容持久化保存，刷新页面后仍可保留

### 4. 页面导航与路由管理

- 提供首页、好友列表、用户主页、登录页、注册页等导航入口
- 基于Vue Router实现单页面应用路由切换
- 配置404页面处理异常访问路径

### 5. 用户状态管理
- 使用Pinia管理当前登录用户状态
- 使用LocalStorage实现数据持久化存储
- 页面刷新后自动恢复用户信息
- 保证多页面间的数据一致性

### 6. 当前项目状态说明

- 项目主体功能已经搭建完成
- 页面结构、用户数据流和本地存储逻辑基本成型
- 部分功能和细节仍在持续优化中，例如页面权限控制、数据结构统一、页面文案与显示细节等

## 技术栈

本项目基于Vue3生态开发，主要采用以下技术完成页面构建、路由管理以及本地数据持久化

| 技术 | 用途 |
|--------|--------|
| Vue 3 | 前端框架，采用 Composition API 进行组件开发 |
| Vue Router 4 | 实现单页面应用（SPA）路由管理 |
| Pinia | 全局状态管理，维护当前登录用户状态 |
| Bootstrap 5 | 页面布局与响应式设计 |
| HTML5 / CSS3 | 页面结构与样式实现 |
| JavaScript (ES6+) | 业务逻辑开发 |
| LocalStorage | 浏览器本地数据持久化存储 |
| FileReader API | 实现头像图片上传与 Base64 转换 |
| Vue CLI | 项目构建与开发环境管理 |

### 项目涉及的核心知识点

- Vue3 Composition API
- 组件化开发
- Props / Emit 组件通信
- Vue Router 路由管理
- Pinia 状态管理
- 浏览器本地存储（LocalStorage）
- FileReader 图片处理
- Bootstrap 响应式布局
- 单页面应用（SPA）开发模式

---

## 开发过程中遇到的问题及解决方案

### 1. 使用<a>跳转页面，会导致每次跳转页面都会被刷新

#### 问题描述

如果导航部件使用<a>进行网页跳转操作，会导致每次切换都要刷新一次页面

#### 解决方案

可以使用Vue router的<router-link>标签


---

### 2. 怎么存储每个页面的共有信息

#### 问题描述

如果在登录页面保存信息，那所有页面和部件都需要通过登录页面来传递信息，会变得非常的复杂

#### 解决方案

我了解到了pinia，pinia是一个状态管理器，他可以专门用来存放多个部件的共享数据

---

### 3. 如何增加登录验证

#### 问题描述

即使没有登录，也可以查看各个页面，但是页面因为没有数据导致无法正常显示

#### 解决方案

我通过询问ChatGpt，了解了requiresAuth，并且必须配合路由守卫来使用，同时还要增加判断，登录之后，pinia里面就会有用户信息，所以我可以用是否有用户信息来判断是否登录成功

---

### 4. 父组件和子组件之间怎么传递信息

#### 问题描述

我在完成编辑帖子的组件编写后，发现输入的信息，只保存在这个组件中，但又不可能使用pinia来存这个数据，因为只在这一个功能中需要用到这个数据

#### 解决方案

我通过搜索引擎询问“vue中父组件与子组件中怎么传递信息”，得知了props和emit，props是父组件向子组件传递信息用的，子组件需要有一个defineProps函数来实现数据的接受。emit是子组件向父组件传递信息用的，子组件同样通过emit函数来实现数据的传输，并且会传输一个行为，父组件可以通过这个行为来触发函数，实现数据的接受

---

### 5. 注册上传的头像，无法被正常保存

#### 问题描述

注册上传头像的类型，无法被一个变量直接保存下来

#### 解决方案

我通过询问ChatGpt，了解到可以将图片变为字符串的方法，来将图片被保存到变量中，可以使用FileReader的readAsDataURL（）函数，来将图片转化成字符串，同时还要注意涉及到数据的传输与上传的操作，都会有时间延迟，需要使用异步函数，以及向后端申请数据的时候，要用到async和await关键词，来表示异步操作

---

### 6. 由于个人后端知识的欠缺，无法实现数据库和后端api的搭建

#### 问题描述

没有数据库和后端api，导致数据无法被保存，即使注册了，也不能完成登录和后续的操作

#### 解决方案

我想到了localStorage，我可以先把数据存到localStorage里面，当成一个小的数据库。当然这在实际并不可取，后续后端知识学习后，这一块会再次被完善

---


## 项目结构

项目主要目录结构如下：

```txt
vue3-qzone-clone
├─ public
├─ src
│  ├─ assets
│  │  └─ icon.jpg
│  ├─ components
│  │  ├─ ContentBar.vue
│  │  ├─ NavBar.vue
│  │  ├─ UserProfile_info.vue
│  │  ├─ UserProfile_posts.vue
│  │  └─ UserProfile_write.vue
│  ├─ router
│  │  └─ index.js
│  ├─ store
│  │  └─ user.js
│  ├─ views
│  │  ├─ HomeView.vue
│  │  ├─ LoginView.vue
│  │  ├─ NotFound.vue
│  │  ├─ RegisterView.vue
│  │  ├─ UserList.vue
│  │  └─ UserProfile.vue
│  ├─ App.vue
│  └─ main.js
├─ package.json
├─ package-lock.json
└─ vue.config.js
```

### 目录说明

#### `src/views`

用于放置页面级组件：

- `RegisterView.vue`：注册页面
- `LoginView.vue`：登录页面
- `UserProfile.vue`：个人主页页面
- `UserList.vue`：好友列表页面
- `HomeView.vue`：首页
- `NotFound.vue`：404 页面

#### `src/components`

用于放置可复用组件：

- `NavBar.vue`：顶部导航栏
- `ContentBar.vue`：页面内容容器
- `UserProfile_info.vue`：用户信息展示组件
- `UserProfile_write.vue`：动态编辑组件
- `UserProfile_posts.vue`：动态列表展示组件

#### `src/store`

- `user.js`：用于管理当前登录用户信息的 Pinia store

#### `src/router`

- `index.js`：用于管理页面路由与页面跳转逻辑

## 运行方式

```bash
npm install
npm run serve
```
----

## 项目预览



---


# 2. Text Reveal Animation

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

---

## 开发过程中遇到的问题及解决方案

### 1. 如何实现背景图片逐渐显示的动画效果

#### 问题描述

在本项目中，我想要实现背景图片从空白到逐渐显示的一个动画效果

#### 原因分析

CSS 无法直接对 `background-image` 属性进行动画过渡，因此无法通过简单切换背景图片实现平滑渐变效果。

#### 解决方案

额外创建一个背景层，将背景图片放置在该层中，通过控制背景层的 `opacity` 属性实现透明度变化，并结合 `transition` 属性完成渐显动画。


---

### 2. 如何实现图片嵌入文字内部的效果

#### 问题描述

希望图片只显示在文字区域内部，而不是作为整个容器的背景显示，从而实现图片填充文字的视觉效果。

#### 原因分析

直接使用 `background-image` 会使图片覆盖整个元素区域，无法达到图片仅显示在文字内部的需求。

#### 解决方案

通过查阅MDN官网关于background的描述，找到了background-clip这个属性，其中background-clip：text可以实现背景被裁剪成文字的前景色

#### 关键代码

```css
.title {
    background-image: url("../assets/images/background.jpg");
    background-size: cover;
    background-position: center;

    color: transparent;
    background-clip: text;
}
```

---

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
