const fs = require('fs');
const Discord = require('discord.js');
const { botUrl } = require('./utils.js');

class Riano {
    constructor(options) {
        this.token = options.token;
        this.prefix = options.prefix;
        this.commands = {};
        this.middleware = {};

        this.client = new Discord();

        client.on('ready', () => {
            client.user.setActivity('Fumando redpoint');
            console.log('Riano is ready.');
            console.log(`Add me to your server: ${botUrl(client.user.id)}`);
        });
    }


}
