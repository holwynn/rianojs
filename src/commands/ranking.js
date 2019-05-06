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
        let embedContent = '💰 Ranking de pascos 💰\n';

        for (const user of rows) {
            embedContent += `\`[${pos}] ${user.username.padStart(12)} => $${user.equity} \`\n`;
            pos++;
        }

        return this.send(embedContent);
    }
}

module.exports = Ranking;
