const fs = require('node:fs')
const path = require('node:path')
const { token } = require('./config.json');
const { Client, Collection, IntentsBitField } = require('discord.js');
const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]
});

client.commands = new Collection();
const commnadsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commnadsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commnadsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

//const sadWords = ["sad", "depressed", "unhappy", "angry", "miserable", "tilt", "smurf"];
//const encouragementMsg = "keep it pma, keep it bsj";

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`) 
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

client.login(token);