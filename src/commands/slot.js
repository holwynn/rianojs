const { RichEmbed } = require('discord.js');

const emojis = [
    '🗡',
    '😃',
    '🤔',
    '❤',
    '🦊',
    '🐷',
    '🍇',
    '🍒',
    '💣',
    '🎉',
];

module.exports = {
    name: 'slot',
    async execute(msg, args, user) {
        const price = 50;
        let winner = false;
        let prize = 0;
        let content = '';

        if (user.equity < price) {
            return msg.channel.send(`Costo: ${price} pascos. Actualmente tenes ${user.equity}`);
        }

        const a = Math.floor(Math.random() * 10);
        const b = Math.floor(Math.random() * 10);
        const c = Math.floor(Math.random() * 10);
        const roll = `${emojis[a]} : ${emojis[b]} : ${emojis[c]}`

        // roll 3 of the same
        if (a === b && a === c) {
            winner = true;
            prize = 500;
        }

        // roll 2 of the same
        if ((a === b || b === c || c === a) && winner === false) {
            winner = true;
            prize = 100;
        }

        content += `----------------\n${roll}\n----------------\n`;

        if (winner) {
            user.equity += prize;
            await user.save().then(() => {});
            content += `**${msg.author.username}** gana ${prize} pascos 🎉`;
        } else {
            user.equity -= price;
            await user.save().then(() => {});
            content += `**${msg.author.username}** pierde ${price} pascos ❌`;
        }

        const embed = new RichEmbed({
            title: 'Slots',
            description: content
        });
        embed.setColor('AQUA');

        msg.channel.send(embed);
    }
}
