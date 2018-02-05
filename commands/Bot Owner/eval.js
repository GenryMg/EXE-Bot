const main = require('../index').Main;
const functions = main.getFunctions();
const data = main.getData();
var token = data.token();
var prefix = data.prefix();
var osuApiKey = data.osuApiKey();
var owner = data.owner();
var allEvents = data.allEvents();
var debug = data.debug();
const wikis = {
    home: data.wikis().home,
    commands: data.wikis().commands,
    replies: data.wikis().replies,
    faq: data.wikis().faq,
    isEnabled: data.wikisEnabled()
};

const discord = require('discord.js');
const { Message, Client } = discord;
class Eval {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {
        var messageArray = msg.content.split(' ');
        var command_prefix = messageArray[0];
        var args = messageArray.slice(1).join(' ');
        var command = command_prefix.replace(prefix, '');
        if (msg.author.bot) return;
        if (msg.member.user.id == owner.id) {
            try {
                const code = args;
                var evaled = eval(code);
                evaled = functions.clean(evaled);
                if (typeof evaled !== 'string')
                    evaled = require('util').inspect(evaled);
                msg.channel.send(new discord.RichEmbed()
                    .setColor([255, 0, 0])
                    .setTitle('Eval Command')
                    .addField('Input', `\`\`\`${code}\`\`\``)
                    .addField('Output:', `\`\`\`xl\n${functions.clean(evaled)}\`\`\``));
            } catch (err) {
                msg.channel.send(new discord.RichEmbed()
                    .setTitle('ERROR')
                    .setColor([255, 0, 0])
                    .setDescription('\`\`\`xl\n' + functions.clean(err) + '\`\`\`'));
            }
        } else {
            msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .setDescription('Bot owner only!')
                .setFooter('how did you found this command?')
            );
        }
    }
}
module.exports = Eval;
