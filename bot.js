const fs = require('node:fs')
const path = require('node:path')
const { token } = require('./config.json');
const { Client, Collection, IntentsBitField } = require('discord.js');

const { addSpeechEvent } = require("discord-speech-recognition");
const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildVoiceStates]
});

addSpeechEvent(client);

client.commands = new Collection();
const commnadsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commnadsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commnadsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token);