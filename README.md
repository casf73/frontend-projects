# Frontend Projects

记录我的前端学习项目。

## 项目列表

# 1. SocialHub轻量级社交动态平台

## 项目简介

`SocialHub` 是一个基于 Vue 3 开发的轻量级社交动态平台，围绕用户注册登录、个人主页、用户搜索、动态发布和关注关系等核心功能，模拟基础社交平台的业务流程。

项目采用 Vue3 构建前端页面，使用 Vue Router 实现页面路由管理与登录权限控制，使用 Pinia 管理用户登录状态与全局数据，并通过 Axios 调用后端 RESTful API 完成数据交互。项目中结合 Base64 实现头像上传与本地预览，支持用户信息展示、动态内容发布、用户搜索、关注关系维护等功能。

当前项目仍在持续完善中，现阶段重点已经覆盖：

- 用户注册与登录
- 头像上传及Base64数据存储
- 用户个人主页与信息展示
- 按姓名搜索数据库中的用户
- 用户动态发布与查询
- 粉丝数量动态统计
- pinia全局用户状态管理
- 统一接口异常处理与登录失效处理


## 项目效果

当前版本已完成用户注册登录、用户搜索、个人主页、动态发布和用户关注等核心功能，前端基于 Vue3 构建页面，结合 Vue Router、Pinia、Axios 完成路由管理、状态维护与接口数据交互。后端接口由组员负责提供，本人主要负责前端页面开发、接口联调、数据渲染与异常状态处理。

### 1. 用户注册模块

- 实现注册表单页面，支持账号、密码、姓名、头像等用户信息录入
- 使用 v-model 完成表单数据双向绑定，并对输入内容进行基础校验
- 使用 <input type="file"> 支持用户本地选择头像图片
- 通过 FileReader.readAsDataURL() 将头像图片转换为 Base64 字符串，实现前端预览与数据提交
- 根据接口返回结果处理注册成功、账号重复、参数缺失等状态提示
- 注册成功后通过 Vue Router 自动跳转至登录页面

### 2. 用户登录与身份认证管理

- 实现用户登录页面，支持账号和密码输入校验
- 使用 Axios 调用登录接口，完成前端与后端登录接口联调
- 登录成功后接收后端返回的用户信息和身份凭证
- 使用 Pinia 管理当前登录用户信息、登录状态和 Token
- 封装 Axios 请求逻辑，在请求头中统一携带 Token
- 根据接口返回状态处理登录失败、Token 失效、未登录访问等异常情况
- 通过路由跳转控制用户登录后的页面流转

### 3. 用户搜索模块

- 实现用户搜索页面，支持根据用户名关键词进行用户检索
- 使用 v-model 绑定搜索输入框内容，完成搜索关键词的实时获取
- 通过 Axios 将搜索关键词传递给后端搜索接口，完成用户搜索接口联调
- 根据接口返回结果渲染用户列表，展示用户头像、姓名和粉丝数量等信息
- 对搜索结果为空、接口请求失败等情况进行页面提示处理
- 支持点击搜索结果中的用户卡片，跳转至对应用户的个人主页

### 4. 个人主页模块

- 实现用户个人主页页面，支持展示用户头像、姓名、粉丝数量和个人动态内容
- 通过 Vue Router 动态路由参数区分当前访问的用户主页
- 页面加载时根据用户 ID 调用接口获取对应用户信息和动态列表
- 根据当前登录用户与主页用户的关系，动态展示关注、取消关注等操作按钮
- 支持访问他人主页并查看其公开动态内容
- 使用 Pinia 维护当前登录用户状态，结合接口返回结果更新页面展示
- 对用户信息加载失败、动态为空等情况进行异常提示与空状态展示

### 5. 用户动态模块

- 支持用户发布个人动态
- 后端根据 JWT 识别动态发布者，防止伪造用户身份
- 动态内容通过 RESTful API 写入 MySQL
- 支持按用户 ID 查询其动态列表
- 动态按照发布时间倒序展示
- 页面刷新后可以从数据库重新加载动态

### 6. 页面导航与权限控制

- 使用 Vue Router 配置首页、用户搜索、用户动态、登录、注册、个人主页等页面路由
- 实现单页面应用中的页面切换，避免传统页面跳转造成的整体刷新
- 通过路由守卫判断用户登录状态，控制未登录用户访问受限页面
- 用户未登录时自动跳转至登录页面，登录成功后跳转回对应功能页面
- 使用 Pinia 维护用户登录状态，并结合 localStorage 实现刷新后的状态恢复
- 根据登录状态动态渲染导航栏内容，例如登录、注册、用户名和退出登录按钮
- 统一处理 Token 失效、未登录访问等异常情况，提升页面访问的稳定性

### 7. 用户状态管理

