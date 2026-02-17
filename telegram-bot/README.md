# AgroAI Telegram Bot

A production-ready Telegram bot that answers agriculture (agro) questions with an AI model.

## Features
- Professional agro assistant tone and formatting
- Context memory per user chat
- `/start`, `/help`, and `/reset` commands
- Works with OpenAI-compatible APIs
- Safe error handling and startup validation

## Where to run commands
All commands for this bot should be run **inside** the `telegram-bot` folder.

From the repository root (`/workspace/my-portfolio`):
```bash
cd telegram-bot
```

## Step-by-step run guide

### 1) Prerequisites
- Node.js 18+ installed (`node -v`)
- Telegram account
- An API key for an OpenAI-compatible provider

### 2) Create your Telegram bot token
1. Open Telegram and search for **@BotFather**.
2. Run `/newbot` and follow the prompts.
3. Copy the bot token you receive (looks like `123456:ABC-DEF...`).

### 3) Configure environment variables
From `telegram-bot` directory:
```bash
cp .env.example .env
```

Open `.env` and set:
- `TELEGRAM_BOT_TOKEN=...`
- `OPENAI_API_KEY=...`

Optional:
- `OPENAI_BASE_URL=https://api.openai.com/v1`
- `OPENAI_MODEL=gpt-4o-mini`

### 4) Install dependencies
```bash
npm install
```

### 5) Start the bot
```bash
npm run start
```

If startup is successful, you'll see:
```text
✅ AgroAI Telegram bot is running...
```

### 6) Chat with your bot
1. Open your bot in Telegram (username from BotFather).
2. Press **Start**.
3. Ask an agro question, for example:
   - `My maize field has yellow leaves after heavy rain. What should I check first?`

## Useful commands in Telegram
- `/start` → bot introduction
- `/help` → command/help text
- `/reset` → clear saved conversation context for your chat

## Common issues
- **"Missing required environment variables"**
  - You likely forgot to set `.env` values.
- **Bot starts but does not answer**
  - Check internet access and API key validity.
  - Verify `OPENAI_BASE_URL` if using a non-default provider.
- **401 or provider auth errors**
  - Confirm `OPENAI_API_KEY` is correct and active.

## Environment variables reference
- `TELEGRAM_BOT_TOKEN` (required)
- `OPENAI_API_KEY` (required)
- `OPENAI_BASE_URL` (optional, defaults to `https://api.openai.com/v1`)
- `OPENAI_MODEL` (optional, defaults to `gpt-4o-mini`)

## Notes
- The bot keeps a short in-memory conversation history per chat.
- For production deployment, use a process manager (PM2, systemd, Docker, etc.).
