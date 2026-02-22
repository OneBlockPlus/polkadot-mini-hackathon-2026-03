# OpenPick EDU Platform

A lifelong education platform integrating AI and Web3, starting from a simple NFT example.

## Quick Start

1. Install dependencies
   ```bash
   npm install
   ```

2. Configure environment variables
   ```bash
   cp .example.env.local .env.local
   ```
   Edit `.env.local` and add:
   ```env
   WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id
   AI_API_BASE_URL=your-api-base-url
   AI_API_MODEL=your-api-model-name
   AI_API_KEY=your-api-key
   FACTORY_CONTRACT_ADDRESS=your-factory-contract-address
   AI_MAX_POST_FREQUENCY_PER_DAY=3  # Optional: Default frequency limit per IP
   DATABASE_TYPE=memory  # Database type, set to memory for in-memory database
   
   # Turso Database Configuration (for production/Vercel deployment)
   TURSO_DATABASE_URL=libsql://your-database-name-your-username.turso.io
   TURSO_AUTH_TOKEN=your_turso_auth_token_here
   ```

3. Start development server
   ```bash
   npm run dev
   ```

4. Visit [http://localhost:3000](http://localhost:3000)

## Core Features

- **Wallet Connection**: Support for MetaMask and other wallets through WalletConnect
- **AI Chat**: Multi-model support (DeepSeek, OpenAI, Anthropic) with rate limiting
- **Leaderboard**: Display user interactions and learning progress with SQLite database
- **Discussion Forum**: User interaction and sharing with Giscus integration
- **NFT Minting**: Support for images, videos, and audio files with custom contract deployment
- **Custom Contract Deployment**: Support for user-defined contract deployment through Factory contract
- **AI Web3 Lifelong Education Platform**: One-stop solution to help users build their own AI Web3 lifelong education platform
- **Multilingual**: Chinese and English support with next-intl
- **Project Tracking**: Track user learning progress through project completion system

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- Ethers.js, WalletConnect
- Vercel AI SDK
- TypeScript
- SQLite (for leaderboard and user data) - Using Turso for serverless deployment
- Zustand (state management)
- next-intl (internationalization)

## Architecture & Data Flow

The application follows a modern web3 architecture with the following key components:

1. **Frontend (Next.js App Router)**
   - Client-side wallet connection via WalletConnect
   - AI chat interface with streaming responses
   - NFT minting and management UI
   - Internationalization support

2. **Backend (API Routes)**
   - `/api/chat` - Handles AI model integration with rate limiting
   - `/api/leaderboard` - Manages user scores and rankings
   - `/api/mint` - Processes NFT minting requests
   - `/api/user-project-entries` - Tracks learning progress

3. **Smart Contracts**
   - Factory contract for deploying custom ERC721 collections
   - Custom ERC721 implementation with metadata support
   - Contract addresses configurable via environment variables

4. **Database (SQLite with Turso for serverless deployment)**
   - User data and wallet addresses
   - Project completion tracking
   - Leaderboard rankings with pagination
   - Learning progress analytics

## Project Structure

```
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   │   ├── chat/       # AI chat API
│   │   ├── leaderboard/ # Leaderboard data API
│   │   ├── mint/       # NFT minting API
│   │   └── ...         # Other API endpoints
│   └── [locale]/       # Internationalized routes
├── components/          # React components
│   ├── ChatContainer.tsx # Main chat interface
│   ├── NFTMintForm.tsx   # NFT minting form
│   └── ...              # Other components
├── contexts/           # React Context
│   ├── WalletContext.tsx # Wallet connection state
│   └── AIConfigContext.tsx # AI configuration
├── contracts/          # Smart contract ABI
├── lib/                # Utility libraries
│   ├── contract.ts     # Smart contract interactions
│   ├── database.ts     # Database operations
│   └── ...             # Other utilities
└── public/locales/     # Internationalization files
    ├── en/             # English translations
    └── zh/             # Chinese translations
```

## Deployment

### Vercel

#### One-Click Deployment

Deploy this project to Vercel with a single click:

<!-- [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Faiqubits%2Fopenpick-edu&env=WALLETCONNECT_PROJECT_ID,AI_API_BASE_URL,AI_API_MODEL,AI_API_KEY,FACTORY_CONTRACT_ADDRESS&envDescription=Required%20environment%20variables%20for%20the%20app&envLink=https%3A%2F%2Fgithub.com%2Faiqubits%2Fopenpick-edu%23environment-variables) -->

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/aiqubits-projects/clone?repository-url=https%3A%2F%2Fgithub.com%2Faiqubits%2Fopenpick-edu&env=WALLETCONNECT_PROJECT_ID,AI_API_BASE_URL,AI_API_MODEL,AI_API_KEY,FACTORY_CONTRACT_ADDRESS,TURSO_DATABASE_URL,TURSO_AUTH_TOKEN&envDescription=Required%20environment%20variables%20for%20the%20app&envLink=https%3A%2F%2Fgithub.com%2Faiqubits%2Fopenpick-edu%23environment-variables)

#### Manual Deployment

1. Set up Turso Database (required for production):
   ```bash
   # Install Turso CLI
   curl -sSfL https://get.tur.so/install.sh | bash
   
   # Create a Turso account
   turso auth signup
   
   # Create a database
   turso db create openpick-db
   
   # Get database URL and auth token
   turso db show openpick-db --url
   turso db tokens create openpick-db
   ```

2. Push code to GitHub
3. Import project in Vercel
4. Configure environment variables (including Turso credentials)
5. Deploy

### Custom Deployment

1. Build the application
   ```bash
   npm run build
   ```

2. Initialize the database (SQLite will be created automatically)
   ```bash
   npm start
   ```

## License

Apache License 2.0