- 使用 Pinia 统一管理当前登录用户信息、登录状态和 Token
- 登录成功后将用户信息和 Token 存入 Pinia，便于多个组件共享状态
- 结合 localStorage 实现登录状态持久化，避免页面刷新后用户信息丢失
- 页面刷新时从本地缓存中恢复用户状态，并同步更新导航栏和页面展示
- 封装 Axios 请求逻辑，统一在请求头中携带 Token
- 对 Token 失效、未登录访问、接口请求失败等情况进行统一异常处理

### 8. 接口联调与数据交互

- 后端接口由组员负责开发，本人主要负责前端接口接入、参数传递和页面数据渲染
- 使用 Axios 调用用户注册、登录、用户搜索、个人主页、动态发布和关注关系等接口
- 根据后端 RESTful API 返回的数据结构，完成前端数据处理与组件渲染
- 对接口返回的成功、失败、空数据和异常状态进行前端提示处理
- 在登录相关请求中接收并保存 Token，用于后续接口访问的身份校验
- 在需要权限的接口请求中统一携带 Token，保证用户状态与接口访问逻辑一致
- 配合后端完成前后端联调，确保用户信息、动态内容和关注状态能够正确展示

### 9. 当前项目状态说明

- 当前项目主要功能已完成并完成前后端接口联调
- 已实现用户注册登录、用户搜索、个人主页、动态发布、关注关系和用户状态管理等功能
- 前端通过 Axios 接入后端接口，完成用户数据、动态数据和关注关系的页面渲染
- 使用 Pinia 与 localStorage 结合管理登录状态，提升页面刷新后的状态保持能力
- 项目已具备完整的前端页面结构和基础社交业务流程
- 后续可继续扩展动态删除、评论、点赞、分页查询、头像文件上传和页面样式优化等功能

---

## 技术栈

### 前端技术栈

| 技术 | 用途 |
|---|---|
| Vue 3 | 搭建前端页面，使用 Composition API 开发组件逻辑 |
| Vue Router  | 实现 SPA 单页面路由管理、动态路由参数获取和登录权限控制 |
| Pinia | 管理当前登录用户、Token、用户状态和全局共享数据 |
| Axios | 调用后端 RESTful API，完成前后端数据交互 |
| Axios Interceptors | 封装请求拦截器，在请求头中统一携带 Token，并处理接口异常状态 |
| Bootstrap 5 | 实现页面基础布局、表单样式、按钮样式和响应式页面结构 |
| JavaScript ES6+ | 实现页面交互逻辑、异步请求处理和数据处理 |
| HTML5 / CSS3 | 完成页面结构搭建、样式设计和基础布局 |
| LocalStorage | 持久化保存 Token 和必要的登录状态信息 |
| FileReader API | 实现头像图片读取与 Base64 字符串转换 |
| Vue CLI / Webpack | 搭建前端开发环境，完成项目开发服务器启动和项目构建 |

## 本人主要负责内容

- 使用 Vue3 完成注册、登录、用户搜索、个人主页、动态发布等页面开发
- 使用 Vue Router 实现页面跳转、动态路由参数获取和登录权限控制
- 使用 Pinia 管理当前登录用户、Token 和全局登录状态
- 使用 Axios 调用后端接口，完成用户、动态、关注关系等数据交互
- 封装 Axios 请求逻辑，在请求头中统一携带 Token
- 根据接口返回结果完成页面数据渲染、错误提示和状态更新
- 使用 FileReader API 实现头像上传、Base64 转换和本地预览
- 使用 localStorage 配合 Pinia 实现登录状态持久化
- 根据登录状态动态渲染导航栏、关注按钮、发布入口等页面内容
- 参与前后端接口联调，处理接口参数、返回数据结构和异常状态



## 项目涉及的核心知识点
- Vue3 Composition API
- 组件化开发
- Props / Emit 组件通信
- Vue Router 路由管理
- 动态路由参数获取
- 路由守卫与登录权限控制
- Pinia 全局状态管理
- Pinia 与 localStorage 状态持久化
- Axios 异步请求
- Axios 请求拦截器与响应异常处理
- Token 身份认证流程
- FileReader 图片读取
- Base64 图片数据处理
- RESTful API 接口调用
- 前后端分离开发模式
- SPA 单页面应用开发模式
- 表单数据绑定与基础校验
- 接口联调与页面数据渲染
- 统一异常状态处理

---

## 开发过程中遇到的问题及解决方案

### 1. 数据异步加载问题

#### 问题描述

前端调用接口可能会出现渲染页面的时候，数据还没回来，如果直接渲染，会出现报错

#### 解决方案

采用异步操作，方法函数体加上async和await关键字，同时增加一个响应式变量loading，来记录数据是否正确被返回，用于后续的判定

---

### 2. 接口请求失败问题

