
// importando o token
const env = require('./.env');
// importando o modulo de comunicação
const Telegraf = require('telegraf');

// iniciando bot
const bot = new Telegraf(env.token);

bot.start(content => {
    const from = content.update.message.from;

    console.log(from);

    content.reply(`Seja bem-vindo, ${from.first_name}!`)
});

bot.on('text', (content, next) => {
    content.reply('TipsCode...');
    next();
});

bot.startPolling();
