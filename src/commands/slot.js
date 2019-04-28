const Command = require('../Command');

class Slot extends Command {
    constructor() {
        super();

        this.name = 'slot';
        this.price = 50;
        this.winner = false;
        this.prize = 0;
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
            return this.insufficientMoney();
        }

        const a = Math.floor(Math.random() * 10);
        const b = Math.floor(Math.random() * 10);
        const c = Math.floor(Math.random() * 10);
        const roll = `${this.emojis[a]} : ${this.emojis[b]} : ${this.emojis[c]}`

        // roll 3 of the same
        if (a === b && a === c) {
            this.winner = true;
            this.prize = 500;
        }

        // roll 2 of the same
        if ((a === b || b === c || a === c) && this.winner === false) {
            this.winner = true;
            this.prize = 100;
        }

        let embedContent = `----------------\n${roll}\n----------------\n`;

        if (this.winner) {
            this.user.equity += this.prize;
            embedContent += `**${this.user.username}** gana ${this.prize} pascos 🎉`;
        } else {
            this.user.equity -= this.price;
            embedContent += `**${this.user.username}** pierde ${this.price} pascos ❌`;
        }

        await this.user.save();

        return this.embed({
            title: 'Slots',
            color: 181818,
            description: embedContent
        });
    }

    insufficientMoney() {
        return this.send(`Costo: ${this.price} pascos. Actualmente tenes ${this.user.equity}`);
    }
}

module.exports = Slot;
