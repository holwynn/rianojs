const { RichEmbed } = require('discord.js');

class Command {
    constructor() {
        this.embedColors = {
            red: 12542314,
            green: 10731148,
            blue: 8495553,
            yellow: 15453067,
            purple: 11833005
        }
    }

    setOptions(o = {}) {
        this.msg = o.msg || {};
        this.args = o.args || [];
        this.user = o.user || {};
    }

    embed(options) {
        return this.msg.channel.send(new RichEmbed(options));
    }

    send(reply) {
        return this.msg.channel.send(reply);
    }

    reply(reply) {
        return this.msg.reply(reply);
    }
}

module.exports = Command;
