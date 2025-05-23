require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  // Evitar responderse a sí mismo o a otros bots
  if (message.author.bot) return;

  try {

    console.log(process.env.API_URL)
    const response = await axios.post(process.env.API_URL, {
      message: message.content,
    });

    console.log("Message del bot.js",message)

    const result = response.data.result || 'No se encontró respuesta';

    // Responder en el canal
    await message.reply(result);
  } catch (error) {
    console.error('Error al consultar la API:', error.message);
    await message.reply('Ocurrió un error al procesar tu mensaje.');
  }
});

client.login(process.env.DISCORD_TOKEN);
