module.exports = {
  name: 'pascos',
  execute(msg, args, user) {
    msg.channel.send(`Tu banco: ${user.equity}`);
  }
};
