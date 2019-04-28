const fs = require('fs');
const Discord = require('discord.js');
const { users } = require('./database.js');
const { botUrl } = require('./utils.js');

async function main() {
    const config = {
        prefix: process.env.BOT_PREFIX,
        token: process.env.DISCORD_TOKEN
    }

    const client = new Discord.Client();
    client.commands = new Discord.Collection();

    const commandFiles = fs.readdirSync('./src/commands')
        .filter(file => file.endsWith('.js'));

    for (const commandFile of commandFiles) {
        const commandClass = require(`./commands/${commandFile}`);
        const command = new commandClass()
        client.commands.set(command.name, command);
    }
    
    client.on('ready', () => {
        client.user.setActivity('Fumando redpoint');
        console.log('Riano is ready.');
        console.log(`Add me to your server: ${botUrl(client.user.id)}`);
    });

    client.on('message', async (msg) => {
        if (msg.author.bot) {
            return;
        }

        const user = await users.findOrCreate({
            where: { 
                discord_id: msg.author.id 
            },
            defaults: {
                discord_id: msg.author.id,
                username: msg.author.username,
                discriminator: msg.author.discriminator,
                avatar: msg.author.avatar,
                equity: 0
            }
        }).then(([result]) => result).catch((e) => { throw e });

        if (!msg.content.startsWith(config.prefix)) {
            user.equity += 10;
            await user.save().then(() => {});

            return false;
        }

        const args = msg.content.slice(config.prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) {
            return false;
        }

        const command = client.commands.get(commandName);

        try {
            command.setOptions({ msg: msg, args: args, user: user });
            command.execute();
        } catch(e) {
            console.log(e);
        }
    });

    client.login(config.token);
}

main();
