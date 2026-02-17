import { Telegraf } from 'telegraf';
import { config } from './config.js';
import { generateAgroReply } from './aiClient.js';

const bot = new Telegraf(config.telegramToken);
const sessions = new Map();
const MAX_HISTORY_MESSAGES = 10;

function getHistory(chatId) {
  if (!sessions.has(chatId)) {
    sessions.set(chatId, []);
  }

  return sessions.get(chatId);
}

function updateHistory(chatId, userMessage, assistantMessage) {
  const history = getHistory(chatId);
  history.push({ role: 'user', content: userMessage });
  history.push({ role: 'assistant', content: assistantMessage });

  if (history.length > MAX_HISTORY_MESSAGES) {
    history.splice(0, history.length - MAX_HISTORY_MESSAGES);
  }
}

bot.start(async (ctx) => {
  const firstName = ctx.from?.first_name || 'farmer';
  await ctx.reply(
    `Hi ${firstName}! 👋\n\nI'm AgroAI, your agriculture assistant. Ask me about crop planning, fertilization, irrigation, pest control, and more.\n\nUse /reset anytime to clear chat context.`
  );
});

bot.help(async (ctx) => {
  await ctx.reply(
    'Commands:\n' +
      '/start - Introduce the bot\n' +
      '/help - Show this help\n' +
      '/reset - Clear your conversation context\n\n' +
      'Example: "My tomato leaves are yellow after heavy rain. What should I do?"'
  );
});

bot.command('reset', async (ctx) => {
  sessions.delete(ctx.chat.id);
  await ctx.reply('Conversation context cleared ✅');
});

bot.on('text', async (ctx) => {
  const chatId = ctx.chat.id;
  const userMessage = ctx.message.text.trim();

  if (!userMessage) {
    await ctx.reply('Please send a text question.');
    return;
  }

  try {
    await ctx.sendChatAction('typing');
    const history = getHistory(chatId);
    const reply = await generateAgroReply(history, userMessage);

    updateHistory(chatId, userMessage, reply);
    await ctx.reply(reply, { disable_web_page_preview: true });
  } catch (error) {
    console.error('Failed to process message:', error);
    await ctx.reply(
      'Sorry, I had a temporary issue reaching the AI service. Please try again in a few seconds.'
    );
  }
});

bot.catch((error) => {
  console.error('Telegram bot error:', error);
});

bot
  .launch()
  .then(() => {
    console.log('✅ AgroAI Telegram bot is running...');
  })
  .catch((error) => {
    console.error('❌ Bot failed to start:', error);
    process.exit(1);
  });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
