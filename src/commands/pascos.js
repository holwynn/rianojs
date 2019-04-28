const Command = require('../Command');

class Pascos extends Command {
    constructor() {
        super();
        this.name = 'pascos';
    }

    execute() {
        return this.send(`Tu banco: ${this.user.equity}`);
    }
}

module.exports = Pascos;
