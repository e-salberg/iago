const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const { clientId, guildId, token} = require('./config.json');

const rest = new REST({ version:'10'}).setToken(token);

const commandId = '1022649093140512789' 

rest.delete(Routes.applicationGuildCommand(clientId, guildId, commandId))
    .then(() => console.log('Successfully delted applicaion command'))
    .catch(console.error);