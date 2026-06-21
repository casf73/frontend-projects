# SocialHub 后端

## 环境要求

- Java 17
- Maven 3.9+
- MySQL 8+

## 初始化数据库

在 MySQL 中执行 `database/schema.sql`。默认连接信息位于
`src/main/resources/application.yml`：

- 数据库：`social_hub`
- 用户名：`root`
- 密码：`123456`

不要把真实密码提交到 Git。可以使用环境变量覆盖：

```powershell
$env:DB_USERNAME='root'
$env:DB_PASSWORD='你的密码'
$env:JWT_SECRET='至少 32 字节密钥经过 Base64 编码后的字符串'
```

## 启动后端

```powershell
.\mvnw.cmd spring-boot:run
```

后端地址为 `http://localhost:8081`，Vue 开发服务器通过 `/api` 代理访问。

## 接口

| 方法 | 地址 | 说明 |
|---|---|---|
| POST | `/api/auth/register` | 注册 |
| POST | `/api/auth/login` | 登录并返回 JWT |
| GET | `/api/users` | 用户列表 |
| GET | `/api/users/{id}` | 用户详情 |
| POST | `/api/users/{id}/follow` | 关注 |
| DELETE | `/api/users/{id}/follow` | 取消关注 |
| GET | `/api/posts?userId={id}` | 查询帖子 |
| POST | `/api/posts` | 发布帖子 |

除注册和登录外，请求头必须携带：

```text
Authorization: Bearer 登录接口返回的token
```
