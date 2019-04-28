module.exports = {
  name: 'image',
  execute(msg, args, user) {
    msg.channel.send({
        files: [{
            attachment: 'assets/image.jpg'
        }]
    })
  }
};
