# 个人网站与题解展示平台

这是一个基于Next.js构建的个人网站，专注于展示编程题解。网站采用现代简约的设计风格，已经成功部署在Netlify上。

## 功能特点

- 🎨 现代简约的设计风格
- 📱 响应式布局，适配各种设备
- 📝 Markdown支持的题解展示
- 🔍 按难度和时间分类的题解列表
- 🔒 GitHub账号登录的管理员功能
- 📊 简单直观的题解管理界面
- 🚀 部署到Netlify支持完整功能

## 快速开始

### 安装依赖

```bash
npm install
```

### 环境变量设置

在项目根目录创建 `.env.local` 文件并添加以下变量：

```
# GitHub OAuth 
GITHUB_ID=你的GitHub应用客户端ID
GITHUB_SECRET=你的GitHub应用客户端密钥

# NextAuth.js 密钥
# 可以使用 `openssl rand -base64 32` 命令生成
NEXTAUTH_SECRET=生成的随机密钥

# 在开发环境中设置
NEXTAUTH_URL=http://localhost:3000
```

### 设置GitHub OAuth应用

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写以下信息：
   - Application name: 你的应用名称（如 "My Algorithm Solutions"）
   - Homepage URL: http://localhost:3000（开发环境）或你的实际网站URL
   - Authorization callback URL: http://localhost:3000/api/auth/callback/github（开发环境）或 https://your-site-name.netlify.app/api/auth/callback/github
4. 点击创建，然后获取 Client ID 和 Client Secret
5. 将这些值添加到 `.env.local` 文件中

### 设置管理员权限

在 `site.config.js` 中添加有权访问管理功能的GitHub用户名：

```javascript
// 管理员 GitHub 用户名列表 (用于鉴权)
adminUsers: [
  "yourgithubusername"
],
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 部署到Netlify

Netlify支持Next.js的所有功能，包括API路由和身份验证，是部署此项目的理想选择。

### 准备工作

1. 在项目根目录创建 `netlify.toml` 文件：

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NETLIFY_NEXT_PLUGIN_SKIP = "true"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

2. 安装Netlify Next.js插件：

```bash
npm install -D @netlify/plugin-nextjs
```

### 部署步骤

1. 创建[Netlify账户](https://www.netlify.com/)并连接您的GitHub仓库
2. 设置以下环境变量：
   - `GITHUB_ID`: GitHub OAuth应用的客户端ID
   - `GITHUB_SECRET`: GitHub OAuth应用的客户端密钥 
   - `NEXTAUTH_SECRET`: NextAuth.js的密钥
   - `NEXTAUTH_URL`: 您的Netlify站点URL（例如：https://your-site-name.netlify.app）
3. 部署完成后，更新GitHub OAuth应用的回调URL：
   - https://your-site-name.netlify.app/api/auth/callback/github

## 自定义配置

所有网站配置都集中在`site.config.js`文件中，您可以轻松修改：

- 网站基本信息（标题、描述、作者等）
- 社交媒体链接
- 导航菜单
- 题解设置（显示数量、难度级别等）
- 管理员权限设置

## 题解管理

管理员可以通过GitHub账号登录后：

1. 创建新的题解
2. 编辑现有题解
3. 删除不需要的题解

所有题解以Markdown格式存储在`content/solutions`目录中。

## 技术栈

- Next.js - React框架
- TypeScript - 类型安全
- Tailwind CSS - 样式系统
- Next Auth - 身份验证
- Gray Matter - Markdown前置元数据解析
- React Markdown - Markdown渲染

## 故障排除

### 常见问题

1. **登录失败**: 
   - 检查GitHub OAuth设置是否正确
   - 确认回调URL格式正确（必须与Netlify部署URL完全匹配）
   - 验证你的GitHub用户名是否在`adminUsers`列表中

2. **环境变量问题**: 
   - 确保Netlify环境变量设置正确
   - 在本地开发时确保`.env.local`文件包含所有必要的变量

3. **社交媒体链接问题**:
   - 确保所有链接使用完整URL格式（以http://或https://开头）
   - 避免在URL中使用多余的斜杠或其他特殊字符

## 许可证

MIT 
