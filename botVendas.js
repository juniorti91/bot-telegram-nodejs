
// importando o token
const env = require('./.env');
// importando o modulo de comunicação
const Telegraf = require('telegraf');
// importando os modulos de dados da api do telegraf
const Extra = require('telegraf/extra');
const Markupp = require('telegraf/markup');
const { Markup } = require('telegraf');

// compartilhando sessão no telegraf
const session = require('telegraf/session');

// instaciando o bot
const bot = new Telegraf(env.token);

// método para gerar a lista de opções
const buttons = list => Extra.markup(
    Markup.inlineKeyboard(
        list.map(item => Markup.callbackButton(item, `delete ${item}`)),
        {colunas: 3}
    )
)

bot.use(session());

// quando o usuário iniciar a conversa com o bot o bot.start ira iniciar
bot.start( async content => {
    const name = content.update.message.from.first_name;

    await content.reply(`Seja Bem-vindo(a), ${name}`);
    await content.reply(`Digite os produtos que deseja adicionar ao carrinho`);
    content.session.list = [];
})

// captura o que o usuário esta digitando
bot.on('text', content => {
    let msg = content.update.message.text;
    content.session.list.push(msg); // adicionando uma lista dentro da sessão
    content.reply(`${msg} Produto adicionado`, buttons(content.session.list) );
})

// quem for diferente será expluido e gerado uma nova lista
bot.action(/delete (.+)/, content => {
    content.session.list = content.session.list.filter(item => item !== content.match[1] );

    content.reply(`${content.match[1]} deletado`, buttons(content.session.list));
})

bot.startPolling();