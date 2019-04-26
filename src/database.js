const Sequelize = require('sequelize');

const orm = new Sequelize({
    username: 'root',
    password: 'secret',
    database: 'rianojs',
    host: '127.0.0.1',
    dialect: 'mysql'
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

module.exports = {
    orm: orm,
    users: User
}
