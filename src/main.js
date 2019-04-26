const fs = require('fs');
const Discord = require('discord.js');
const { users } = require('./database.js');

async function main() {
    const config = {
        prefix: process.env.BOT_PREFIX,
        token: process.env.DISCORD_TOKEN
    }

    const client = new Discord.Client();
    client.commands = new Discord.Collection();

    const commandFiles = fs.readdirSync('./src/commands')
        .filter(file => file.endsWith('.js'));

    console.log(commandFiles);

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }
    
    client.on('ready', () => {
        client.user.setActivity('Fumando redpoint');
        console.log('Riano is ready.');
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
                equity: 0
            }
        }).then(([u, c]) => u).catch((e) => { throw e });

        user.equity += 10;
        await user.save().then(() => {});

        if (!msg.content.startsWith(config.prefix)) {
            return false;
        }

        const args = msg.content.slice(config.prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) {
            return false;
        }

        const command = client.commands.get(commandName);

        try {
            command.execute(msg, args, user)
        } catch(e) {
            console.log(e);
        }
    });

    client.login(config.token);
}

main();
