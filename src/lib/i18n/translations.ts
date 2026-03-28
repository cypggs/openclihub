export type Locale = "en" | "zh";

export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    // Header
    "header.title": "OpenCLI Hub",
    "header.github": "GitHub",
    "header.submitTool": "Submit a Tool",
    "header.api": "API",

    // Hero
    "hero.badge": "CLI is the next wave of AI tooling",
    "hero.title.line1": "The CLI Tools",
    "hero.title.line2": "Directory",
    "hero.subtitle":
      "AI is reshaping how we interact with software. CLIs are the bridge between AI agents and the products you use every day. Discover official and community CLI tools for your favorite products.",
    "hero.mission":
      "Encouraging companies to build official CLIs and strengthen the AI agent tool ecosystem.",

    // Search & Filter
    "search.placeholder": "Search CLI tools...",
    "filter.all": "All",
    "filter.official": "Official",
    "filter.community": "Community",

    // Tool Card
    "tool.by": "by",
    "tool.viewOnGithub": "View on GitHub",
    "tool.install": "Install",
    "tool.officialBadge": "Official",
    "tool.communityBadge": "Community",

    // Tool Detail
    "detail.backToList": "Back to all tools",
    "detail.installCommand": "Install",
    "detail.agentInstallCommand": "Agent Install",
    "detail.copied": "Copied!",
    "detail.copy": "Copy",
    "detail.github": "View on GitHub",
    "detail.homepage": "Homepage",
    "detail.language": "Language",
    "detail.category": "Category",
    "detail.stars": "Stars",
    "detail.maintainer": "Maintainer",
    "detail.type": "Type",
    "detail.notFound": "Tool not found",
    "detail.notFoundDesc": "The CLI tool you're looking for doesn't exist.",
    "detail.goHome": "Go back home",

    // Empty state
    "empty.title": "No CLI tools found",
    "empty.description": "No CLI tools found matching your search.",
    "empty.clearFilters": "Clear filters",

    // Footer
    "footer.mission":
      "Built to encourage companies to build official CLIs for the AI agent ecosystem.",
    "footer.openSource": "Open Source",
    "footer.submitTool": "Submit a CLI Tool",

    // Submit page
    "submit.title": "Submit a CLI Tool",
    "submit.subtitle":
      "Know a CLI tool that should be listed here? Submit it via our API or fill in the form below.",
    "submit.apiTitle": "API Endpoint",
    "submit.apiDesc":
      "AI agents and scripts can submit tools directly via the API (requires API key):",
    "submit.apiKey": "API Key",
    "submit.apiKeyPlaceholder": "Enter your API key",
    "submit.apiKeyRequired": "API key is required to submit tools",
    "submit.formTitle": "Or fill in the form",
    "submit.name": "Tool Name",
    "submit.namePlaceholder": "e.g. Notion CLI",
    "submit.githubUrl": "GitHub URL",
    "submit.githubUrlPlaceholder": "https://github.com/org/repo",
    "submit.description": "Description",
    "submit.descriptionPlaceholder":
      "A short description of what this CLI tool does...",
    "submit.maintainerType": "Maintainer Type",
    "submit.maintainerName": "Maintainer Name",
    "submit.maintainerNamePlaceholder": "e.g. Notion, Inc.",
    "submit.language": "Primary Language",
    "submit.languagePlaceholder": "e.g. Go, Rust, TypeScript",
    "submit.category": "Category",
    "submit.categoryPlaceholder": "e.g. Productivity, Developer Tools",
    "submit.homepageUrl": "Homepage URL (optional)",
    "submit.homepageUrlPlaceholder": "https://example.com",
    "submit.installCommand": "Install Command (optional)",
    "submit.installCommandPlaceholder": "e.g. npm install -g @org/cli",
    "submit.agentInstallCommand": "Agent Install Command (optional)",
    "submit.agentInstallCommandPlaceholder": "e.g. Read and install from https://github.com/org/repo/blob/main/README.md",
    "submit.button": "Submit Tool",
    "submit.submitting": "Submitting...",
    "submit.success": "Tool submitted successfully!",
    "submit.error": "Failed to submit. Please try again.",
  },
  zh: {
    // Header
    "header.title": "OpenCLI Hub",
    "header.github": "GitHub",
    "header.submitTool": "提交工具",
    "header.api": "API",

    // Hero
    "hero.badge": "CLI 是 AI 工具的下一波浪潮",
    "hero.title.line1": "CLI 工具",
    "hero.title.line2": "目录",
    "hero.subtitle":
      "AI 正在重塑人机交互方式。CLI 是 AI Agent 与你日常使用产品之间的桥梁。在这里发现官方和社区开发的 CLI 工具。",
    "hero.mission": "推动各公司开发官方 CLI，完善 AI Agent 工具生态。",

    // Search & Filter
    "search.placeholder": "搜索 CLI 工具...",
    "filter.all": "全部",
    "filter.official": "官方",
    "filter.community": "社区",

    // Tool Card
    "tool.by": "by",
    "tool.viewOnGithub": "在 GitHub 查看",
    "tool.install": "安装",
    "tool.officialBadge": "官方",
    "tool.communityBadge": "社区",

    // Tool Detail
    "detail.backToList": "返回列表",
    "detail.installCommand": "安装命令",
    "detail.agentInstallCommand": "Agent 安装方式",
    "detail.copied": "已复制！",
    "detail.copy": "复制",
    "detail.github": "在 GitHub 查看",
    "detail.homepage": "官方网站",
    "detail.language": "编程语言",
    "detail.category": "分类",
    "detail.stars": "Stars",
    "detail.maintainer": "维护者",
    "detail.type": "类型",
    "detail.notFound": "工具未找到",
    "detail.notFoundDesc": "你查找的 CLI 工具不存在。",
    "detail.goHome": "返回首页",

    // Empty state
    "empty.title": "未找到 CLI 工具",
    "empty.description": "没有找到匹配的 CLI 工具。",
    "empty.clearFilters": "清除筛选",

    // Footer
    "footer.mission": "推动各公司开发官方 CLI，完善 AI Agent 工具生态。",
    "footer.openSource": "开源项目",
    "footer.submitTool": "提交 CLI 工具",

    // Submit page
    "submit.title": "提交 CLI 工具",
    "submit.subtitle":
      "知道一个应该被收录的 CLI 工具？通过 API 提交或填写下面的表单。",
    "submit.apiTitle": "API 接口",
    "submit.apiDesc": "AI Agent 和脚本可以直接通过 API 提交工具（需要 API Key）：",
    "submit.apiKey": "API Key",
    "submit.apiKeyPlaceholder": "输入你的 API Key",
    "submit.apiKeyRequired": "提交工具需要 API Key",
    "submit.formTitle": "或填写表单",
    "submit.name": "工具名称",
    "submit.namePlaceholder": "例如 Notion CLI",
    "submit.githubUrl": "GitHub 地址",
    "submit.githubUrlPlaceholder": "https://github.com/org/repo",
    "submit.description": "描述",
    "submit.descriptionPlaceholder": "简短描述这个 CLI 工具的功能...",
    "submit.maintainerType": "维护者类型",
    "submit.maintainerName": "维护者名称",
    "submit.maintainerNamePlaceholder": "例如 Notion, Inc.",
    "submit.language": "主要编程语言",
    "submit.languagePlaceholder": "例如 Go, Rust, TypeScript",
    "submit.category": "分类",
    "submit.categoryPlaceholder": "例如 生产力, 开发工具",
    "submit.homepageUrl": "官网地址（可选）",
    "submit.homepageUrlPlaceholder": "https://example.com",
    "submit.installCommand": "安装命令（可选）",
    "submit.installCommandPlaceholder": "例如 npm install -g @org/cli",
    "submit.agentInstallCommand": "Agent 安装命令（可选）",
    "submit.agentInstallCommandPlaceholder": "例如 查看内容并安装这个项目到本机 https://github.com/org/repo/blob/main/README.md",
    "submit.button": "提交工具",
    "submit.submitting": "提交中...",
    "submit.success": "工具提交成功！",
    "submit.error": "提交失败，请重试。",
  },
} as const;
