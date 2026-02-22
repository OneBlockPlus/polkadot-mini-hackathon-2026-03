# OpenPick EDU Platform

一个集成了AI与Web3的，从一个简单NFT示例入门的终身教育平台。

## 快速开始

1. 安装依赖
   ```bash
   npm install
   ```

2. 配置环境变量
   ```bash
   cp .example.env.local .env.local
   ```
   编辑 `.env.local`，添加：
   ```env
   WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id
   AI_API_BASE_URL=your-api-base-url
   AI_API_MODEL=your-api-model-name
   AI_API_KEY=your-api-key
   FACTORY_CONTRACT_ADDRESS=your-factory-contract-address
   AI_MAX_POST_FREQUENCY_PER_DAY=3  # 可选：每个IP的默认频率限制
   DATABASE_TYPE=memory  # 数据库类型，设置为memory使用内存数据库
   
   # Turso 数据库配置（用于生产环境/Vercel部署）
   TURSO_DATABASE_URL=libsql://your-database-name-your-username.turso.io
   TURSO_AUTH_TOKEN=your_turso_auth_token_here
   ```

3. 启动开发服务器
   ```bash
   npm run dev
   ```

4. 访问 [http://localhost:3000](http://localhost:3000)

## 核心功能

- **钱包连接**: 通过 WalletConnect 支持 MetaMask 等钱包
- **AI 聊天**: 支持多模型（DeepSeek、OpenAI、Anthropic）并带有频率限制
- **排行榜**: 使用 SQLite 数据库展示用户互动和学习进度
- **讨论区**: 集成 Giscus 的用户互动和分享功能
- **NFT 铸造**: 支持图片、视频和音频文件的自定义合约部署
- **自定义合约部署**: 通过 Factory 合约支持用户自定义合约部署
- **搭建AI Web3终身教育平台**: 提供一站式解决方案，帮助用户搭建自己的AI Web3终身教育平台
- **多语言**: 使用 next-intl 支持中英文
- **项目跟踪**: 通过项目完成系统跟踪用户学习进度

## 技术栈

- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- Ethers.js, WalletConnect
- Vercel AI SDK
- TypeScript
- SQLite (用于排行榜和用户数据) - 在无服务器部署中使用Turso
- Zustand (状态管理)
- next-intl (国际化)

## 架构与数据流

应用程序遵循现代 Web3 架构，包含以下关键组件：

1. **前端 (Next.js App Router)**
   - 通过 WalletConnect 进行客户端钱包连接
   - 带有流式响应的 AI 聊天界面
   - NFT 铸造和管理界面
   - 国际化支持

2. **后端 (API 路由)**
   - `/api/chat` - 处理 AI 模型集成和频率限制
   - `/api/leaderboard` - 管理用户分数和排名
   - `/api/mint` - 处理 NFT 铸造请求
   - `/api/user-project-entries` - 跟踪学习进度

3. **智能合约**
   - 用于部署自定义 ERC721 集合的 Factory 合约
   - 支持元数据的自定义 ERC721 实现
   - 通过环境变量配置合约地址

4. **数据库（SQLite与Turso用于无服务器部署）**
   - 用户数据和钱包地址
   - 项目完成跟踪
   - 带分页的排行榜排名
   - 学习进度分析

## 项目结构

```
├── app/                 # Next.js App Router
│   ├── api/            # API 路由
│   │   ├── chat/       # AI 聊天 API
│   │   ├── leaderboard/ # 排行榜数据 API
│   │   ├── mint/       # NFT 铸造 API
│   │   └── ...         # 其他 API 端点
│   └── [locale]/       # 国际化路由
├── components/          # React 组件
│   ├── ChatContainer.tsx # 主聊天界面
│   ├── NFTMintForm.tsx   # NFT 铸造表单
│   └── ...              # 其他组件
├── contexts/           # React Context
│   ├── WalletContext.tsx # 钱包连接状态
│   └── AIConfigContext.tsx # AI 配置
├── contracts/          # 智能合约 ABI
├── lib/                # 工具库
│   ├── contract.ts     # 智能合约交互
│   ├── database.ts     # 数据库操作
│   └── ...             # 其他工具
└── public/locales/     # 国际化文件
    ├── en/             # 英文翻译
    └── zh/             # 中文翻译
```

## 部署

### Vercel

#### 一键部署

使用一键部署按钮将项目部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/aiqubits-projects/clone?repository-url=https%3A%2F%2Fgithub.com%2Faiqubits%2Fopenpick-edu&env=WALLETCONNECT_PROJECT_ID,AI_API_BASE_URL,AI_API_MODEL,AI_API_KEY,FACTORY_CONTRACT_ADDRESS,TURSO_DATABASE_URL,TURSO_AUTH_TOKEN&envDescription=Required%20environment%20variables%20for%20the%20app&envLink=https%3A%2F%2Fgithub.com%2Faiqubits%2Fopenpick-edu%23environment-variables)

#### 手动部署

1. 设置 Turso 数据库（生产环境必需）：
   ```bash
   # 安装 Turso CLI
   curl -sSfL https://get.tur.so/install.sh | bash
   
   # 创建 Turso 账户
   turso auth signup
   
   # 创建数据库
   turso db create openpick-db
   
   # 获取数据库 URL 和认证令牌
   turso db show openpick-db --url
   turso db tokens create openpick-db
   ```

2. 推送代码到 GitHub
3. 在 Vercel 导入项目
4. 配置环境变量（包括 Turso 凭据）
5. 部署

### 自定义部署

1. 构建应用程序
   ```bash
   npm run build
   ```

2. 初始化数据库（SQLite 将自动创建）
   ```bash
   npm start
   ```

## 许可证

Apache License 2.0