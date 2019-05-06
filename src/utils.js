function log(type, content) {
    console.log(`[${type.toUpperCase()}] ${content}`);
}

function botUrl(id) {
    const url = `https://discordapp.com/oauth2/authorize?client_id={}&scope=bot`;
    return url.replace('{}', id);
}

function compileCommands() {
    const fs = require('fs');

    let commands = [];

    const commandFiles = fs.readdirSync('./src/commands')
        .filter(file => file.endsWith('.js'));

    for (const commandFile of commandFiles) {
        const commandClass = require(`./commands/${commandFile}`);
        commands.push(new commandClass());
    }

    return commands;
}

module.exports = {
    botUrl,
    compileCommands,
    log
}
