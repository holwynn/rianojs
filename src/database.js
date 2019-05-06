const Sequelize = require('sequelize');

const orm = new Sequelize({
    username: 'root',
    password: 'secret',
    database: 'rianojs',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
});

const User = orm.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    discord_id: {
        type: Sequelize.STRING,
        notNull: true
    },
    username: {
        type: Sequelize.STRING,
        notNull: true
    },
    discriminator: {
        type: Sequelize.INTEGER,
        notNull: true
    },
    avatar: {
        type: Sequelize.STRING
    },
    equity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

const Counter = orm.define('counter', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mateoBased: {
        type: Sequelize.INTEGER,
        notNull: true,
        defaultValue: 0
    },
})

async function findOrCreateUser(msg) {
    return await User.findOrCreate({
        where: { 
            discord_id: msg.author.id 
        },
        defaults: {
            discord_id: msg.author.id,
            username: msg.author.username,
            discriminator: msg.author.discriminator,
            avatar: msg.author.avatar,
            equity: 0
        }
    }).then(([result]) => result).catch((e) => { throw e });
}

module.exports = {
    orm: orm,
    users: User,
    counters: Counter,
    findOrCreateUser: findOrCreateUser
}
