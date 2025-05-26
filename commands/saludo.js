module.exports = {
  name: 'hola',
  execute(message, args) {
    message.reply(`¡Hola, ${message.author.username}!`);
  }
};
