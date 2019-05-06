const Command = require('../Command');

class Money extends Command {
    constructor() {
        super();
        this.name = 'pascos';
    }

    execute() {
        return this.send(`Tu banco: ${this.user.equity}`);
    }
}

module.exports = Money;
