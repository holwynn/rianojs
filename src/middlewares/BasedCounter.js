const { counters } = require('../database');

class BasedCounter extends Middleware {
    constructor() {
        super();
    }

    async register() {
        await counters.find()
    }
}
