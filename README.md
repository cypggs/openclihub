<div align="center">

# OpenCLI Hub

**The CLI Tools Directory for the AI Agent Ecosystem**

[English](#-about) | [中文](#-关于)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E)](https://supabase.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000)](https://vercel.com/)

🌐 **Live**: [openclihub.com](https://openclihub.com)

</div>

---

## 🌍 About

AI is reshaping how we interact with software. CLIs are the bridge between AI agents and the products you use every day.

OpenCLI Hub is an open-source directory that collects official and community CLI tools, encouraging companies to build official CLIs and strengthen the AI agent tool ecosystem.

**Key Features:**
- Browse and search CLI tools with filtering (Official / Community)
- Each tool has both a **human install command** and an **agent install command** for AI agents
- REST API for programmatic access and AI-native tool submission
- Bilingual UI (English / Chinese)
- Dark / Light mode
- Daily GitHub stars auto-sync via Vercel Cron

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- (Optional) [Vercel](https://vercel.com) account for deployment

### 1. Clone & Install

```bash
git clone https://github.com/cypggs/openclihub.git
cd openclihub
npm install
```

### 2. Database Setup

Run `database_final.sql` in the [Supabase SQL Editor](https://supabase.com/dashboard). This creates the `cli_tools` table, indexes, RLS policies, and the `updated_at` trigger in one go.

### 3. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENCLIHUB_API_KEY=your-api-key
CRON_SECRET=your-cron-secret
```

| Variable | Side | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client | Public read access |
| `SUPABASE_SERVICE_ROLE_KEY` | Server | Full CRUD for API routes |
| `OPENCLIHUB_API_KEY` | Server | Bearer token for write APIs |
| `CRON_SECRET` | Server | Vercel Cron authentication |

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📡 API

All write endpoints require `Authorization: Bearer YOUR_API_KEY`.

| Endpoint | Methods | Auth | Description |
|---|---|---|---|
| `/api/tools` | GET, POST | POST | List tools (supports `?type=`, `?category=`, `?q=`, `?limit=`, `?offset=`) / Create tool |
| `/api/tools/[slug]` | GET, PATCH, DELETE | PATCH/DELETE | Get / Update / Delete a tool |
| `/api/sync-stars` | POST | Yes | Manually sync GitHub stars |
| `/api/cron/sync-stars` | GET | CRON_SECRET | Daily auto-sync (08:00 UTC) |

**Submit a tool:**

```bash
curl -X POST https://openclihub.com/api/tools \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My CLI Tool",
    "github_url": "https://github.com/org/repo",
    "description": "What this tool does",
    "maintainer_type": "official",
    "maintainer_name": "Org Name",
    "primary_language": "Go",
    "category": "Developer Tools",
    "install_command": "go install github.com/org/repo@latest",
    "agent_install_command": "https://github.com/org/repo/blob/main/README.md"
  }'
```

## 🏗 Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Add all environment variables in Vercel project settings, then redeploy. The cron job (`vercel.json`) syncs GitHub stars daily at 08:00 UTC.

## 🤝 Contributing

Contributions are welcome! Submit new CLI tools via the [Submit page](https://openclihub.com/submit) or the API.

## 📄 License

[MIT](LICENSE)

---

<div align="center">

## 🌍 关于

AI 正在重塑人机交互方式。CLI 是 AI Agent 与你日常使用产品之间的桥梁。

OpenCLI Hub 是一个开源的 CLI 工具目录，收集官方和社区开发的 CLI 工具，推动各公司开发官方 CLI，完善 AI Agent 工具生态。

**核心特性：**
- 浏览和搜索 CLI 工具，支持筛选（官方 / 社区）
- 每个工具同时提供**人类安装命令**和 **Agent 安装命令**
- REST API 支持程序化访问和 AI 原生工具提交
- 双语界面（中文 / English）
- 深色 / 浅色模式
- 通过 Vercel Cron 每日自动同步 GitHub Stars

## 🚀 快速开始

### 前置要求

- Node.js 18+
- [Supabase](https://supabase.com) 项目
- （可选）[Vercel](https://vercel.com) 账号用于部署

### 1. 克隆并安装

```bash
git clone https://github.com/cypggs/openclihub.git
cd openclihub
npm install
```

### 2. 数据库配置

在 [Supabase SQL Editor](https://supabase.com/dashboard) 中执行 `database_final.sql`。该文件一次性创建 `cli_tools` 表、索引、RLS 策略和 `updated_at` 触发器。

### 3. 环境变量

创建 `.env.local`：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENCLIHUB_API_KEY=your-api-key
CRON_SECRET=your-cron-secret
```

| 变量 | 端 | 用途 |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | 客户端 | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 客户端 | 公开只读访问 |
| `SUPABASE_SERVICE_ROLE_KEY` | 服务端 | API 路由完整读写权限 |
| `OPENCLIHUB_API_KEY` | 服务端 | 写入 API 的 Bearer Token |
| `CRON_SECRET` | 服务端 | Vercel Cron 认证 |

### 4. 运行

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)。

## 📡 API 接口

所有写入接口需要 `Authorization: Bearer YOUR_API_KEY` 请求头。

| 接口 | 方法 | 认证 | 说明 |
|---|---|---|---|
| `/api/tools` | GET, POST | POST | 列表（支持 `?type=`, `?category=`, `?q=`, `?limit=`, `?offset=`）/ 创建 |
| `/api/tools/[slug]` | GET, PATCH, DELETE | PATCH/DELETE | 获取 / 更新 / 删除 |
| `/api/sync-stars` | POST | 是 | 手动同步 GitHub Stars |
| `/api/cron/sync-stars` | GET | CRON_SECRET | 每日自动同步（UTC 08:00） |

**提交工具：**

```bash
curl -X POST https://openclihub.com/api/tools \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My CLI Tool",
    "github_url": "https://github.com/org/repo",
    "description": "这个工具做什么",
    "maintainer_type": "official",
    "maintainer_name": "组织名称",
    "primary_language": "Go",
    "category": "Developer Tools",
    "install_command": "go install github.com/org/repo@latest",
    "agent_install_command": "https://github.com/org/repo/blob/main/README.md"
  }'
```

## 🏗 部署到 Vercel

```bash
npm install -g vercel
vercel --prod
```

在 Vercel 项目设置中添加所有环境变量后重新部署。Cron 任务（`vercel.json`）每天 UTC 08:00 自动同步 GitHub Stars。

## 🤝 参与贡献

欢迎贡献！可通过 [提交页面](https://openclihub.com/submit) 或 API 提交新的 CLI 工具。

## 📄 许可证

[MIT](LICENSE)

</div>
