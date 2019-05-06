const Discord = require('discord.js');
const { findOrCreateUser } = require('./database');
const { botUrl, compileCommands, log } = require('./utils');

const config = {
    prefix: process.env.BOT_PREFIX,
    token: process.env.DISCORD_TOKEN
}

async function main() {
    const client = new Discord.Client();
    client.commands = new Discord.Collection();
    client.middlewares = new Discord.Collection();

    const commands = compileCommands();
    // const middlewares = compileMiddlewares();

    for (const command of commands) {
        client.commands.set(command.name, command);
    }

    // for (const middleware of middlewares) {
    //     client.middlewares.set(middleware.name, middleware);
    // }
    
    client.on('ready', () => {
        client.user.setActivity('Fumando redpoint');
        log('INFO', 'Riano is ready');
        log('INFO', `Add me to your server: ${botUrl(client.user.id)}`);
    });

    client.on('message', async (msg) => {
        if (msg.author.bot) {
            return;
        }

        const user = await findOrCreateUser(msg);

        if (!msg.content.startsWith(config.prefix)) {
            user.equity += 10;
            await user.save();

            return false;
        }

        const args = msg.content.slice(config.prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) {
            return false;
        }        

        try {
            const command = client.commands.get(commandName);
            command.setOptions({ msg: msg, args: args, user: user });
            command.execute();
            log('INFO', `${msg.author.username} used ${command.name}`);
        } catch(e) {
            console.log(e);
        }
    });

    client.login(config.token);
}

main();
