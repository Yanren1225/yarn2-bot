import { webhookCallback } from 'grammy';
import { createBot } from './bot';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const bot = createBot(env.BOT_TOKEN);
    return webhookCallback(bot, 'cloudflare-mod')(request);
  },
};
