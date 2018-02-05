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
class invite {
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
        client.generateInvite(['ADMINISTRATOR']).then(link => {
            msg.channel.send(new discord.RichEmbed()
                .setTitle('Invite me to your server!')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setColor([255, 0, 0])
                .setDescription(link)
                .setURL(link));
        });
    }
}
module.exports = invite;
