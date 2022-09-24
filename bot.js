const fs = require('node:fs')
const path = require('node:path')
const { token } = require('./config.json');
const { Client, Collection, IntentsBitField } = require('discord.js');
const { joinVoiceChannel } = require("@discordjs/voice");
const { addSpeechEvent } = require("discord-speech-recognition");
const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildVoiceStates]
});

client.commands = new Collection();
const commnadsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commnadsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commnadsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

const sadWords = ["sad", "depressed", "unhappy", "angry", "miserable", "tilt", "smurf", "f***", "s***", "damn", "kill"];
const encouragementMsg = "keep it pma, keep it bsj";

addSpeechEvent(client);

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`) 
    const voiceChannel = client.channels.cache.get('290178979900555275')
    if (voiceChannel) {
      joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        selfDeaf: false,
      });
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.on('messageCreate', msg => {
    if (sadWords.some(word => msg.content.includes(word))) {
        msg.reply(encouragementMsg);
    }
});
  
  client.on("speech", (msg) => {
    // If bot didn't recognize speech, content will be empty
    console.log(msg.content);
    if (!msg.content) return;

    //client.channels.cache.get('1023035230250082314').send(`${msg.author.tag} said: ${msg.content}`)
    if (sadWords.some(word => msg.content.includes(word))) {
        client.channels.cache.get('1023035230250082314').send(`hey ${msg.author}! ${encouragementMsg}`)
    }
    //msg.author.send(msg.content);
  });

client.login(token);