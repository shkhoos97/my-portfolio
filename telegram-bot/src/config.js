import dotenv from 'dotenv';

dotenv.config();

const required = ['TELEGRAM_BOT_TOKEN', 'OPENAI_API_KEY'];
const missing = required.filter((name) => !process.env[name]);

if (missing.length > 0) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

export const config = {
  telegramToken: process.env.TELEGRAM_BOT_TOKEN,
  openAiKey: process.env.OPENAI_API_KEY,
  openAiBaseUrl: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini'
};
