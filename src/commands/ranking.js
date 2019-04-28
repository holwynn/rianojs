const { users } = require('../database.js');
const Command = require('../Command');

class Ranking extends Command {
    constructor() {
        super();
        this.name = 'ranking';
    }

    async execute() {
        const rows = await users.findAll({
            attributes: ['username', 'equity'],
            order: [['equity', 'DESC']],
            limit: 10
        });

        let pos = 1;
        let embedContent = '💰 Ranking de pascos 💰\n\n`';

        for (const user of rows) {
            embedContent += `[${pos}] ${user.username} | $${user.equity} \n`;
            pos++;
        }

        embedContent += '`';

        return this.send(embedContent);
    }
}

module.exports = Ranking;
