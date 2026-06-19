import { Bot } from 'grammy';

export function createBot(token: string) {
  const bot = new Bot(token);

  bot.on('message:text', async (ctx) => {
    const text = ctx.message.text.replace(/[\s\p{P}]+$/u, '');
    if (text.endsWith('吃什么')) {
      await ctx.reply('对啊，吃什么');
    }
  });

  bot.on('message:sticker', async (ctx) => {
    const stickerId = ctx.message.sticker.file_unique_id;
    // 回复爱音唐笑
    if (stickerId === 'AgAD2B0AAi1wiFc') {
      await ctx.replyWithVoice('AwACAgEAAxkBAAICR2l7BXaLa_orzGC-U_QSegJj8vhXAAJEBAACHhVIRtfSC7cO3qyvOAQ');
    }
  });

  return bot;
}
