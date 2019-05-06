const Command = require('../Command');
const { log } = require('../utils');

class Slot extends Command {
    constructor() {
        super();

        this.name = 'slot';
        this.price = 50;
        this.emojis = [
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
    }

    async execute() {
        if (this.user.equity < this.price) {
            return this.send(`Costo: ${this.price} pascos. Actualmente tenes ${this.user.equity}`);
        }

        let winner = false;
        let prize = 0;

        const a = Math.floor(Math.random() * 10);
        const b = Math.floor(Math.random() * 10);
        const c = Math.floor(Math.random() * 10);
        const roll = `${this.emojis[a]} : ${this.emojis[b]} : ${this.emojis[c]}`
        log('debug', `${a} ${b} ${c}`);

        // roll 3 of the same
        if (a === b && a === c) {
            winner = true;
            prize = 500;
        } else if (a === b || b === c) {
            winner = true;
            prize = 100;
        }

        let embedContent = `----------------\n${roll}\n----------------\n`;

        let color = 0;

        if (winner) {
            this.user.equity += prize;
            color = this.embedColors.green;
            embedContent += `**${this.user.username}** gana ${prize} pascos 🎉`;
        } else {
            this.user.equity -= this.price;
            color = this.embedColors.red;
            embedContent += `**${this.user.username}** pierde ${this.price} pascos ❌`;
        }

        await this.user.save();

        return this.embed({
            title: 'Slots',
            color: color,
            description: embedContent
        });
    }
}

module.exports = Slot;
