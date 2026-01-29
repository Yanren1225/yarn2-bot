import { createBot } from './bot';
import 'dotenv/config';

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error('BOT_TOKEN is not defined in .env');
}

const webhookUrl = process.env.WEBHOOK_URL;

const bot = createBot(token);

const cleanup = async () => {
  console.log('\nStopping bot...');
  await bot.stop();

  if (webhookUrl) {
    console.log(`Restoring webhook to ${webhookUrl}...`);
    await bot.api.setWebhook(webhookUrl);
    console.log('Webhook restored.');
  } else {
    console.warn('WEBHOOK_URL is not set in .env, webhook was not restored.');
  }

  process.exit(0);
};

process.once('SIGINT', cleanup);
process.once('SIGTERM', cleanup);

(async () => {
  console.log('Clearing webhook...');
  await bot.api.deleteWebhook();
  console.log('Starting polling...');
  await bot.start();
})();
