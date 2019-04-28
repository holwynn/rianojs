const { RichEmbed } = require('discord.js');

class Command {
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
