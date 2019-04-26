module.exports = {
  name: 'ping',
  execute(msg, args, user) {
    msg.channel.send(`pong! you have ${user.equity} $`);
  }
};
