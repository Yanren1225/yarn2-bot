import { Bot, webhookCallback } from 'grammy';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const bot = new Bot(env.BOT_TOKEN);
    bot.on('message:sticker', async (ctx) => {
      const stickerId = ctx.message.sticker.file_unique_id;
      // 回复爱音唐笑
      if (stickerId === 'AgAD2B0AAi1wiFc') {
        await ctx.replyWithVoice('AwACAgEAAxkBAAICR2l7BXaLa_orzGC-U_QSegJj8vhXAAJEBAACHhVIRtfSC7cO3qyvOAQ', {
          reply_to_message_id: ctx.msg.message_id,
        });
      }
    });

    return webhookCallback(bot, 'cloudflare-mod')(request);
  },
};
