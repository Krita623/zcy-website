# 个人网站与题解展示平台

这是一个基于Next.js构建的个人网站，专注于展示编程题解。网站采用现代简约的设计风格，已经成功部署在Netlify上。

## 功能特点

- 🎨 现代简约的设计风格
- 📱 响应式布局，适配各种设备
- 📝 Markdown支持的题解展示
- 🔍 按难度和时间分类的题解列表
- 🏷️ 支持多种算法标签分类
- 🔒 GitHub账号登录的管理员功能
- 📊 简单直观的题解管理界面

## 仓库结构

```
├── content/             # 内容文件夹
│   └── solutions/       # 题解Markdown文件
├── public/              # 静态资源
├── src/                 # 源代码
│   ├── app/             # 应用路由和页面
│   │   ├── admin/       # 管理界面
│   │   ├── api/         # API路由
│   │   ├── solutions/   # 题解页面
│   │   └── about/       # 关于页面
│   ├── components/      # 可复用组件
│   ├── lib/             # 工具函数和库
│   ├── styles/          # 样式文件
│   └── types/           # TypeScript类型定义
├── .env.local.example   # 环境变量示例
├── site.config.js       # 网站配置
└── netlify.toml         # Netlify配置
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 环境变量设置

复制 `.env.local.example` 文件为 `.env.local` 并填写相应配置：

```bash
cp .env.local.example .env.local
```

然后根据注释说明填写各项环境变量。

### 设置GitHub OAuth应用

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写以下信息：
   - Application name: 你的应用名称（如 "Algorithm Solutions"）
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

访问 http://localhost:3000 查看开发版本。

### 构建生产版本

```bash
npm run build
```

## 部署到Netlify

Netlify支持Next.js的所有功能，包括API路由和身份验证，是部署此项目的理想选择。

#### 准备工作

1. 项目根目录已包含 `netlify.toml` 文件：

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

#### 部署步骤

1. 创建[Netlify账户](https://www.netlify.com/)并连接您的GitHub仓库
2. 设置环境变量（在Netlify网站 > Site settings > Build & deploy > Environment）：
   - 将`.env.local`中的所有变量添加到Netlify环境变量中
   - 特别注意更新`NEXTAUTH_URL`为您的Netlify站点URL
3. 部署完成后，更新GitHub OAuth应用的回调URL：
   - https://your-site-name.netlify.app/api/auth/callback/github

## 题解管理工作流

### 创建新题解

1. 管理员通过GitHub账号登录后，进入`/admin`页面
2. 点击"创建新题解"按钮
3. 填写表单，包括标题、难度、摘要、标签和内容
4. 内容使用Markdown格式编写，支持代码高亮
5. 提交后，系统会创建新的Markdown文件并更新网站

### 编辑题解

1. 在管理界面中，找到需要编辑的题解
2. 点击"编辑"按钮
3. 修改表单内容
4. 点击提交保存更改

### 题解格式

题解文件采用Markdown格式，包含前置元数据：

```markdown
---
title: 题目标题
date: '2023-03-17T11:03:20.706Z'
difficulty: easy | medium | hard
excerpt: 题目简介
tags:
  - array
  - string
  - etc
---

# 题目内容
...
```

## 自定义配置

所有网站配置都集中在`site.config.js`文件中，您可以轻松修改：

- 网站基本信息（标题、描述、作者等）
- 社交媒体链接
- 导航菜单
- 题解设置（显示数量、难度级别等）
- 标签分类
- 管理员权限设置

## 故障排除

### 常见问题与解决方案

1. **登录失败**: 
   - 检查GitHub OAuth设置是否正确
   - 确认回调URL格式正确（必须与部署URL完全匹配）
   - 验证你的GitHub用户名是否在`adminUsers`列表中
   - 检查GitHub应用权限范围是否包含`read:user user:email repo`

2. **API调用失败**：
   - 检查GitHub令牌权限是否足够
   - 可能遇到GitHub API速率限制，等待一段时间后再试
   - 确保仓库名称和所有者设置正确

3. **环境变量问题**: 
   - 确保所有必要的环境变量已设置
   - Netlify部署时，验证环境变量是否正确添加到Netlify设置中
   - 检查`.env.local`文件是否包含所有必要变量

4. **部署问题**：
   - Netlify: 检查`netlify.toml`配置和Netlify插件安装

5. **社交媒体链接问题**:
   - 确保所有链接使用完整URL格式（以http://或https://开头）
   - 避免在URL中使用多余的斜杠或其他特殊字符

## 许可证

MIT 
