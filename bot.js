require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
// Este bot de Discord escucha mensajes y ejecuta comandos basados en archivos en la carpeta "commands".}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefix = '/';
const commands = new Map();

// Cargar todos los archivos en la carpeta "commands"
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`Bot iniciado como ${client.user.tag}`);
});

const { handleAsk } = require('./services/serviceAsk.js');

client.on('messageCreate', async message => {
  if (message.author.bot || !message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (commandName === 'ask') {
    // Une el resto de los argumentos como el mensaje a enviar
    const pregunta = args.join(' ');
    if (!pregunta) {
      await message.reply('Por favor, escribe una pregunta después de /ask.');
      return;
    }
    try {
      const respuesta = await handleAsk(pregunta);

      await message.reply(respuesta.response || 'No se obtuvo respuesta.');
    } catch (error) {
      await message.reply(error.message || 'Ocurrió un error al procesar tu mensaje.');
    }
    return;
  }

  const command = commands.get(commandName) || commands.get('default');
  command.execute(message, args);
});

client.login(process.env.DISCORD_TOKEN);
