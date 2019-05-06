const Command = require('../Command');

class Choose extends Command {
    constructor() {
        super();
        this.name = 'opcion';
    }

    execute() {
        const set = this.args.join(' ').split('|');
        const choice = set[Math.floor(Math.random() * set.length)].trim();
        return this.send(choice);
    }
}

module.exports = Choose;
