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
    discord_id: Sequelize.STRING,
    equity: Sequelize.INTEGER
});

module.exports = {
    orm: orm,
    users: User
}
