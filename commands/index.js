const main = new (require('../scripts/')).Main();
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
const { Message, Client } = require('discord.js');

class Commands {
    /**
     * 
     * @param {Client} client 
     */
    constructor(client) {
        this.client = client;
        this.botOwner = require('./Bot Owner/');
        this.fun = require('./Fun/');
        this.info = require('./Info/');
        this.misc = require('./Misc/');
        this.moderation = require('./Moderation/');
        this.osu = require('./Osu/');
        this.random = require('./Random/');
        this.support = require('./Support/');
        this.voice = require('./Voice/');
    }
    BotOwner(msg) {
        return new this.botOwner(msg, this.client);
    }
    Fun(msg) {
        return new this.fun(msg, this.client);
    }
    Info(msg) {
        return new this.info(msg, this.client);
    }
    Misc(msg) {
        return new this.misc(msg, this.client);
    }
    Moderation(msg) {
        return new this.moderation(msg, this.client);
    }
    Osu(msg) {
        return new this.osu(msg, this.client);
    }
    Random(msg) {
        return new this.random(msg, this.client);
    }
    Support(msg) {
        return new this.support(msg, this.client);
    }
    Voice(msg, servers) {
        return new this.voice(msg, this.client);
    }
    /**
     * 
     * @param {Message} msg 
     */
    Load(msg) {
        //#region Help Command Load
        var help = require('./Support/help');
        new help(this.client, msg);
        //#endregion
        if (data.commands().categories.Voice == true || data.commands().categories.Voice == 'true') {
            this.Voice(msg, servers);
        }
        if (data.commands().categories.Support == true || data.commands().categories.Support == 'true') {
            this.Support(msg);
        }
        if (data.commands().categories.Info == true || data.commands().categories.Info == 'true') {
            this.Info(msg);
        }
        if (data.commands().categories.Random == true || data.commands().categories.Random == 'true') {
            this.Random(msg);
        }
        if (data.commands().categories.Moderation == true || data.commands().categories.Moderation == 'true') {
            this.Moderation(msg);
        }
        if (data.commands().categories.Fun == true || data.commands().categories.Fun == 'true') {
            this.Fun(msg);
        }
        if (data.commands().categories.Osu == true || data.commands().categories.Osu == 'true') {
            this.Osu(msg);
        }
        if (data.commands().categories.Misc == true || data.commands().categories.Misc == 'true') {
            this.Misc(msg);
        }
        if (data.commands().categories.BotOwner == true || data.commands().categories.BotOwner == 'true') {
            this.BotOwner(msg);
        }
    }

}
exports.Commands = Commands;
exports.Main = main;