#### 问题描述

在通过axios调用接口的时候,有的时候会提示网络异常，接口路径写错之类的情况

#### 解决方案

把接口请求失败情况进行统一的异常处理，通过错误提示避免页面无反馈

---

### 3. Token失效导致显示未登录

#### 问题描述

大部分页面都需要登录后才能访问，如果Token过期，则会导致无法访问，返回401

#### 解决方案

通过 Axios 响应拦截器统一处理 Token 失效和未登录状态，自动清除用户状态并跳转登录页。

---

### 4. 父组件和子组件之间怎么传递信息

#### 问题描述

在完成编辑帖子的组件编写后，发现输入的信息，只保存在这个组件中，但又不可能使用pinia来存这个数据，因为只在这一个功能中需要用到这个数据

#### 解决方案

我通过搜索引擎询问“vue中父组件与子组件中怎么传递信息”，得知了props和emit，props是父组件向子组件传递信息用的，子组件需要有一个defineProps函数来实现数据的接受。emit是子组件向父组件传递信息用的，子组件同样通过emit函数来实现数据的传输，并且会传输一个行为，父组件可以通过这个行为来触发函数，实现数据的接受

---

### 5. 注册上传的头像，无法被正常保存

#### 问题描述

注册上传头像的类型，无法被一个变量直接保存下来

#### 解决方案

可以使用FileReader的readAsDataURL（）函数，来将图片转化成字符串，同时还要注意涉及到数据的传输与上传的操作，都会有时间延迟，需要使用异步函数，以及向后端申请数据的时候，要用到async和await关键词，来表示异步操作

---


## 项目结构

项目采用前后端分离架构，前端基于 Vue 3 开发，后端基于 Spring Boot 开发，并使用 MySQL 完成数据持久化。

```text
SocialHub
├─ public
│  ├─ icon.jpg
│  └─ index.html
├─ src
│  ├─ api
│  │  └─ index.js
│  ├─ assets
│  │  ├─ icon.jpg
│  │  ├─ 首页.png
│  │  ├─ 登录.png
│  │  ├─ 注册.png
│  │  ├─ 好友列表与搜索功能.png
|  |  ├─ 访问个人主页及关注功能.png
│  │  └─ 个人主页.png
│  │
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
├─ serve
│  ├─ database
│  │  └─ schema.sql
│  ├─ src
│  │  └─ main
│  │     ├─ java
│  │     │  └─ com
│  │     │     └─ codelyy
│  │     │        └─ socialhub
│  │     │           ├─ config
│  │     │           │  └─ SecurityConfig.java
│  │     │           ├─ controller
│  │     │           │  ├─ AuthController.java
│  │     │           │  ├─ PostController.java
│  │     │           │  └─ UserController.java
│  │     │           ├─ dto
│  │     │           │  ├─ AuthResponse.java
│  │     │           │  ├─ CreatePostRequest.java
│  │     │           │  ├─ LoginRequest.java
│  │     │           │  ├─ MessageResponse.java
│  │     │           │  ├─ PostResponse.java
│  │     │           │  ├─ RegisterRequest.java
│  │     │           │  └─ UserResponse.java
│  │     │           ├─ entity
│  │     │           │  ├─ Follow.java
│  │     │           │  ├─ Post.java
│  │     │           │  └─ User.java
│  │     │           ├─ exception
│  │     │           │  └─ GlobalExceptionHandler.java
│  │     │           ├─ repository
│  │     │           │  ├─ FollowRepository.java
│  │     │           │  ├─ PostRepository.java
│  │     │           │  └─ UserRepository.java
│  │     │           ├─ security
│  │     │           │  ├─ JwtAuthenticationFilter.java
│  │     │           │  └─ JwtService.java
│  │     │           ├─ service
│  │     │           │  ├─ PostService.java
│  │     │           │  └─ UserService.java
│  │     │           └─ SocialHubApplication.java
│  │     └─ resources
│  │        └─ application.yml
│  ├─ mvnw
│  ├─ mvnw.cmd
│  ├─ pom.xml
│  └─ README.md
├─ babel.config.js
├─ jsconfig.json
├─ package.json
├─ package-lock.json
└─ vue.config.js
```

---

## 项目预览

首页：

<img src="/SocialHub/src/assets/首页.png" width="800px">

注册:

<img src="/SocialHub/src/assets/注册.png" width="800px">

登录:

<img src="/SocialHub/src/assets/登录.png" width="800px">

好友列表与搜索功能:

<img src="/SocialHub/src/assets/好友列表与搜索功能.png" width="800px">

个人主页:

<img src="/SocialHub/src/assets/个人主页.png" width="800px">

访问个人主页及关注功能:

<img src="/SocialHub/src/assets/访问个人主页及关注功能.png" width="800px">
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
